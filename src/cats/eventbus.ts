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


export class Map {
    private values = [];
    
    
    get(obj) {
        for (var i=0; i<this.values.length;i++) {
            if (this.values[i].key === obj) 
                return this.values[i].value;
        }
    }
    
    
    set(key,value) {
        var entry = this.get(key);
        if (entry === undefined) {
            this.values.push({
                key:key,
                value: value
            })
        }
    }
    
}


export enum Event {
   fileRenamed,
   fileDeleted,
   
   compilationResult,
   searchResult,
   
   activeSessionChanged,
   editModeChanged,
   

}


export class EventBus2 {
    private static suscribers = new Map();
    
    static emit(event:Event,data,old?) {
        var s:Function[] = this.suscribers.get(event) || [];
        s.forEach((fn) => {
            try { fn(data,old) } catch(err) {console.error(err);}    
        })        
    }
            
    static on(obj,subscriber:()=>void) {
        var subs:Function[] = EventBus2.suscribers.get(obj);
        if (! subs) {
            subs = [];
            EventBus2.suscribers.set(obj,subs);
        }
        
        subs.push(subscriber);        
     }
    
};



/**
 * Simple Event bus to tie together the different events
 * TODO: implement a more typed version
 */
export class EventBus {
    private static suscribers = [];
    
    static emit(event:Event,data,old?) {
        var s:Function[] = this.suscribers[event] || [];
        s.forEach((fn) => {
            try { fn(data,old) } catch(err) {console.error(err);}    
        })        
    }
            
    static on(event,subscriber:(data,old?)=>void) {
      if (! this.suscribers[event]) this.suscribers[event] = [];
        EventBus.suscribers[event].push(subscriber);
     }
    
};



}