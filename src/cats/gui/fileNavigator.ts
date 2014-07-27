var fs = require("fs");
var path = require("path");

var rootTop = {
    label: "qx-cats",
    fullPath: "/Users/peter/Development/qx-cats/",
    directory: true,
    children: [{
        label: "Loading",
        icon: "loading",
        directory : false 
    }],
    loaded: false
};

/**
 * File navigator widget for CATS
 */
class FileNavigator extends qx.ui.tree.VirtualTree {

    static COUNT = 0;

    private directoryModels = {};

    constructor(directory) {
        super(null,"label", "children");
        rootTop.fullPath = directory;
        rootTop.label = path.basename(directory);
        var root = qx.data.marshal.Json.createModel(rootTop, true);
        this.setModel(root);
        // this.setLabelPath("label");
        // this.setChildProperty("children");
        this.setDecorator(null);

        this.setupDelegate();
        
        var contextMenu = new FileContextMenu(this);
        this.setContextMenu(contextMenu);
        this.setup();

        console.log("Icon path:" + this.getIconPath());    
        this.addListener("dblclick", () => {
            var file = this.getSelectedFile();
            if (file) {
                IDE.openSession(file.getFullPath());
            }
        });


        // Force a relaod after a close
        this.addListener("close", (event) => {
            var data = event.getData();
            data.setLoaded(false);
        });

    }

    getSelectedFile() {
        var item = this.getSelection().getItem(0);
        if (! item) return null;
        if (! item.getDirectory) return null;
        if (! item.getDirectory()) {
            return item;
        }
        return null;
    }


    setup() {
        this.setIconPath("");
        this.setIconOptions({
            converter : function(value, model) {
               if (value.getDirectory()) {
                   return "./resource/qx/icon/Tango/16/places/folder.png";
               }
               return "./resource/qx/icon/Tango/16/mimetypes/text-plain.png";

            }
      });

    }

    setupDelegate() {
        var self = this;
        var delegate = {
            bindItem: function(controller, item, index) {
                controller.bindDefaultProperties(item, index);

                controller.bindProperty("", "open", {
                    converter: function(value, model, source, target) {
                        var isOpen = target.isOpen();
                        if (isOpen && !value.getLoaded()) {
                            value.setLoaded(true);

                            setTimeout(function() {
                                value.getChildren().removeAll();
                                self.readDir(value);
                            }, 0);

                        }
                        return isOpen;
                    }
                }, item, index);
            }
        };
        this.setDelegate(delegate);
    }


    refreshDir(dir) {
        var value; // value = this.directoryNodes[dir];
        setTimeout(function() {
            // alert("refreshing tree");
            var node = {
                label: "Loading",
                fullPath: "asasasa/dss",
                directory : false 
            }
            value.getChildren().removeAll();
            value.getChildren().push(qx.data.marshal.Json.createModel(node, true));
        }, 0);
    }

    /**
     * Read the files from a directory
     * @param directory The directory name that should be read
     */ 
    readDir(parent){
            var entries = OS.File.readDir(parent.getFullPath(), true);
            entries.forEach((entry:Cats.FileEntry) => {
                var node = {
                   label: entry.name,
                   fullPath: entry.fullName,
                   loaded : ! entry.isDirectory,
                   directory: entry.isDirectory,
                   children: entry.isDirectory ? [{
                        label: "Loading",
                        icon: "loading",
                        directory: false
                    }] : null   
                };
                parent.getChildren().push(qx.data.marshal.Json.createModel(node, true));
            }); 
    }

}

