////[d:/ts/cats/samples/mvc-sliders/mvc.js]
var MVC;
(function (MVC) {
    var View = (function () {
        function View(id) {
            this.id = id;
            if (!this.id) {
                this.id = "view#" + View.ID++;
            }
        }
        View.ID = 0;
        View.GetViewer = function GetViewer() {
            return View.VIEWER;
        };
        View.prototype.update = function () {
            this._render();
        };
        View.prototype._render = function () {
            var oldViewer = View.VIEWER;
            View.VIEWER = this;
            try  {
                this.render();
            } finally {
                View.VIEWER = oldViewer;
            }
        };
        View.prototype.render = function () {
        };
        return View;
    })();
    MVC.View = View;    
    var Model = (function () {
        function Model() { }
        Model.Waiters = null;
        Model.notify = function notify(newWaiters) {
            if (Model.Waiting) {
                for(var id in newWaiters) {
                    Model.Waiters[id] = newWaiters[id];
                }
                return;
            }
            Model.Waiters = newWaiters;
            Model.Waiting = setTimeout(function () {
                var waiters = Model.Waiters;
                Model.Waiting = null;
                for(var id in waiters) {
                    var viewer = waiters[id];
                    try  {
                        viewer.update();
                    } catch (err) {
                        console.error(err);
                    }
                }
            }, 0);
        };
        Model.registerViewer = function registerViewer(obj, prop) {
            var viewer = View.GetViewer();
            if (viewer) {
                if (!obj.__observers[prop][viewer.id]) {
                    console.log("registering viewer " + viewer.id + " for property " + prop);
                    obj.__observers[prop][viewer.id] = viewer;
                }
            }
        };
        Model.makeObservable = function makeObservable(obj, props) {
            if (!obj.__observers) {
                obj.__observers = {};
            }
            props.forEach(function (prop) {
                if (obj.__observers[prop]) {
                    return;
                }
                obj.__observers[prop] = {};
                var privateVar = obj[prop];
                Object.defineProperty(obj, prop, {
                    get: function () {
                        Model.registerViewer(obj, prop);
                        return privateVar;
                    },
                    set: function (val) {
                        if (val === privateVar) {
                            return;
                        }
                        privateVar = val;
                        Model.notify(obj.__observers[prop]);
                    }
                });
            });
        };
        return Model;
    })();
    MVC.Model = Model;    
})(MVC || (MVC = {}));