// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

interface IResolvedFile {
    content: string;
    path: string;
}

interface IIO {
    readFile(path: string): string;
    writeFile(path: string, contents: string): void;
    createFile(path: string, useUTF8?: bool): ITextWriter;
    deleteFile(path: string): void;
    dir(path: string, re?: RegExp, options?: { recursive?: bool; }): string[];
    fileExists(path: string): bool;
    directoryExists(path: string): bool;
    createDirectory(path: string): void;
    resolvePath(path: string): string;
    dirName(path: string): string;
    findFile(rootPath: string, partialFilePath: string): IResolvedFile;
    print(str: string): void;
    printLine(str: string): void;
    arguments: string[];
    stderr: ITextWriter;
    stdout: ITextWriter;
    watchFiles(files: string[], callback: () => void ): bool;
    run(source: string, filename: string): void;
    getExecutingFilePath(): string;
    quit(exitCode?: number);
}

// Declare dependencies needed for all supported hosts
declare class Enumerator {
    public atEnd(): bool;
    public moveNext();
    public item(): any;
    constructor (o: any);
}
declare function setTimeout(callback: () =>void , ms?: number);
declare var require: any;
declare module process {
    export var argv: string[];
    export var platform: string;
    export function on(event: string, handler: (any) => void ): void;
    export module stdout {
        export function write(str: string);
    }
    export module stderr {
        export function write(str: string);
    }
    export module mainModule {
        export var filename: string;
    }
    export function exit(exitCode?: number);
}

