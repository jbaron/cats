// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class IndentationBag {
        private indentationEdits: Dictionary_int_List_IndentationEditInfo;

        constructor(private snapshot: ITextSnapshot) {
            // A map from line number to a list of indentations that happened on that line.
            // We need a list since a line might cut into multiple lines due to NewLine rules.
            this.indentationEdits = new Dictionary_int_List_IndentationEditInfo();
        }

        public AddIndent(edit: IndentationEditInfo): void
        {
            var line = this.snapshot.GetLineNumberFromPosition(edit.Position());

            var lineIndents: List_IndentationEditInfo = this.indentationEdits.GetValue(line);

            if (lineIndents === null) {
                lineIndents = new List_IndentationEditInfo();
                this.indentationEdits.Add(line, lineIndents);
            }

            lineIndents.add(edit);
        }

        public  FindIndent(position: number): IndentationEditInfo {
            var line = this.snapshot.GetLineNumberFromPosition(position);

            var lineIndents = this.indentationEdits.GetValue(line);
            if (lineIndents !== null) {
                for (var i = lineIndents.count() - 1; i >= 0; i--) {
                    if (position >= lineIndents.get(i).Position()) {
                        return lineIndents.get(i);
                    }
                }
            }

            return null;
        }
    }
}
