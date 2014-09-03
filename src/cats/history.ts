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
module Cats {
 
    /**
     * This class implements the history functionality 
     * that makes it possible to go back were you where 
     * before.
     */
    export class SessionHistory {

        private maxEntries = 1000;
        private entries = [];
        private pos = 0;
        private last: {
            hash: number;
            pos: any;
        };


        add(entry: Gui.SessionPage, pos?) {
            this.entries.push({
                hash: entry.toHashCode(),
                pos: pos
            });
            this.pos = this.entries.length - 1;
        }


        back() {
            var found = false;
            while ((!found) && (this.pos > 0)) {
                this.pos--;
                var entry = this.entries[this.pos];
                if (this.exists(entry)) {
                    this.goto(entry);
                    found = true;
                }

            }
        }


        next() {
            var found = false;
            while ((!found) && (this.pos < (this.entries.length - 1))) {
                this.pos++;
                var entry = this.entries[this.pos];
                if (this.exists(entry)) {
                    this.goto(entry);
                    found = true;
                }
            }
        }


        /**
         * Check if the page still is part of the sessions
         */
        private exists(entry) {
            var hash = entry.hash;
            var page = <Gui.SessionPage>qx.core.ObjectRegistry.fromHashCode(hash);
            if (!page) return false;
            return IDE.sessionTabView.getChildren().indexOf(page) > -1;
        }


        private goto(entry) {
            var hash = entry.hash;
            var page = <Gui.SessionPage>qx.core.ObjectRegistry.fromHashCode(hash);
            IDE.sessionTabView.navigateToPage(page, entry.pos, false);
        }



    }

}