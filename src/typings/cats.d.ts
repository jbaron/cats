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


declare module cats {
    var theme: any;
}

declare module Cats {

    interface JSONRPCRequest {
        id?: number;
        method:string;
        params?:any;
    }

    interface Map<T>  {
        [index:string]:T;
    }

    interface CompletionEntry {
        value?: string
        meta: string;
        caption?: string;
        name?: string;
        snippet?: string;
    }

    interface FileEntry {
        name: string; // Just the file/directory name without path
        fullName: string; // fullName including path
        isFile: boolean; // is this a folder or a file
        isDirectory: boolean; // is this a folder or a file
    }

 
    /**
     * Interface for the possible IDE specific settings
     */
    interface IDEConfiguration {
        version: string;
        theme?: string;
        editor?: {
            rightMargin?: number;
            fontSize?: number;
            theme?: string;
            completionMode?:string;
        };
        rememberOpenFile?: boolean;
        locale?:string;
        projects: string[];
        sessions: {
            path: string;
            state?: any;
        }[];
    }


    interface RunExternal {
        command: string;
        useOwnConsole?: boolean;
        options?: {
            env?: string;
            cwd?: string;
        }
    }

    /**
     * Used for storing project specific settings
     */
    interface ProjectConfiguration {
        version: string;
        name?: string;
        main?: string;
        src?: string;
        destPath?: string;
        buildOnSave?: boolean;
        customBuild?:RunExternal;
        customRun?:RunExternal;
        compiler:  {
            noLib?: boolean;  // undefined by default
            outFileOption?: string; // undefined by default
            outDirOption?: string; // undefined by default 
            removeComments?: boolean; // undefined by default
            generateDeclarationFiles?: boolean; // undefined by default
            mapSourceFiles?: boolean; // undefined by default
            codeGenTarget?: number; // undefined by default
            moduleGenTarget?: number; // undefined by default
            allowAutomaticSemicolonInsertion?: boolean; // undefined by default
        }; 
        codingStandards: {
            newLineMode?: string; // unix, windows. auto
            useSoftTabs?: boolean; // true by default
            tabSize?: number; // 4 by default
            useLint?: boolean; // false by default
            lintFile?: string; // <cats>/static/jslint.json by default 
        };
        documentation: {
            theme?:string;
            readme?:string;
            outputDirectory?:string;
            includeDeclarations?:boolean;
        }
       
    }

    interface Position {
        row: number;
        column: number;
    }

    class TypeInfo extends TypeScript.Services.TypeInfo {
        description: string;
    }

    interface CompileResults {
        source: { fileName: string; content: string; }[];
        errors: FileRange[];
    }

    class NavigateToItem extends TypeScript.Services.NavigateToItem {
        range: Range;
    }
    
     

}
