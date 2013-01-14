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

    function saveAll() {
        var sessions = Cats.mainEditor.sessions;
        for (var i = 0; i < sessions.length; i++) {
            var session = sessions[i];
            if (session.changed) session.persist();
        }
    }

    function saveFile() {
        Cats.mainEditor.aceEditor.execCommand("save");
    }

    export class FileCommands {
        static init(registry: (cmd: Command) => void ) {
            registry({ name: CMDS.file_new, label: "New File", command: newFile });
            registry({ name: CMDS.file_close, label: "Close File", command: closeFile });
            registry({ name: CMDS.file_closeOther, label: "Close Other File", command: closeOtherFiles });
            registry({ name: CMDS.file_closeAll, label: "Close All File", command: closeAllFiles });
            registry({ name: CMDS.file_save, label: "Save File", icon:"static/img/save_edit.gif", command: saveFile });
            registry({ name: CMDS.file_saveAll, label: "Save All", icon:"static/img/saveall_edit.gif",command: saveAll });
            registry({ name: CMDS.file_saveAs, label: "Save As...", icon:"static/img/saveas_edit.gif", command: null });
        }

    }
}