/**
* Sample Car class
*/
var Car = (function () {
    function Car(seats, topSpeed) {
        this.seats = seats;
        this.topSpeed = topSpeed;
    }
    return Car;
})();

var map = {};

map["Honda Civic"] = new Car(4, 110);
map["Porsche 911"] = new Car(2, 180);

console.log(map["Honda Civic"]);
