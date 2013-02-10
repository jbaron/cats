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




    function rangeToPosition(range: Cats.Range): string {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
    }

  export class SearchResults extends BaseView {

    constructor() {
         super(document.getElementById("searchresults"));             
    }

    render(data: Cats.FileRange[]) {
        var searchResultsElem = IDE.searchResult;
        searchResultsElem.innerHTML = "";
        if (data) {
            var grid = new Cats.UI.Grid();
            grid.setColumns(["message", "unitName", "position"]);
            grid.setRows(data);
            grid.setAspect("position", (row) => { return rangeToPosition(row.range) });
            grid.render();
            grid.appendTo(searchResultsElem);
            grid.onselect = (sel: Cats.FileRange) => {
                IDE.openSession(sel.unitName, sel.range.start);
            };

        }
    }
}

}