var IO = (function() {

    // Create an IO object for use inside WindowsScriptHost hosts
    // Depends on WSCript and FileSystemObject
    function getWindowsScriptHostIO(): IIO {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var streamObjectPool = [];

        function getStreamObject(): any { 
            if (streamObjectPool.length > 0) {
                return streamObjectPool.pop();
            }  else {
                return new ActiveXObject("ADODB.Stream");
            }
        }

        function releaseStreamObject(obj: any) { 
            streamObjectPool.push(obj);
        }

        var args = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }

        return {
            readFile: function(path) {
                try {
                    var streamObj = getStreamObject();
                    streamObj.Open();
                    streamObj.Type = 2; // Text data
                    streamObj.Charset = 'x-ansi'; // Assume we are reading ansi text
                    streamObj.LoadFromFile(path);
                    var bomChar = streamObj.ReadText(2); // Read the BOM char
                    streamObj.Position = 0; // Position has to be at 0 before changing the encoding
                    if ((bomChar.charCodeAt(0) == 0xFE && bomChar.charCodeAt(1) == 0xFF)
                        || (bomChar.charCodeAt(0) == 0xFF && bomChar.charCodeAt(1) == 0xFE)) {
                        streamObj.Charset = 'unicode';
                    } else if (bomChar.charCodeAt(0) == 0xEF && bomChar.charCodeAt(1) == 0xBB) {
                        streamObj.Charset = 'utf-8'; 
                    }

                    // Read the whole file
                    var str = streamObj.ReadText(-1 /* read from the current position to EOS */);
                    streamObj.Close();
                    releaseStreamObject(streamObj);
                    return <string>str;
                }
                catch (err) {
                    throw new Error("Error reading file \"" + path + "\": " + err.message);
                }
            },

            writeFile: function(path, contents) {
                var file = this.createFile(path);
                file.Write(contents);
                file.Close();
            },

            fileExists: function(path: string): bool {
                return fso.FileExists(path);
            },

            resolvePath: function(path: string): string {
                return fso.GetAbsolutePathName(path);
            },

            dirName: function(path: string): string {
                return fso.GetParentFolderName(path);
            },

            findFile: function(rootPath: string, partialFilePath: string): IResolvedFile {
                var path = fso.GetAbsolutePathName(rootPath) + "/" + partialFilePath;

                while (true) {
                    if (fso.FileExists(path)) {
                        try {
                            var content = this.readFile(path);
                            return { content: content, path: path };
                        }
                        catch (err) {
                            //Tools.CompilerDiagnostics.debugPrint("Could not find " + path + ", trying parent");
                        }
                    }
                    else {
                        rootPath = fso.GetParentFolderName(fso.GetAbsolutePathName(rootPath));

                        if (rootPath == "") {
                            return null;
                        }
                        else {
                            path = fso.BuildPath(rootPath, partialFilePath);
                        }
                    }
                }
            },

            deleteFile: function(path: string): void {
                if (fso.FileExists(path)) {
                    fso.DeleteFile(path, true); // true: delete read-only files
                }
            },

            createFile: function (path, useUTF8?) {
                try {
                    var streamObj = getStreamObject();
                    streamObj.Charset = useUTF8 ? 'utf-8' : 'x-ansi';
                    streamObj.Open();
                    return {
                        Write: function (str) { streamObj.WriteText(str, 0); },
                        WriteLine: function (str) { streamObj.WriteText(str, 1); },
                        Close: function () {
                            streamObj.SaveToFile(path, 2);
                            streamObj.Close();
                            releaseStreamObject(streamObj);
                        }
                    };
                } catch (ex) {
                    WScript.StdErr.WriteLine("Couldn't write to file '" + path + "'");
                    throw ex;
                }
            },

            directoryExists: function(path) {
                return <bool>fso.FolderExists(path);
            },

            createDirectory: function(path) {
                if (!this.directoryExists(path)) {
                    fso.CreateFolder(path);
                }
            },

            dir: function(path, spec?, options?) {
                options = options || <{ recursive?: bool; }>{};
                function filesInFolder(folder, root): string[]{
                    var paths = [];
                    var fc: Enumerator;

                    if (options.recursive) {
                        fc = new Enumerator(folder.subfolders);

                        for (; !fc.atEnd() ; fc.moveNext()) {
                            paths = paths.concat(filesInFolder(fc.item(), root + "/" + fc.item().Name));
                        }
                    }

                    fc = new Enumerator(folder.files);

                    for (; !fc.atEnd() ; fc.moveNext()) {
                        if (!spec || fc.item().Name.match(spec)) {
                            paths.push(root + "/" + fc.item().Name);
                        }
                    }

                    return paths;
                }

                var folder = fso.GetFolder(path);
                var paths = [];

                return filesInFolder(folder, path);
            },

            print: function(str) {
                WScript.StdOut.Write(str);
            },

            printLine: function(str) {
                WScript.Echo(str);
            },

            arguments: <string[]>args,
            stderr: WScript.StdErr,
            stdout: WScript.StdOut,
            watchFiles: null,
            run: function(source, filename) {
                eval(source);
            },
            getExecutingFilePath: function () {
                return WScript.ScriptFullName;
            },
            quit: function (exitCode? : number = 0) {
                try {
                    WScript.Quit(exitCode);
                } catch (e) {
                }
            }
        }

    };

    // Create an IO object for use inside Node.js hosts
    // Depends on 'fs' and 'path' modules
    function getNodeIO(): IIO {

        var _fs = require('fs');
        var _path = require('path');
        var _module = require('module');

        return {
            readFile: function (file) {
                var buffer = _fs.readFileSync(file);
                switch (buffer[0]) {
                    case 0xFE:
                        if (buffer[1] == 0xFF) {
                            // utf16-be. Reading the buffer as big endian is not supported, so convert it to 
                            // Little Endian first
                            var i = 0;
                            while ((i + 1) < buffer.length) {
                                var temp = buffer[i]
                                buffer[i] = buffer[i + 1];
                                buffer[i + 1] = temp;
                                i += 2;
                            }
                            return buffer.toString("ucs2", 2);
                        }
                        break;
                    case 0xFF:
                        if (buffer[1] == 0xFE) {
                            // utf16-le 
                            return buffer.toString("ucs2", 2);
                        }
                        break;
                    case 0xEF:
                        if (buffer[1] == 0xBB) {
                            // utf-8
                            return buffer.toString("utf8", 3);
                        }
                }
                // Default behaviour
                return buffer.toString();
            },
            writeFile: <(path: string, contents: string) => void >_fs.writeFileSync,
            deleteFile: function(path) {
                try {
                    _fs.unlinkSync(path);
                } catch (e) {

                }
            },
            fileExists: function(path): bool {
                return _fs.existsSync(path);
            },
            createFile: function(path, useUTF8?) {
                function mkdirRecursiveSync(path) {
                    var stats = _fs.statSync(path);
                    if (stats.isFile()) {
                        throw "\"" + path + "\" exists but isn't a directory.";
                    } else if (stats.isDirectory()) {
                        return;
                    } else {
                        mkdirRecursiveSync(_path.dirname(path));
                        _fs.mkdirSync(path, 0775);
                    }
                }
                mkdirRecursiveSync(_path.dirname(path));

                var fd = _fs.openSync(path, 'w');
                return {
                    Write: function(str) { _fs.writeSync(fd, str); },
                    WriteLine: function(str) { _fs.writeSync(fd, str + '\r\n'); },
                    Close: function() { _fs.closeSync(fd); fd = null; }
                };
            },
            dir: function dir(path, spec?, options?) {
                options = options || <{ recursive?: bool; }>{};

                function filesInFolder(folder: string): string[]{
                    var paths = [];

                    var files = _fs.readdirSync(folder);
                    for (var i = 0; i < files.length; i++) {
                        var stat = _fs.statSync(folder + "/" + files[i]);
                        if (options.recursive && stat.isDirectory()) {
                            paths = paths.concat(filesInFolder(folder + "/" + files[i]));
                        } else if (stat.isFile() && (!spec || files[i].match(spec))) {
                            paths.push(folder + "/" + files[i]);
                        }
                    }

                    return paths;
                }

                return filesInFolder(path);
            },
            createDirectory: function(path: string): void {
                if (!this.directoryExists(path)) {
                    _fs.mkdirSync(path);
                }
            },

            directoryExists: function(path: string): bool {
                return _fs.existsSync(path) && _fs.lstatSync(path).isDirectory();
            },
            resolvePath: function(path: string): string {
                return _path.resolve(path);
            },
            dirName: function(path: string): string {
                return _path.dirname(path);
            },
            findFile: function(rootPath: string, partialFilePath): IResolvedFile {
                var path = rootPath + "/" + partialFilePath;

                while (true) {
                    if (_fs.existsSync(path)) {
                        try {
                            var content = this.readFile(path);
                            return { content: content, path: path };
                        } catch (err) {
                            //Tools.CompilerDiagnostics.debugPrint(("Could not find " + path) + ", trying parent");
                        }
                    }
                    else {
                        var parentPath = _path.resolve(rootPath, "..");

                        // Node will just continue to repeat the root path, rather than return null
                        if (rootPath === parentPath) {
                            return null;
                        }
                        else {
                            rootPath = parentPath;
                            path = _path.resolve(rootPath, partialFilePath);
                        }
                    }
                }
            },
            print: function(str) { process.stdout.write(str) },
            printLine: function(str) { process.stdout.write(str + '\n') },
            arguments: process.argv.slice(2),
            stderr: {
                Write: function(str) { process.stderr.write(str); },
                WriteLine: function(str) { process.stderr.write(str + '\n'); },
                Close: function() { }
            },
            stdout: {
                Write: function(str) { process.stdout.write(str); },
                WriteLine: function(str) { process.stdout.write(str + '\n'); },
                Close: function() { }
            },
            watchFiles: function(files, callback) {
                var watchers = [];
                var firstRun = true;
                var isWindows = /^win/.test(process.platform);
                var processingChange = false;

                var fileChanged: any = function(e, fn) {
                    if (!firstRun && !isWindows) {
                        for (var i = 0; i < files.length; ++i) {
                            _fs.unwatchFile(files[i]);
                        }
                    }
                    firstRun = false;
                    if (!processingChange) {
                        processingChange = true;
                        callback();
                        setTimeout(function() { processingChange = false; }, 100);
                    }
                    if (isWindows && watchers.length === 0) {
                        for (var i = 0; i < files.length; ++i) {
                            var watcher = _fs.watch(files[i], fileChanged);
                            watchers.push(watcher);
                            watcher.on('error', function(e) {
                                process.stderr.write("ERROR" + e);
                            });
                        }
                    } else if (!isWindows) {
                        for (var i = 0; i < files.length; ++i) {
                            _fs.watchFile(files[i], { interval: 500 }, fileChanged);
                        }
                    }
                };

                fileChanged();
                return true;
            },
            run: function(source, filename) {
                require.main.filename = filename;
                require.main.paths = _module._nodeModulePaths(_path.dirname(_fs.realpathSync(filename)));
                require.main._compile(source, filename);
            }, 
            getExecutingFilePath: function () {
                return process.mainModule.filename;
            },
            quit: process.exit
        }
    };

    if (typeof ActiveXObject === "function")
        return getWindowsScriptHostIO();
    else if (typeof require === "function")
        return getNodeIO();
    else
        return null; // Unsupported host
})();
