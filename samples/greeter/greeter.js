/**
* Greets you with a warm welcome.
*/
var Greeter = (function () {
    /**
    * Create a new Greeter
    * @param message The welcome message to use for all
    */
    function Greeter(message) {
        this.greeting = message;
    }
    /**
    * Give a warm welcome
    * @param name The person to welcome
    */
    Greeter.prototype.greet = function (name) {
        alert(this.greeting + " " + name + "!");
    };
    return Greeter;
})();

var greeter = new Greeter("Hello");

var button = document.createElement("button");
button.innerText = "Say Hello";
button.onclick = function () {
    greeter.greet("World");
};

document.body.appendChild(button);
