/**
 * Greets you with a warm welcome.
 */
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return "Hello " + this.greeting;
    }
}

class TabStrip<T> {
    addTab(value:T) : Tab;
    removeTab(value: T) : Tab;
    onSelect(fn:(value:T)=>void);
}

var greeter = new Greeter("world");

var button = document.createElement('button');
button.innerText = "Say Hello";
button.onclick = function() { 
    alert(greeter.greet()); 
};

document.body.appendChild(button);