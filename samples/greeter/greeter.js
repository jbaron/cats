var Groeter = (function () {
    function Groeter(message) {
        this.greeting = message;
    }
    Groeter.prototype.greet = function () {
        return "Hello " + this.greeting;
    };
    return Groeter;
})();
var greeter = new Groeter("world");
var button = document.createElement('button');
button.innerText = "Say Hello";
button.onclick = function () {
    alert(greeter.greet());
};
document.body.appendChild(button);
