//
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

module Cats.View {

    interface OutlineTreeElement {
        name: string;
        decorator: string;
        qualifyer: string;
        kind: string;
        isFolder?: bool;
    }

    function navigateToItemHasChildren(name: string, kind: string, data: NavigateToItem[]): bool {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if ((item.containerName === name) && (item.containerKind === kind)) return true;
        }
        return false;
    }

    export class Outline extends BaseView {

        constructor() {
            super(document.getElementById("outlinenav"));
            this.icon = "icon-outline";
            this.name = "Outline";
            this.initOutlineView();
        }

        handleOutlineEvent(session: Session) {
            var project = session.project;
            var mode = "getScriptLexicalStructure";
            // var mode = "getOutliningRegions";
            project.iSense.perform(mode, session.name, (err, data: NavigateToItem[]) => {
                IDE.outlineNavigation.innerHTML = "";
                var outliner = new Cats.UI.TreeView();
                outliner.setAspect("children", (parent: OutlineTreeElement): OutlineTreeElement[] => {
                    var name = parent ? parent.qualifyer : "";
                    var kind = parent ? parent.kind : "";
                    var result: OutlineTreeElement[] = [];
                    for (var i = 0; i < data.length; i++) {
                        var o = data[i];
                                                
                        if ((o.containerKind === kind) && (o.containerName === name)) {
                            var fullName = o.name;
                            if (name) fullName = name + "." + fullName;
                            var item: OutlineTreeElement = {
                                name: o.name,
                                decorator: "icon-" + o.kind,
                                qualifyer: fullName,
                                kind: o.kind,
                                outline: o
                            };

                            item.isFolder = navigateToItemHasChildren(fullName, o.kind, data); // !(o.kind === "method" || o.kind === "constructor" || o.kind === "function")

                            result.push(item);
                        }
                    }
                    return result;
                });
                outliner.appendTo(IDE.outlineNavigation);
                outliner.onselect = (value) => {
                    var data: NavigateToItem = value.outline;
                    IDE.openSession(data.unitName, { row: data.range.start.row, column: data.range.start.column });
                };
                outliner.refresh();
            });

        }

        initOutlineView() {
            IDE.mainEditor.on("activeSession", (session: Session) => {
                if (session && (session.mode === "typescript"))
                    this.handleOutlineEvent(session);
                else
                    IDE.outlineNavigation.innerHTML = "";
            });

        }

    }

}