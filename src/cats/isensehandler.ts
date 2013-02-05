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
 * Load the TSWorker and handles the communication with the ISense web worker
 * This implementation uses a JSON-RPC style message format for the communication.
 */
export class ISenseHandler {

    private worker;
    private messageId = 0;
    private registry = {};

    constructor() {
        // Lets create a new worker
        this.worker = new Worker("../lib/tsworker.js");
        this.init();
    }

    /**
     * Invoke a method on the worker using JSON-RPC message structure
     */ 
    perform(method:string, ...data:any[]) {
        var handler = data.pop();
        this.messageId++;
        var message = {
            id: this.messageId,
            method: method,
            params: data
        }
        this.worker.postMessage(message);
        console.log("Send message: " + message.method);
        if (handler) this.registry[this.messageId] = handler;
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
    private init() {
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
                console.log(msg);
            }
        };
    }

}

}