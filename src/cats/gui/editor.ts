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
     * Minimal required interface for Editors. Editors should at least implement these methods
     * (if only as NOP)
     * 
     * @TODO cleanup it a bit. Editor should only expose a generic command pattern interface and possible a
     * sync/updateWorld.
     */
    export interface Editor extends qx.ui.core.Widget {

        replace(range: Ace.Range, content: string);

        getContent();

        setContent(content, keepPosition?);

        updateWorld();

        moveToPosition(pos: any);

        executeCommand(commandName: string, ...args): boolean;

    }
}
