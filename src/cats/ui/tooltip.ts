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

module Cats.UI {

export class ToolTip {

    private element:HTMLElement;

    constructor() {    
        this.element = this.createElement();
    };
    
    show(x:number, y:number, tip:string) {
        this.element.innerHTML = tip;

        var st = this.element.style;
        st.left = (x + 10).toString(10) + "px";
        st.top =  (y + 10).toString(10) + "px";
        
        st.display = "block";
    };

    hide() {
        this.element.style.display = "none";
    }

    // Copied from Ace kitchen-sinck demo
    private createElement() {
        var tooltipNode = <HTMLElement>document.createElement("div");
        document.documentElement.appendChild(tooltipNode);
        var st = tooltipNode.style;
        st.position = "fixed";
        st.display = "none";
        st.background = "#ffffca";
        st.color = "#000023";
        st.borderRadius = "";
        st.border = "1px solid gray";
        st.padding = "1px";
        st.zIndex = "1000";
        st.fontFamily = "monospace";
        st.whiteSpace = "pre-line";
        return tooltipNode;
    };


}

}