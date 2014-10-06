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
    
    function darker(color, amount) {
        
    }

    function getColors() {
        var colors:any = {};
        colors.ide_fg = "black";
        colors.ide_bg = "darkgrey",
        colors.pane_bg = "white";
        colors.pane_fg = "black"
        
        colors.pane_border = darker(colors.ide_bg,10);
        return colors;
    }

}