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

    qx.Theme.define("cats.theme.Color", {
        extend: qx.theme.simple.Color,

        colors:
        {
            "light-background": "#A0ACBF",
            "button-box-bright": "#B0BCCF",
            "link" : "black"
        }
    });


    qx.Theme.define("cats.theme.ColorGrey", {
        extend: qx.theme.simple.Color,

        colors:
        {
            "light-background": "#B0B0B0",
            "button-box-bright": "#A0A0A0",
            "background-selected" : "#666666",
            "border-main" : "#666666",
            "background-selected-dark" : "#555555",
            "link" : "#EEEEEE"
        }
    });

}