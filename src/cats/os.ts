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
 * This module abstracts out the native File IO. Right now it uses Nodejs, but this
 * could be easily changed to other mechanism.
 * 
 * @TODO make this async
 */  
module OS.File {

        var FS=require("fs");

        function mkdirRecursiveSync(path: string) {
            if (!FS.existsSync(path)) {
                mkdirRecursiveSync(PATH.dirname(path));
                FS.mkdirSync(path, 0775);
            }
        }

        /**
         * Remove a file or empty directory
         */ 
        export function remove(path:string) {
            var isFile = FS.statSync(path).isFile();
            if (isFile) 
                FS.unlinkSync(path);
            else 
                FS.rmdirSync(path);
        }

        /**
         * Rename a file or directory
         */ 
        export function rename(oldName:string,newName: string) {
             FS.renameSync(oldName, newName);
        }

        /**
         * Write content to a file. If a directory doesn't exist, create it
         */ 
         export function writeTextFile(name: string, value: string) {
            mkdirRecursiveSync(PATH.dirname(name));
            FS.writeFileSync(name, value, "utf8");
        }
        
        /**
         * Read the files from a directory
         */ 
        export function readDir(directory:string): Cats.FileEntry[] {
            var files:string[] = FS.readdirSync(directory);
            var result = [];
            files.forEach((file) => {
                var fullName = PATH.join(directory, file);
                var stats = FS.statSync(fullName);
                result.push({
                   name:file,
                   fullName:fullName,
                   isFile: stats.isFile() ,
                   isDirectory: stats.isDirectory()
                });
            });
            return result;
        }
                   
        /**
         * Read the content from a text file
         */ 
        export function readTextFile(name: string): string {
            if (name === "untitled") return "";

            var data = FS.readFileSync(name, "utf8");

            // Use single character line returns
            data = data.replace(/\r\n?/g, "\n");

            // Remove the BOM (only MS uses BOM for UTF8)
            data = data.replace(/^\uFEFF/, '');
            return data;
        }


        // export var join = PATH.join;
        // export var basename = PATH.basename;
        // export var dirname = PATH.dirname;


}

