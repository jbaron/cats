module Cats {


    interface Editor {
        hide();
        show();
        
    }

    interface IView {
        icon: string;
        name: string;
        show();
        hide();
        appendTo(root: HTMLElement);
    }



    interface FileEntry {
        name: string; // Just the file/directory name without path
        fullName: string; // fullName including path
        isFile: bool; // is this a folder or a file
        isDirectory: bool; // is this a folder or a file
    }


    interface ISession {
        id:string;
        project: any;
        changed: bool;
        getValue() : string;
        setValue(value:string);
        getEditor():Editor;
        persist();
    }

    /**
     * Used for storing IDE specific settings
     */ 
    interface IDEConfiguration {
        version: string;
        theme: string;
        fontSize: number;
        projects: string[];
        sessions: {
            path:string;
            pos:Position;
        }[];
    }

    /**
     * Used for storing project specific settings
     */ 
    interface Configuration {
        name?: string;
        main?: string;
        sourcePath?: string;
        buildOnSave?: bool;
        compiler: {
            useDefaultLib: bool;
            outputOption: string;
            emitComments: bool;
            generateDeclarationFiles: bool;
            mapSourceFiles: bool;
            codeGenTarget: number;
            moduleGenTarget: number;
        };
    };

    declare interface Position {
        row: number;
        column: number;
    }

    declare interface Range {
        start: Position;
        end: Position;
    }

    declare class TypeInfo extends Services.TypeInfo {
        description: string;
    }

    declare interface FileRange {
        unitName: string;
        range: Range;
        message?: string;
        context?: string;
    }

    declare interface CompileResults {
        source: any;
        errors: FileRange[];
    }

    declare class NavigateToItem extends Services.NavigateToItem {
        range: Range;
        unitName: string;
    }
}