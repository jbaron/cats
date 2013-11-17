/**
* A number of sliders are kept in sync because the use the
* same value in the model. Shows some of the strenght of a
* MVC framework
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='mvc.ts'/>
/**
* SliderView is responsible for rendering a input of the type range
*/
var SliderView = (function (_super) {
    __extends(SliderView, _super);
    /**
    * Create a new slider <input type=range>
    * @param parent The HTML element to add this slider to
    */
    function SliderView(parent) {
        _super.call(this);
        this.root = document.createElement("input");
        this.root.type = "range";

        // When the slider is moved update the model value. This will then
        // cause other sliders also to update.
        this.root.onchange = function (ev) {
            model.value = ev.srcElement["value"];
        };
        parent.appendChild(this.root);
    }
    /**
    * This method will be called when the model.value property changes
    * Don't call this method directly, use view.update() instead
    */
    SliderView.prototype.render = function () {
        this.root.value = model.value;
    };
    return SliderView;
})(MVC.View);

// A very simpel model, just a plain JS object
var model = {
    value: "25"
};

// Make the value property observable
MVC.Model.makeObservable(model, ["value"]);

for (var i = 0; i < 20; i++) {
    var view = new SliderView(document.body);
    view.update();
}
