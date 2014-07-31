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
        IDE.openSession();
    }

    /**
     * Close the active edit session
     */ 
    function closeFile() {
        var activeSession = IDE.sessionTabView.getActiveSession();
        if (activeSession)
            IDE.closeSession(activeSession);
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
        var activeSession = IDE.sessionTabView.getActiveSession();
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
            if (session.changed) session.persist();
        }
    }
        
    /**
     * Save the active sessions under a different name
     */     
     function saveAs() {
        var session = IDE.sessionTabView.getActiveSession();
        if (session) {
            var newName = prompt("Enter new name", session.name);
            if (newName) {
                session.name = newName;
                session.persist();
            }
        }
    }

    /**
     * Save the active session
     */     
    function saveFile() {
        var session = IDE.sessionTabView.getActiveSession();
        if (session) session.persist();
    }

    export class FileCommands {
        static init(registry: (cmd: Command) => void ) {
            registry({ name: CMDS.file_new, label: "New File", command: newFile, icon: "actions/document-new.png" });
            registry({ name: CMDS.file_close, label: "Close File", command: closeFile, icon: "actions/project-development-close.png" });
            registry({ name: CMDS.file_closeOther, label: "Close Other Files", command: closeOtherFiles });
            registry({ name: CMDS.file_closeAll, label: "Close All Files", command: closeAllFiles,icon: "actions/project-development-close-all.png"  });
            registry({ name: CMDS.file_save, label: "Save File", command: saveFile, icon: "actions/document-save.png"  });
            registry({ name: CMDS.file_saveAll, label: "Save All", command: saveAll, icon: "actions/document-save-all.png" });
            registry({ name: CMDS.file_saveAs, label: "Save As...", command: saveAs,  icon: "actions/document-save-as.png"});
        }

    }
}