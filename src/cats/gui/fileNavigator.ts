// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module Cats.Gui {

    /**
     * File navigator for CATS that displays a directories and its subdirectories
     * and files as a tree.
     */
    export class FileNavigator extends qx.ui.tree.VirtualTree {

        private rootTop = {
            label: "qx-cats",
            fullPath: "",
            directory: true,
            children: [{
                label: "Loading",
                icon: "loading",
                directory: false
            }],
            loaded: false
        };

        private directoryModels = {};
        private iconsForMime = {};
        private watcher: OS.File.Watcher;
        private parents = {};
        private projectDir: string;


        constructor() {
            super(null, "label", "children");
            this.setDecorator(null);
            this.setPadding(0, 0, 0, 0);
            this.loadAvailableIcons();
            var contextMenu = new FileContextMenu(this);
            this.setContextMenu(contextMenu);
        }

        setProject(project: Cats.Project) {
            this.projectDir = project.projectDir;

            this.watcher = OS.File.getWatcher();
            this.watcher.on("change", (dir) => {
                var parent = this.parents[dir];
                if (parent) this.readDir(parent);
            });

            var directory = project.projectDir;
            this.rootTop.fullPath = directory;
            this.rootTop.label = PATH.basename(directory);
            var root = qx.data.marshal.Json.createModel(this.rootTop, true);
            this.setModel(root);

            this.setupDelegate();

            this.setup();

            console.info("Icon path:" + this.getIconPath());
            this.addListener("dblclick", () => {
                var file = this.getSelectedFile();
                if (file) {
                    FileEditor.OpenEditor(file.getFullPath());
                }
            });


            // Force a relaod after a close
            /*
            this.addListener("close", (event) => {
                var data = event.getData();
                data.setLoaded(false);
            });
            */
        }

        clear() {
            this.setModel(null);
        }


        private getSelectedFile() {
            var item = this.getSelection().getItem(0);
            if (!item) return null;
            if (!item.getDirectory) return null;
            if (!item.getDirectory()) {
                return item;
            }
            return null;
        }

        /**
         * Get all available icons for mime-types
         */
        private loadAvailableIcons() {
            var iconFolder = "resource/qx/icon/Oxygen/16/mimetypes";
            var files = OS.File.readDir(iconFolder);
            files.forEach((file) => {
                if (file.isFile) {
                    var mimetype = PATH.basename(file.name, ".png");
                    this.iconsForMime[mimetype] = file.name;
                }
            });

        }

        /**
         * Get an icon for a file based on its mimetype
         */
        private getIconForFile(fileName: string) {
            var mimetype: string = Util.MimeTypeFinder.lookup(fileName).replace("/", "-");

            var icon = this.iconsForMime[mimetype];
            if (!icon) icon = this.iconsForMime["text-plain"];
            icon = "icon/16/mimetypes/" + icon;
            // IDE.console.log("Icon: " + icon);
            return icon;
        }


        private setup() {
            this.setIconPath("");
            this.setIconOptions({
                converter: (value, model) => {
                    if (value.getDirectory()) {
                        return "icon/16/places/folder.png";
                    }
                    return this.getIconForFile(value.getLabel());
                }
            });

        }

        private setupDelegate() {
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


        /**
         * Read the files from a directory
         * @param directory The directory name that should be read
         */
        private readDir(parent) {
            var directory = parent.getFullPath();
            this.watcher.addDir(directory);
            this.parents[directory] = parent;
            parent.getChildren().removeAll();
            var entries: Cats.FileEntry[] = [];
            try {
                entries = OS.File.readDir(directory, true);
            } catch (err) {/* the directory has been delete */}
            entries.forEach((entry: Cats.FileEntry) => {
                var node = {
                    label: entry.name,
                    fullPath: entry.fullName,
                    loaded: !entry.isDirectory,
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

}