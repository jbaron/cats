// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export class SourceMapPosition {
        public sourceLine: number;
        public sourceColumn: number;
        public emittedLine: number;
        public emittedColumn: number;
    }

    export class SourceMapping {
        public start = new SourceMapPosition();
        public end = new SourceMapPosition();
        public nameIndex: number = -1;
        public childMappings: SourceMapping[] = [];
    }

    export class SourceMapper {
        static MapFileExtension = ".map";
        
        public sourceMappings: SourceMapping[] = [];
        public currentMappings: SourceMapping[][] = [];

        public names: string[] = [];
        public currentNameIndex: number[] = [];

        public jsFileName: string;
        public tsFileName: string;

        constructor(tsFileName: string, jsFileName: string, public jsFile: ITextWriter, public sourceMapOut: ITextWriter) {
            this.currentMappings.push(this.sourceMappings);

            jsFileName = switchToForwardSlashes(jsFileName);
            this.jsFileName = TypeScript.getPrettyName(jsFileName, false, true);

            var removalIndex = jsFileName.lastIndexOf(this.jsFileName);
            var fixedPath = jsFileName.substring(0, removalIndex);

            this.tsFileName = TypeScript.getRelativePathToFixedPath(fixedPath, tsFileName);
        }
        
        // Generate source mapping
        static EmitSourceMapping(allSourceMappers: SourceMapper[]) {
            // At this point we know that there is at least one source mapper present.
            // If there are multiple source mappers, all will correspond to same map file but different sources

            // Output map file name into the js file
            var sourceMapper = allSourceMappers[0];
            sourceMapper.jsFile.WriteLine("//@ sourceMappingURL=" + sourceMapper.jsFileName + SourceMapper.MapFileExtension);

            // Now output map file
            var sourceMapOut = sourceMapper.sourceMapOut;
            var mappingsString = "";
            var tsFiles: string[] = [];

            var prevEmittedColumn = 0;
            var prevEmittedLine = 0;
            var prevSourceColumn = 0;
            var prevSourceLine = 0;
            var prevSourceIndex = 0;
            var prevNameIndex = 0;
            var namesList: string[] = [];
            var namesCount = 0;
            var emitComma = false;

            var recordedPosition: SourceMapPosition = null;
            for (var sourceMapperIndex = 0; sourceMapperIndex < allSourceMappers.length; sourceMapperIndex++) {
                sourceMapper = allSourceMappers[sourceMapperIndex];

                // If there are any mappings generated
                var currentSourceIndex = tsFiles.length;
                tsFiles.push(sourceMapper.tsFileName);

                // Join namelist
                if (sourceMapper.names.length > 0) {
                    namesList.push(sourceMapper.names.join('","'));
                }

                var recordSourceMapping = (mappedPosition: SourceMapPosition, nameIndex: number) {
                    if (recordedPosition != null &&
                        recordedPosition.emittedColumn == mappedPosition.emittedColumn &&
                        recordedPosition.emittedLine == mappedPosition.emittedLine) {
                        // This position is already recorded
                        return;
                    }

                    // Record this position
                    if (prevEmittedLine !== mappedPosition.emittedLine) {
                        while (prevEmittedLine < mappedPosition.emittedLine) {
                            prevEmittedColumn = 0;
                            mappingsString = mappingsString + ";";
                            prevEmittedLine++;
                        }
                        emitComma = false;
                    }
                    else if (emitComma) {
                        mappingsString = mappingsString + ",";
                    }

                    // 1. Relative Column
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.emittedColumn - prevEmittedColumn);
                    prevEmittedColumn = mappedPosition.emittedColumn;

                    // 2. Relative sourceIndex 
                    mappingsString = mappingsString + Base64VLQFormat.encode(currentSourceIndex - prevSourceIndex);
                    prevSourceIndex = currentSourceIndex;

                    // 3. Relative sourceLine 0 based
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceLine - 1 - prevSourceLine);
                    prevSourceLine = mappedPosition.sourceLine - 1;

                    // 4. Relative sourceColumn 0 based 
                    mappingsString = mappingsString + Base64VLQFormat.encode(mappedPosition.sourceColumn - prevSourceColumn);
                    prevSourceColumn = mappedPosition.sourceColumn;

                    // 5. Relative namePosition 0 based
                    if (nameIndex >= 0) {
                        mappingsString = mappingsString + Base64VLQFormat.encode(namesCount + nameIndex - prevNameIndex);
                        prevNameIndex = namesCount + nameIndex;
                    }

                    emitComma = true;
                    recordedPosition = mappedPosition;
                }

                // Record starting spans
                var recordSourceMappingSiblings = (sourceMappings: SourceMapping[]) {
                    for (var i = 0; i < sourceMappings.length; i++) {
                        var sourceMapping = sourceMappings[i];
                        recordSourceMapping(sourceMapping.start, sourceMapping.nameIndex);
                        recordSourceMappingSiblings(sourceMapping.childMappings);
                        recordSourceMapping(sourceMapping.end, sourceMapping.nameIndex);
                    }
                }

                recordSourceMappingSiblings(sourceMapper.sourceMappings, -1);
                namesCount = namesCount + sourceMapper.names.length;
            }

            // Write the actual map file
            if (mappingsString != "") {
                sourceMapOut.Write('{');
                sourceMapOut.Write('"version":3,');
                sourceMapOut.Write('"file":"' + sourceMapper.jsFileName + '",');
                sourceMapOut.Write('"sources":["' + tsFiles.join('","') + '"],');
                sourceMapOut.Write('"names":["' + namesList.join('","') + '"],');
                sourceMapOut.Write('"mappings":"' + mappingsString);
                sourceMapOut.Write('"');
                //sourceMapOut.Write('"sourceRoot":""'); // not needed since we arent generating it in the folder
                sourceMapOut.Write('}');
            }

            // Done, close the file
            sourceMapOut.Close();
        }
    }
}
