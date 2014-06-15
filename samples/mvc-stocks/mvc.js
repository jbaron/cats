/**
* The MVC module implements as the name suggest the Model-View-Controller pattern.
* A slight twist is that the model is capable of observing interest and automaticcaly
* add a view to its list of observers.
*
* Also the notifications of oberservers in case of a change to the model is clustered
* in order to minimize the number of notifications.
*
* This makes it possible to use this MVC module with very little "wiring" code required.
*
* MVC does require support for JavaScript Getters and Setters.
*/
var MVC;
(function (MVC) {
    var View = (function () {
        function View(id) {
            this.id = id;
            if (!this.id) {
                this.id = "view#" + View.ID++;
            }
        }
        /**
        * Get the current active Viewer
        */
        View.GetViewer = function () {
            return View.VIEWER;
        };

        /**
        * Return wether this viewer is still active and therefor could be
        * a listener.
        */
        View.isActive = function () {
            return true;
        };

        /**
        * Called whenever a model change happens
        */
        View.prototype.update = function () {
            this._render();
        };

        /**
        * Wrapper around render method. Main purpose is to
        * set the view attribute on the window so a model can
        * find out who has interest in them.
        */
        View.prototype._render = function () {
            var oldViewer = View.VIEWER;
            View.VIEWER = this;
            try  {
                this.render();
            } finally {
                View.VIEWER = oldViewer;
            }
        };

        /**
        * Overwrite this method in a subclass
        */
        View.prototype.render = function () {
        };
        View.ID = 0;
        return View;
    })();
    MVC.View = View;

    /**
    * The Model class makes it easy to turn a plain Object into an Observable
    * Just call the static method makeObservable
    */
    var Model = (function () {
        function Model() {
        }
        /**
        * Notify observers of a change. This method bundles multiple
        * updates to the same viewer in to one
        */
        Model.notify = function (newWaiters) {
            if (Model.Waiting) {
                for (var id in newWaiters) {
                    Model.Waiters[id] = newWaiters[id];
                }
                return;
            }
            Model.Waiters = newWaiters;
            Model.Waiting = setTimeout(function () {
                var waiters = Model.Waiters;
                Model.Waiting = null;
                for (var id in waiters) {
                    var viewer = waiters[id];
                    try  {
                        viewer.update();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }, 0);
        };

        /**
        * Is this property accessed by a viewer. If that is the case and this is the first time,
        * lets register the viewer as an observer of the property
        * @param obj The object of the property
        * @param prop The property name
        */
        Model.registerViewer = function (obj, prop) {
            var viewer = View.GetViewer();
            if (viewer) {
                if (!obj.__observers[prop][viewer.id]) {
                    console.log("registering viewer " + viewer.id + " for property " + prop);
                    obj.__observers[prop][viewer.id] = viewer;
                }
            }
        };

        /**
        * Utiltiy method to make a number of plain properties observable.
        * @param props The list of property names to be observable
        */
        Model.makeObservable = function (obj, props) {
            if (!obj.__observers)
                obj.__observers = {};
            props.forEach(function (prop) {
                if (obj.__observers[prop])
                    return;
                obj.__observers[prop] = {};
                var privateVar = obj[prop];
                Object.defineProperty(obj, prop, {
                    get: function () {
                        Model.registerViewer(obj, prop);
                        return privateVar;
                    },
                    set: function (val) {
                        if (val === privateVar)
                            return;
                        privateVar = val;
                        Model.notify(obj.__observers[prop]);
                    }
                });
            });
        };
        Model.Waiters = null;
        return Model;
    })();
    MVC.Model = Model;
})(MVC || (MVC = {}));
//# sourceMappingURL=mvc.js.map
