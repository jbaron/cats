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
 * The MVC module implements as the name suggest the Model-View-Controller pattern.
 * A slight twist is that the model is capable of observing interest and automaticcaly 
 * add a view to its list of observers.
 * 
 * Also the notifications of oberservers in case of a change to the model is clustered
 * in order to minimize the number of notifications.
 * 
 * This makes it possible to use this MVC module with very little "wiring" code required.
 * 
 * MVC does require support for JavaScript Getters and Setters. 
 */ 
module MVC {

    export class View {

        private static ID = 0;
        private static VIEWER: View;

        constructor(public id?: string) {
            if (!this.id) {
                this.id = "view#" + View.ID++
            }
        }

        /**
         * Get the current active Viewer
         */
        static GetViewer(): View {
            return View.VIEWER;
        }

        /**
         * Called whenever a model changes
         */
        update() {
            this._render();
        }

        /**
         * Wrapper around render method. Main purpose is to 
         * set the view attribute on the window so a model can 
         * find out who has interest in them.
         */
        private _render() {
            var oldViewer = View.VIEWER;
            View.VIEWER = this;
            try {
                this.render();
            } finally {
                View.VIEWER = oldViewer;
            }
        }

        /** 
         * Overwrite this method in a subclass
         */
        render() { }

    }


    var __OBSERVER_CURRENT:Function;
    
    
    /**
     * Get the current Observer is any
     */ 
    export function getObserver() {
        return __OBSERVER_CURRENT;
    }
    /**
     * Make a function an observer. This means when you run this function,
     * the models keeps track of the interest and will invoke this function when 
     * the model state changes.
     * 
     * @param fn The function that should become the observer
     * @param ctx The this parameter used to invoke the function
     */ 
    export function makeObserver(fn:Function,ctx={}) {
        return function () {
            var oldObserver = __OBSERVER_CURRENT;
            __OBSERVER_CURRENT = fn;
            try {
                return fn.apply(ctx,arguments);
            } finally {
                __OBSERVER_CURRENT = oldObserver;
            }            
        }
    }


    /**
     * The Model class makes it easy to turn a plain Object into an Observable
     * Just call the static method makeObservable
     */
    export class Model {


        private static Waiting;
        private static Waiters:Function[] = null;


        /**
         * Notify observers of a change. This method bundles multiple
         * updates to the same viewer in to one
         */
        private static notify(newWaiters:Function[]) {
            if (Model.Waiting) {
                var waiters = Model.Waiters;
                newWaiters.forEach((waiter) => {
                    if (waiters.indexOf(waiter) !== -1) waiters.push(waiter);
                });
                return;
            }
            Model.Waiters = newWaiters;
            Model.Waiting = setTimeout(() => {
                var waiters = Model.Waiters;
                Model.Waiting = null;
                waiters.forEach((waiter:()=>any) => {
                    try { waiter() } catch (err) { console.error(err); }
                })}, 0);
        }

        /**
         * Is this property accessed by a viewer. If that is the case and this is the first time,
         * lets register the viewer as an observer of the property
         * @param obj The object of the property
         * @param prop The property name
         */
        private static registerObserver(obj, prop: string) {
            var observer: Function = getObserver();
            if (observer) {
                if (obj.__observers[prop].indexOf(observer) === -1) {
                    console.log("registering new observer " + observer + " for property " + prop);
                    obj.__observers[prop].push(observer);
                }
            }
        }

        /**
         * Utiltiy method to make a number of plain properties observable.
         * @param obj The object that contains the properties of interest
         * @param props The list of property names to be observable
         */
        static makeObservable(obj, props: string[]) {
            if (!obj.__observers) obj.__observers = {};
            props.forEach((prop) => {
                if (obj.__observers[prop]) return; // We already observe this property
                obj.__observers[prop] = [];
                var privateVar = obj[prop];
                Object.defineProperty(obj, prop, {
                    get: function() {
                        Model.registerObserver(obj, prop);
                        return privateVar;
                    },
                    set: function(val) {
                        if (val === privateVar) return;
                        privateVar = val;
                        Model.notify(obj.__observers[prop]);
                    }
                });
            })
        }

    }
}

