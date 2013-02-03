var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SliderView = (function (_super) {
    __extends(SliderView, _super);
    function SliderView(parent) {
        _super.call(this);
        this.root = document.createElement("input");
        this.root.type = "range";
        this.root.onchange = function (ev) {
            model.value = ev.srcElement["value"];
        };
        parent.appendChild(this.root);
    }
    SliderView.prototype.render = function () {
        this.root.value = model.value;
    };
    return SliderView;
})(MVC.View);
var model = {
    value: "25"
};
MVC.Model.makeObservable(model, [
    "value"
]);
for(var i = 0; i < 20; i++) {
    var view = new SliderView(document.body);
    view.update();
}
