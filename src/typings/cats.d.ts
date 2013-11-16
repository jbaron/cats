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


// Declare the global JQuery $
declare var $;

declare module Cats {

    interface Map<T>  {
        [index:string]:T;
    }


    interface Editor {
        hide();
        show();
        edit(session, position);
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
        isFile: boolean; // is this a folder or a file
        isDirectory: boolean; // is this a folder or a file
    }

    interface Session {
        name: string;
        type: string;
        project: any;
        mode: string;
        changed: boolean;
        shortName: string;
        getValue(): string;
        setValue(value: string);
        getPosition():any;
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
            path: string;
            pos: Position;
        }[];
    }

    /**
     * Used for storing project specific settings
     */
    interface ProjectConfiguration {
        version: string;
        name?: string;
        main?: string;
        sourcePath?: string;
        destPath?: string;
        buildOnSave?: boolean;
        compiler: {
            useDefaultLib: boolean;
            outputOption: string;
            emitComments: boolean;
            generateDeclarationFiles: boolean;
            mapSourceFiles: boolean;
            codeGenTarget: number;
            moduleGenTarget: number;
        };
        editor: {
            newLineMode: string; //unix, windows, auto
            useSoftTabs: boolean;
            tabSize: number;
        };
        completionMode: string; // strict, loose
    }

    interface Position {
        row: number;
        column: number;
    }

    interface Range {
        start: Position;
        end: Position;
    }

    class TypeInfo extends Services.TypeInfo {
        description: string;
    }

    interface FileRange {
        fileName: string;
        range: Range;
        message?: string;
        context?: string;
    }

    interface CompileResults {
        source: { fileName: string; content: string; }[];
        errors: FileRange[];
    }

    class NavigateToItem extends Services.NavigateToItem {
        range: Range;
    }

}