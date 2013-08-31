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

    /**
     * Create a new edit session
     */ 
    function newFile() {
        IDE.openSession("untitled");
    }

    /**
     * Close the active edit session
     */ 
    function closeFile() {
        if (IDE.activeSession)
            IDE.closeSession(IDE.activeSession);
    }

    /**
     * Close all edit sessions
     */ 
    function closeAllFiles() {
        var sessions = IDE.sessions;
        sessions.forEach((session: Session) => {IDE.closeSession(session)});
    }

    /**
     * Close all edit sessions except the active session
     */ 
    function closeOtherFiles() {       
        var sessions = IDE.sessions;
        var activeSession = IDE.activeSession;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session !== activeSession) {
                IDE.closeSession(session);
            }
        }
    }

    /**
     * Save all edit sessions that have changed
     */ 
    function saveAll() {
        var sessions = IDE.sessions;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session.changed) IDE.persistSession(session);
        }
    }
        
    /**
     * Save the active sessions under a different name
     */     
     function saveAs() {
        var session = IDE.activeSession;
        if (session) {
            var newName = prompt("Enter new name", session.name);
            if (newName) {
                OS.File.writeTextFile(newName,session.getValue());
            }
        }
    }

    /**
     * Save the active session
     */     
    function saveFile() {
        var session = IDE.activeSession;
        if (session) IDE.persistSession(session);
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