var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
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
