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


// This module contains all the global commands pertaining to the file functionality

module Cats.Commands {

    function newFile() {
        Cats.project.editFile("untitled", "");
    }

    function closeFile() {
        if (Cats.mainEditor.activeSession)
            Cats.mainEditor.closeSession(Cats.mainEditor.activeSession);
    }

    // Close all sessions and hide the editor
    function closeAllFiles() {
        var sessions = Cats.mainEditor.sessions.slice(0);
        sessions.forEach((session: Session) => {Cats.mainEditor.closeSession(session)});
    }


    function closeOtherFiles() {
        // Make a copy of sessions
        var sessions = Cats.mainEditor.sessions.slice(0);
        var activeSession = Cats.mainEditor.activeSession;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session !== activeSession) {
                Cats.mainEditor.closeSession(session);
            }
        }
    }

    function saveAll() {
        var sessions = Cats.mainEditor.sessions;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session.changed) session.persist();
        }
    }
        
     function saveAs() {
        var session = Cats.mainEditor.activeSession;
        if (session) {
            var newName = prompt("Enter new name", session.name);
            if (newName) {
                Cats.project.writeTextFile(newName,session.getValue());
            }
        }
    }

    function saveFile() {
        Cats.mainEditor.aceEditor.execCommand("save");
    }

    export class FileCommands {
        static init(registry: (cmd: Command) => void ) {
            registry({ name: CMDS.file_new, label: "New File", command: newFile });
            registry({ name: CMDS.file_close, label: "Close File", command: closeFile });
            registry({ name: CMDS.file_closeOther, label: "Close Other Files", command: closeOtherFiles });
            registry({ name: CMDS.file_closeAll, label: "Close All Files", command: closeAllFiles });
            registry({ name: CMDS.file_save, label: "Save File", icon:"static/img/save_edit.gif", command: saveFile });
            registry({ name: CMDS.file_saveAll, label: "Save All", icon:"static/img/saveall_edit.gif",command: saveAll });
            registry({ name: CMDS.file_saveAs, label: "Save As...", icon:"static/img/saveas_edit.gif", command: saveAs });
        }

    }
}