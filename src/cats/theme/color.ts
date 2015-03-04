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

    function darken(hex:string, lum=0) {
    	// validate hex string
    	hex = String(hex).replace(/[^0-9a-f]/gi, '');
    	if (hex.length < 6) {
    		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    	}
    
    	// convert to decimal and change luminosity
    	var rgb = "#", c:any;
    	for (var i = 0; i < 3; i++) {
    		c = parseInt(hex.substr(i*2,2), 16);
    		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    		rgb += ("00"+c).substr(c.length);
    	}
    
    	return rgb;
    }



    var base = {
        ide_fg : "#010101",
        ide_bg : "#AABBCC" ,
        pane_fg : "#010101",
        pane_bg : "#FEFEFE",
        accent : "#5685D6"
    };


    qx.Theme.define( "cats.theme.Color", {
        
     
        colors:
        {
            // main
            "background": base.pane_bg,
            "dark-blue": base.accent,
            "light-background": base.ide_bg,
            "link": base.ide_fg,

            // backgrounds
            "background-selected": "#6694E3",
            "background-selected-disabled": "#CDCDCD",
            "background-selected-dark": base.accent,
            "background-disabled": "#F7F7F7",
            "background-disabled-checked": "#BBBBBB",
            "background-pane": "#FAFBFE",

            // tabview
            "tabview-unselected": "#1866B5",
            "tabview-button-border": "#134983",
            "tabview-label-active-disabled": "#D9D9D9",


            // scrollbar
            "scrollbar-bright": "#F1F1F1",
            "scrollbar-dark": "#EBEBEB",

            // form
            "button": "#E8F0E3",
            "button-border": "#BBB",
            "button-border-hovered": "#939393",
            "invalid": "#FF0000",
            "button-box-bright": "rgba(200, 200, 200, 0.8)", // was F9F9F9F9
            "button-box-dark": "#E3E3E3",
            "button-box-bright-pressed": "#DDDDDD",
            "button-box-dark-pressed": "#F5F5F5",
            "border-lead": "#888888",

            // window
            "window-border": "#2E3A46",
            "window-border-inner": "#9DCBFE",

            // group box
            "white-box-border": "#BCBCBC",

            // shadows
            "shadow": qx.core.Environment.get( "css.rgba" ) ? "rgba(0, 0, 0, 0.4)" : "#666666",

            // borders
            // 'border-main' is an alias of 'background-selected' (compatibility reasons)
            "border-main": "#6694E3",
            "border-light": "#B7B7B7",
            "border-light-shadow": "#686868",

            // separator
            "border-separator": "#808080",

            // text
            "text": "black",
            "text-disabled": "#A7A6AA",
            "text-selected": "white",
            "text-placeholder": "#CBC8CD",

            // tooltip
            "tooltip": "#FFFFE1",
            "tooltip-text": "black",

            // table
            "table-header": [242, 242, 242],
            "table-focus-indicator": [179, 217, 255],

            // used in table code
            "table-header-cell": [235, 234, 219],
            "table-row-background-focused-selected": [90, 138, 211],
            "table-row-background-focused": [221, 238, 255],
            "table-row-background-selected": [51, 94, 168],
            "table-row-background-even": "white",
            "table-row-background-odd": "white",
            "table-row-selected": [255, 255, 255],
            "table-row": [0, 0, 0],
            "table-row-line": "#EEE",
            "table-column-line": "#EEE",

            // used in progressive code
            "progressive-table-header": "#AAAAAA",
            "progressive-table-row-background-even": [250, 248, 243],
            "progressive-table-row-background-odd": [255, 255, 255],
            "progressive-progressbar-background": "gray",
            "progressive-progressbar-indicator-done": "#CCCCCC",
            "progressive-progressbar-indicator-undone": "white",
            "progressive-progressbar-percent-background": "gray",
            "progressive-progressbar-percent-text": "white"
        }


    });


    qx.Theme.define( "cats.theme.ColorGrey", {
        extend: qx.theme.simple.Color,

        colors:
        {
            "light-background": "#B0B0B0",
            "button-box-bright": "#A0A0A0",
            "background-selected": "#666666",
            "border-main": "#666666",
            "background-selected-dark": "#555555",
            "link": "#EEEEEE"
        }
    });

}
