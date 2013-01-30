   
   export interface Observable {
        emit(event: string, ...args: any[]);
        listeners(event: string):Observer[];
        removeListener(event:string, listener:Function);
        on(event: string, listener: Observer);
    }
   
   export interface Observer {
       (data,src):void;
   }
   
   /**
    * A utility class that makes it easy to make observable properties
    * Just inherit from this class and call one method
    */ 
   export class ObservableImpl implements Observable{

        // Give it is name that won't quickly conflict with classes that inherit this
        private _observerRegistry = {};

        
        /*
        constructor(instance?: Observable, ...props: string[]) {
            if (instance) this.makeObservable.apply(instance, props);            
        }
        */

        constructor(...props: string[]) {
            if (props.length)
                this.makeObservable.apply(this, props);
        }


        removeListener(event,listener) {
            var o = this._observerRegistry[event];
            // ToDo implement
        }

        /**
         * Notify observers of a property change
         */ 
        emit(propertyName: string, value: any) {
        // emit(event: string, ...args: any[]) {
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
                listener.call(this,this[event],this);
            }
        }
                
        /**
         * Make a number of plain properties observable
         * @param props The list of properties to be observable
         */
        makeObservable(...props: string[]) {
            props.forEach((prop) => {
                var privateVar = this[prop];
                Object.defineProperty(this, prop, {
                    get: function() {
                        return privateVar;
                    },
                    set: function(val) {
                        privateVar = val;
                        this.emit(prop, val);
                    }
                });
            })
        }
        
        makeObservable2(...props: string[]) {
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

/**
 * Simple test case
 */ 

class Person extends ObservableImpl {
 name:string = "no name yet";
 address:string;

 constructor() {
     super("name", "address");
     // this.makeObservable("name", "address");
 }
 

}

var p = new Person();
p.on("name", (name) => {console.log("name changed to " + name)},true );
p.on("address", function(address) {console.log("Address changed of " + this.name)} );
p.on("address", (address,src) => {console.log("Address of " + src.name + " changed to " + address)} );
p.name = "Peter";
p.name = "John";
p.address = "mainstreet 1";
console.log(p.name);