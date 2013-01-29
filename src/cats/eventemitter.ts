module Cats {
export interface IEventEmitter {
        addListener(event: string, listener: Function);
        on(event: string, listener: Function): any;
//        once(event: string, listener: Function): void;
//        removeListener(event: string, listener: Function): void;
//        removeAllListener(event: string): void;
//        setMaxListeners(n: number): void;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): void;
}    
    


export class EventEmitter  {
    private subscribers ={};
    
    emit(event:string, ...args:any[]) {
        var s:Function[] = this.subscribers[event] || [];
        s.forEach((fn) => {
            try { fn.apply(this,args) } catch(err) {console.error(err);}            
        })        
    }
  
    listeners(event: string) : Function[]{
        return this.subscribers[event];
    }
       
    addListener(event: string, listener: Function) {
        this.on(event,listener);
    }   
       
    on(event:string,listener:Function) {
      if (! this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(listener);
     }
    
    
}


    
}