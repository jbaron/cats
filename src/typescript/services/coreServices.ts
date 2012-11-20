// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\compiler\typescript.ts' />
///<reference path='classifier.ts' />
///<reference path='languageService.ts' />
///<reference path='formatting\formatting.ts' />

// Access to "Debug" object 
var debugObjectHost = (<any>this);

module Services {

    export interface ICoreServicesHost {
        logger: TypeScript.ILogger;
    }

    export class CoreServices {
        constructor (public host: ICoreServicesHost) {
        }

        public getPreProcessedFileInfo(scritpId: string, sourceText: TypeScript.ISourceText): TypeScript.IPreProcessedFileInfo {
            var settings = new TypeScript.CompilationSettings();
            settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            var result = TypeScript.preProcessFile(sourceText, settings);
            return result;
        }

        public getDefaultCompilationSettings(): TypeScript.CompilationSettings {
            // Set "ES5" target by default for language service
            var settings = new TypeScript.CompilationSettings();
            settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            return settings;
        }

        public dumpMemory(): string {
            if (!debugObjectHost || !debugObjectHost.Debug || !debugObjectHost.Debug.dumpHeap) {
                throw new Error("This version of the Javascript runtime doesn't support the 'Debug.dumpHeap()' function.");
            }

            var objects = debugObjectHost.Debug.dumpHeap(2);
            var totalSize = 0;
            for (var i = 0; i < objects.length; i++) {
                totalSize += objects[i].size;
            }

            return "There are " + objects.length + " object(s) accessible from 'global', for a total of " + totalSize + " byte(s).";
        }

        public getMemoryInfo(): any[] {
            if (!debugObjectHost || !debugObjectHost.Debug || !debugObjectHost.Debug.getMemoryInfo) {
                throw new Error("This version of the Javascript runtime doesn't support the 'Debug.getMemoryInfo()' function.");
            }

            return debugObjectHost.Debug.getMemoryInfo();
        }

        public collectGarbage(): void {
            if (!debugObjectHost || !debugObjectHost.CollectGarbage) {
                throw new Error("This version of the Javascript runtime doesn't support the 'CollectGarbage()' function.");
            }

            debugObjectHost.CollectGarbage();
        }
    }
}
