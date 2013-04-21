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

export interface Observable {
    emit(event: string, ...args: Array<any>);
    listeners(event: string): Observer[];
    removeListener(event: string, listener: Function);
    on(event: string, listener: Observer);
}

export interface Observer {
    (data, src): void;
}

/**
 * A utility class that makes it easy to make observable properties
 * Just inherit from this class and tell which properties you want to 
 * become observable.
 */
export class ObservableImpl implements Observable {

    // Give it is name that won't quickly conflict with classes that inherit this
    private _observerRegistry = {};


    /*
    constructor(...props: Array<string>) {
        if (props.length)
            this.makeObservable.apply(this, props);
    }
    */

    constructor(args : string[]) {
        if (args.length)
            this.makeObservable.apply(this, args);
    }


    removeListener(event:string, listener:Function) {
        var o:Function[] = this._observerRegistry[event];
        if (o) {
            var i = o.indexOf(listener);
            if (i>-1) o.splice(i,1);
        }
    }

    /**
     * Notify observers of a property change
     */
    emit(propertyName: string, value: any) {
        var s: Observer[] = this._observerRegistry[propertyName] || [];
        s.forEach((fn) => {
            try { fn.call(this, value, this) } catch (err) { console.error(err); }
        })
    }

    /**
     * Get a list of all observers for a property
     */
    listeners(propertyName: string): Observer[] {
        return this._observerRegistry[propertyName];
    }

    /**
     * Register an observer for changes to a certain property
     * @param event The property of interest
     * @param listener The observer that will be called
     * @param initial Should we also send an initial update
     */
    on(event: string, listener: Observer, initial = false) {
        if (!this._observerRegistry[event]) this._observerRegistry[event] = [];
        this._observerRegistry[event].push(listener);
        if (initial) {
            listener.call(this, this[event], this);
        }
    }

    private handleViewer(event:string) {       
        var viewer = window["__viewID"];
        if (viewer) {
                var l:Observer[] = this._observerRegistry[event];
                if (l) {
                    var found = false;
                    for (var i=0;i<l.length;i++) {
                        if (l[i] === viewer) {
                            found = true;
                            break;
                        }                        
                    }
                    if (! found) l.push(viewer);
                } else {
                    this._observerRegistry[event] = [viewer];
                    
                }
        }
    }

    /**
     * Make a number of plain properties observable
     * @param props The list of properties to be observable
     */
    makeObservable(...props: Array<string>) {
        props.forEach((prop) => {
            var privateVar = this[prop];
            var timer = null;
            Object.defineProperty(this, prop, {
                get: function() {
                    // this.handleViewer(prop);
                    return privateVar;
                },
                set: function(val) {
                    console.log("received event: " + prop);
                    if (val === privateVar) return;
                    privateVar = val;
                    clearTimeout(timer);
                    timer = setTimeout(() => this.emit(prop, val), 0);
                }
            });
        })
    }

    makeObservable2(...props: Array<string>) {
        props.forEach((prop) => {
            var name = "_$_" + prop;
            this[name] = this[prop];
            Object.defineProperty(this, prop, {
                get: function() {
                    return this[name];
                },
                set: function(val) {
                    this[name] = val;
                    this.emit(prop, val);
                }
            });
        })
    }


}
}

