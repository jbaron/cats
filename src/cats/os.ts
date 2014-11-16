//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/**
 * This module abstracts out the native File IO and Process access. Right now it uses Nodejs, but this
 * could be changed to another implementation like a cloud storage API.
 * 
 * @TODO make this more an async api so it becomes easier to switch to other implementations
 * Perhaps after TS has implement await type of functionality.
 */
 
module Cats.OS.File {

        export var PATH = require("path");
        var fs = require("fs");
        
        var exec = require("child_process").exec;
        var glob = require("glob");


        /**
         * Very lightweight watcher for files and directories, used to inform the user of changes
         * in the underlying file system.
         * 
         */ 
        export class Watcher extends  qx.event.Emitter {
            
            // Keeps track of the files and directories that are being watched 
            private watches:Map<any> = {}; 
            
            constructor() {
                super();
            }
 
            
            /**
             * Add a new file or directory to the watch list. If it already exists it is being ignored
             * 
             */ 
            add(name:string) {
                if (this.watches[name]) return;
                var w = fs.watch(name, (event:any,filename:string) => {
                    console.info("Node changed " + name + " event " + event + " fileName " + filename);
                    this.emit("change", name);
                });
                this.watches[name] = w;
            }
 
 
           /**
             * Add a new directory to the watch list. If it already exists it is being ignored. 
             * Only rename type of events are being propgated (so new files or deletes).
             * 
             * Files within a directory changing size etc are not propagated.
             * 
             */ 
            addDir(name:string) {
                if (this.watches[name]) return;
                var w = fs.watch(name, (event:any,filename:string) => {
                    console.info("Node changed " + name + " event " + event + " fileName " + filename);
                    if (event === "rename") this.emit("change", name);
                });
                this.watches[name] = w;
            }
            
            
            /**
             * Remove an entry from the watch list (file or directory)
             * 
             * @param name The filepath that no longer should be watched
             * 
             */ 
            remove(name:string) {
                var w = this.watches[name];
                if (w) {
                    w.close();
                    delete this.watches[name];
                }
            }
            
        }

 
       /**
         * Create recursively directories if they don't exist yet
         * 
         * @param path The directory path to create
         * 
         */ 
        export function mkdirRecursiveSync(path: string) {
            if (!fs.existsSync(path)) {
                mkdirRecursiveSync(PATH.dirname(path));
                fs.mkdirSync(path,509); //, 0775);
            }
        }

        /**
         * Create a file watcher
         */ 
        export function getWatcher() {
            var watcher = new Watcher();
            return watcher;
        }

       /**
        * Get the stat of a file and return them as a set of properties
        * 
        */ 
       export function getProperties(fileName:string) {
           if (! fileName) return [];
           var stat:Object = fs.statSync(fileName);
           var result = [
               { key: "fileName", value: fileName}
           ];
           for (var key in stat) {
               if (stat.hasOwnProperty(key)) {
                   result.push({
                       key: key,
                       value : stat[key]
                   });
               }
           }
           return result;
           
       }
       
        /**
         * Run an external command like a build tool and log the output
         * 
         */ 
        export function runCommand(cmd:string, options:any, logger=IDE.console) {
        
            if (! options.env) {
                    options.env = process.env;
            }
            
            var child = exec(cmd, options, () => {
                /* ignore the buffers */
            });
            var id = child.pid;
            IDE.processTable.addProcess(child, cmd);
           
            child.stdout.on("data", function (data:string) {
              logger.log("" + data);
            });
            
            child.stderr.on("data", function (data:string) {
              logger.error("" + data);
            });
            
            child.on("close", function (code:number) {
              logger.log("Done");
            });
        }
       
        /**
         * Remove a file or an empty directory
         * 
         * @param path the path of the file or directory to be removed
         * 
         */ 
        export function remove(path:string) {
            var isFile = fs.statSync(path).isFile();
            if (isFile) 
                fs.unlinkSync(path);
            else 
                fs.rmdirSync(path);
        }

