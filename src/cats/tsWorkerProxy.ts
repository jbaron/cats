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

module Cats {

    /** 
     * Load the TSWorker and handles the communication with the web worker
     * This implementation uses internally a JSON-RPC style message format 
     * for the communication. However it exposes a typed interface to towards
     * the outside world.
     */
    export class TSWorkerProxy {

        private worker: Worker;
        private messageId = 0;
        private registry:Map<CB<any>> = {};

        constructor(private project: Project) {
            // Create a new webworker
            this.worker = new Worker("lib/tsworker.js");
            this.initWorker();
        }

        stop() {
            this.worker.terminate();
        }

        /**
         * Get the diagnostic messages for a file
         */ 
        getErrors(fileName: string, cb: CB<FileRange[]>) {
            this.perform("getErrors", fileName, cb);
        }

        getNavigateToItems(search: string, cb: CB<NavigateToItem[]>) {
            this.perform("getNavigateToItems", search, cb);
        }

        getAllDiagnostics(cb: CB<FileRange[]>) {
            this.perform("getAllDiagnostics", cb);
        }

        getTodoItems(cb: CB<NavigateToItem[]>) {
            this.perform("getTodoItems", cb);
        }

        getFormattedTextForRange(sessionName: string, range: Range, cb: Function) {
            this.perform("getFormattedTextForRange", sessionName, range, cb);
        }

        getDefinitionAtPosition(sessionName: string, cursor: Cats.Position, cb: (err: any, data: FileRange) => void) {
            this.perform("getDefinitionAtPosition", sessionName, cursor, cb);
        }


        findRenameLocations(fileName: string, position: Position, findInStrings: boolean, findInComments: boolean, cb: (err: any, data: Cats.FileRange[]) => void) {
            this.perform("findRenameLocations", fileName, position, findInStrings, findInComments, cb);
        }
 
        getCrossReference(type: string, sessionName: string, cursor: Cats.Position, cb: (err: any, data: Cats.FileRange[]) => void) {
            this.perform("getCrossReference", type, sessionName, cursor, cb);
        }

        compile(cb: CB<Cats.CompileResults>) {
            this.perform("compile", cb);
        }

        getScriptOutline(sessionName: string, cb: (err: any, data: NavigateToItem[]) => void) {
            this.perform("getScriptOutline", sessionName, cb);
        }

        getInfoAtPosition(name: string, docPos: ace.Position, cb: (err: any, data: TypeInfo) => void) {
            this.perform("getInfoAtPosition", name, docPos, cb);
        }

        getRenameInfo(name: string, docPos: ace.Position, cb: (err: any, data: ts.RenameInfo) => void) {
            this.perform("getRenameInfo", name, docPos, cb);
        }


        getObjectModel(cb:CB<any>) {
            this.perform("getObjectModel", cb);
        }

        setSettings(compilerSettings:ts.CompilerOptions, editorSettings:ts.FormatCodeOptions) {
            this.perform("setSettings", compilerSettings, editorSettings, null);
        }

        addScript(fileName: string, content: string) {
            this.perform("addScript", fileName, content, null);
        }

        updateScript(fileName: string, content: string) {
            this.perform("updateScript", fileName, content, null);
        }

        getCompletions(fileName: string, cursor: ace.Position, cb: CB<ts.CompletionEntry[]>) {
            this.perform("getCompletions", fileName, cursor, cb);
        }

        initialize() {
            this.perform("initialize", null);
        }

        /**
         * Invoke a method on the worker using JSON-RPC message structure
         */
        private perform(method: string, ...data: Array<any>) {
            var handler = data.pop();
            this.messageId++;
            var message = {
                id: this.messageId,
                method: method,
                params: data
            };
            this.worker.postMessage(message);
            console.info("Send message: " + message.method);
            if (handler) { this.registry[this.messageId] = handler; }
        }

        /**
         * Clear any pending handlers
         */
        clear() {
            this.registry = {};
        }

        /**
         * Setup the message communication with the worker
         */
        private initWorker() {
            // Setup the message handler
            this.worker.onmessage = (e) => {
                var msg = e.data;
                // console.log("Received message " + JSON.stringify(msg) + " from worker");
                // console.log("Received message reply " + msg.id + " from worker.");
                if (msg.error) {
                    console.error("Got error back !!! ");
                    console.error(msg.error.stack);
                }
                // @TODO handle exceptions better and call callback
                var id = msg.id;
                if (id) {
                    var handler = this.registry[id];
                    if (handler) {
                        delete this.registry[id];
                        handler(msg.error, msg.result);
                    }
                } else {
                    var params = msg.params;
                    var methodName = msg.method;
                    
                    if (methodName && (methodName === "setBusy")) {
                        IDE.statusBar.setBusy(params[0], params[1]);
                    } 
                    
                    if (methodName && (methodName === "console")) {
                        console[params[0]](params[1]);
                    } 
                }
            };
        }

    }

}
