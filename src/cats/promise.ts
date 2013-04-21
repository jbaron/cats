module Cats {

export class Defer<T> {
    promise: Promise<T>;

    constructor() {
        this.promise = new Promise<T>();
    }

    resolve(value: T) {
        if (this.promise.resolve) this.promise.resolve(value);
    }

    reject(value: any) {
        if (this.promise.reject) this.promise.reject(value);
    }

}

export class Promise<T> {
    resolve: (value: T) => void;
    reject: (value: any) => void;
    
    constructor() { }

    then(
        resolve?: (value: T) => void,
        reject?: (value: any) => void,
        progress?: (value: any) => void
    ) {
        this.resolve = resolve;
        var d = new Defer<any>();
        return d.promise;
    }
}

function asyncComputeTheAnswerToEverything():Promise<number>{
    var result = new Defer<number>();
    setTimeout(()=>{
        result.resolve(42);
    },0);
    return result.promise;
}

function addTwo(a:number):Promise<number> {
    var result = new Defer<number>();
    setTimeout(()=>{
        result.resolve(a+2);
    },0);
    return result.promise;    
}

function print(a:number):void {
    console.log("result is " + a);
}

// asyncComputeTheAnswerToEverything().then<number>(addTwo).then<void>(print);

}
