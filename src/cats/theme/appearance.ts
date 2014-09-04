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

module Cats.Theme {

    function noDecorator() {
        return {
            base: true,
            style: function(states: any) { return { decorator: undefined }; }
        };
    }

    qx.Theme.define("cats.theme.Appearance",
        {
            extend: qx.theme.simple.Appearance,

            appearances:
            {

                "root": {
                    base: true,
                    style: function(states) {
                        return {
                            backgroundColor: "light-background"
                        };
                    }
                },

                "tabview-page/button": {
                    base: true,
                    style: function(states) {
                        return {
                            padding: [6, 6, 6, 6]
                        };
                    }
                },

                "splitpane": {
                    style: function(states) {
                        return {
                            backgroundColor: "light-background",
                            decorator: undefined
                        };
                    }
                },


                "toolbar": {
                    base: true,
                    style: function(states) {
                        return {
                            backgroundColor: undefined,
                        };
                    }
                },

                "toolbar-button": {
                    base: true,
                    style: function(states) {
                        return {
                            padding: [3, 3],
                            margin: [5, 5]
                        };
                    }
                },

         "listitem" :
            {
              alias : "atom",
        
              style : function(states)
              {
                var padding = [1, 5, 1, 5];
                if (states.lead) {
                  padding = [ 1, 4 , 1, 4];
                }
                if (states.dragover) {
                  padding[2] -= 2;
                }
        
                var backgroundColor;
                if (states.selected) {
                  backgroundColor = "background-selected"
                  if (states.disabled) {
                    backgroundColor += "-disabled";
                  }
                }
                return {
                  gap : 2,
                  padding : padding,
                  backgroundColor : backgroundColor,
                  textColor : states.selected ? "text-selected" : undefined,
                  decorator : states.lead ? "lead-item" : states.dragover ? "dragover" : undefined,
                  opacity : states.drag ? 0.5 : undefined
                };
              }
            },


                "__virtual-tree": noDecorator(),

                "__toolbar-button": noDecorator(),

                "__tabview/pane": {
                    base: true,
                    style: function(states) {
                        return {
                            backgroundColor: undefined,
                        };
                    }
                }

            }
        });

}