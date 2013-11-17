/**
 * A number of sliders are kept in sync because the use the 
 * same value in the model. Shows some of the strenght of a 
 * MVC framework
 */

///<reference path='mvc.ts'/>

/**
 * SliderView is responsible for rendering a input of the type range
 */
class SliderView extends MVC.View {

    private root: HTMLInputElement;

    /**
     * Create a new slider <input type=range>
     * @param parent The HTML element to add this slider to
     */
    constructor(parent: HTMLElement) {
        super();
        this.root = <HTMLInputElement>document.createElement("input");
        this.root.type = "range";
        
        // When the slider is moved update the model value. This will then
        // cause other sliders also to update. 
        this.root.onchange = (ev) => {
            model.value = ev.srcElement["value"];
        }
        parent.appendChild(this.root);
    }

    /**
     * This method will be called when the model.value property changes
     * Don't call this method directly, use view.update() instead
     */
    render() {
        this.root.value = model.value;
    }
}

// A very simpel model, just a plain JS object
var model = {
    value: "25"
}

// Make the value property observable
MVC.Model.makeObservable(model, ["value"]);

// Create some sliders
for (var i = 0; i < 20; i++) {
    var view = new SliderView(document.body);
    view.update();
}
