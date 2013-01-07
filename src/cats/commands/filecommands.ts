// This module contains all the global commands pertaining to the file functionality

module Cats.Commands {

    function newFile() {
        Cats.project.editFile("untitled", "");
    }

    function closeFile() {
        Cats.mainEditor.closeSession(Cats.mainEditor.activeSession);
    }

    function closeAllFiles() {
        Cats.mainEditor.closeAllSessions();
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

    export class FileCommands {
        static init(registry) {
            registry("file.new", newFile);
            registry("file.close", closeFile);
            registry("file.closeother", closeOtherFiles);
            registry("file.closeall", closeAllFiles);
        }

    }
}