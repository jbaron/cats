interface StringedKeyMap<T> {
    [key:string]:T;
};


class Car {
    constructor(public seats, public topSpeed) {}
}


var map:StringedKeyMap<Car> = {};

map["Honda Civic"] = new Car(4,110);
map["Porsche 911"] = new Car(2,180);

console.log(map["Honda Civic"]);