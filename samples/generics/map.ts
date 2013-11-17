
/**
 * Simple typed Map interface where the key is 
 * always a string.
 */ 
interface StringedKeyMap<T> {
    [key:string]:T;
}

/**
 * Sample Car class 
 */ 
class Car {
    constructor(public seats, public topSpeed) {}
}

var map:StringedKeyMap<Car> = {};

map["Honda Civic"] = new Car(4,110);
map["Porsche 911"] = new Car(2,180);

console.log(map["Honda Civic"]);
