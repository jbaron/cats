/**
 * Greets you with a warm welcome.
 */
class Greeter {
    greeting: string;

    /**
     * Create a new Greeter
     * @param message Welcome message
     */ 
    constructor(message: string) {
        this.greeting = message;
    }
    
    /**
     * Give a warm welcome
     */ 
    greet() {
        return "Hello " + this.greeting;
    }
}


var greeter = new Greeter("world!");

var button = document.createElement('button');
button.innerText = "Say Hello";
button.onclick = function() { 
    alert(greeter.greet());
};

document.body.appendChild(button);