        /**
         * Is this instance running on the OSX platform
         */ 
        export function isOSX() {
            return process.platform === "darwin";
        }

        export function isWindows() {
            return process.platform === "win32";
        }

        /**
         * Join two paths together and return the result.
         */ 
        export function join(a:string,b:string, native=false) : string{
            var result = PATH.join(a,b);
            if (!native) result = switchToForwardSlashes(result);
            return result;
        }

        /**
         * Find a file matching a certain patterns and in the certain directory
         */ 
        export function find(pattern:string, rootDir:string, cb:Function) {
            var files:Array<string> = glob.sync(pattern, {cwd:rootDir, mark:true}) ;
            files = files.filter((name) => {return name.slice(-1) !== "/"; });
            cb(null,files);
        }


        /**
         * Rename a file or directory
         * 
         * @param oldName the old name of the file or directory
         * @param newName the new name of the file or directory
         */ 
        export function rename(oldName:string,newName: string) {
             fs.renameSync(oldName, newName);
        }


        /**
         * Determine the newLineMode.
         * 
         * @return Return value is either dos or unix
         * 
         */ 
        function determineNewLineChar(): string {
            try {
                var char = IDE.project.config.codeFormat.NewLineCharacter;
                if (char) return char;
            } catch (exp) {}
            
            if (isWindows()) return "\r\n";
            return "\n";
            
        }

        /**
         * Write text content to a file. If a directory doesn't exist, create it
         * 
         * @param name The full name of the file
         * @param value The content of the file
         * @param stat Indicate if we should return the stat values of the newly written file 
         * 
         */ 
         export function writeTextFile(name: string, value: string, stat=false):any {
            var newLineChar = determineNewLineChar();
            if (newLineChar !== "\n") {
                value = value.replace(/\n/g, newLineChar);
            }
            
            var fileName = name;
            fileName = PATH.resolve(IDE.project.projectDir, fileName);
            
            mkdirRecursiveSync(PATH.dirname(fileName));
            fs.writeFileSync(fileName, value, "utf8");
            
            if (stat) return fs.statSync(fileName);
            return null;
        }
        
        
        /**
         * Convert backward slashes (DOS) to forward slashes (UNIX)
         * 
         */ 
        export function switchToForwardSlashes(path:string):string {
            if (! path) return path;
            return path.replace(/\\/g, "/");
        }
         
         
        /**
         * Sort two directory directorie entries first on 
         * directory versus file and then on alphabet.
         * 
         */ 
        function sort(a: Cats.FileEntry, b: Cats.FileEntry) {
            if ((!a.isDirectory) && b.isDirectory) return 1;
            if (a.isDirectory && (!b.isDirectory)) return -1;
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;
            return 0;
        }
 
                
        /**
         * Read the files from a directory
         * 
         * @param directory The directory name that should be read
         * 
         */ 
        export function readDir(directory:string, sorted=false) {
            var files:string[] = fs.readdirSync(directory);
            var result:Cats.FileEntry[] = [];
            files.forEach((file) => {
                var fullName = OS.File.join(directory, file);
                var stats = fs.statSync(fullName);
                result.push({
                   name:file,
                   fullName: fullName,
                   isFile: stats.isFile() ,
                   isDirectory: stats.isDirectory()
                });
            });
            if (sorted) result.sort(sort);
            return result;
        }
        
      
        /**
         * Read the content from a text file
         * 
         * @param name The full name/path of the file
         * 
         */ 
        export function readTextFile(name: string): string {
            if (name == null ) return "";

            var data = fs.readFileSync(name, "utf8");

            // Use single character line returns
            data = data.replace(/\r\n?/g, "\n");

            // Remove the BOM (only MS uses BOM for UTF8)
            data = data.replace(/^\uFEFF/, '');
            return data;
        } 
                   
      
}

