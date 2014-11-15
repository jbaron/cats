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

module Cats.Util {

    /**
     * Dynamically load resources like CSS and Javascript files.
     * 
     */
    export class ResourceLoader {

        require(file:string, callback:Function) {
            callback = callback ||
            function() { };
           
            var jsfile_extension = /(.js)$/i;
            var cssfile_extension = /(.css)$/i;

            if (jsfile_extension.test(file)) {
                var scriptnode = document.createElement('script');
                scriptnode.src = file;
                scriptnode.onload = function() {
                    callback();
                };
                document.head.appendChild(scriptnode);

            } else if (cssfile_extension.test(file)) {
                var linknode = document.createElement('link');
                linknode.rel = 'stylesheet';
                linknode.type = 'text/css';
                linknode.href = file;
                document.head.appendChild(linknode);
                callback();
            } else {
                console.log("Unknown file type to load.");
            }
        }

        loadResources(files: Array<string>, callback:Function) {
            var counter = 0;
            files.forEach((file) => {
                this.require(file, () => {
                    counter++;
                    if (counter === files.length) { callback(); }
                });
            });
        }

    }
}