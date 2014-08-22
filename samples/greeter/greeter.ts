/**
 * Greets you with a warm welcome.
 */
class Greeter {
    greeting: string;

    /**
     * Create a new Greeter
     * @param message The welcome message to use for greeting
     */
    constructor(message: string) {
        this.greeting = message;
    }

    /**
     * Give a warm welcome
     * @param name The person to welcome
     */
    greet(name:string) {
        alert(this.greeting + " " + name + "!");
    }
}

var greeter = new Greeter("Hello");

var button = document.createElement("button");
button.innerText = "Say Hello";
button.onclick = function() { greeter.greet("World"); };

document.body.appendChild(button);
