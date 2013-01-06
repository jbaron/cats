// This module contains all the global commands pertaining to the file functionality

module Cats.Commands {

    function newFile() {
        cats.project.editFile("untitled", "");
    }

    function closeFile() {
        cats.mainEditor.closeSession(cats.mainEditor.activeSession);
    }

    function closeAllFiles() {
        cats.mainEditor.closeAllSessions();
    }

    function closeOtherFiles() {
        // Make a copy of sessions
        var sessions = cats.mainEditor.sessions.slice(0);
        var activeSession = cats.mainEditor.activeSession;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session !== activeSession) {
                cats.mainEditor.closeSession(session);
            }
        }
    }

    export class FileCommands {
        static init(registry) {
            registry("file.new", newFile);
            registry("file.close", closeFile);
            registry("file.closeother", closeOtherFiles);
            registry("file.closeall", closeAllFiles);
        }

    }
}