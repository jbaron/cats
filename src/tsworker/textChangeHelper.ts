module Cats.TSWorker {


       function spanEnd(span:ts.TextSpan) {
            return span.start + span.length;
        }
            
       /** 
         * Normalize an array of edits by removing overlapping entries and 
         * sorting entries on the minChar position. 
         * 
         * Copied from TypeScript shim 
         */
        function normalizeEdits(edits: ts.TextChange[]): ts.TextChange[] {
            var result: ts.TextChange[] = [];

            function mapEdits(edits: ts.TextChange[]): { edit: ts.TextChange; index: number; }[] {
                var result: { edit: ts.TextChange; index: number; }[] = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function(a, b) {
                var result = a.edit.span.start - b.edit.span.start;
                if (result === 0)
                    result = a.index - b.index;
                return result;
            });

            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;

                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;
                var gap = nextEdit.span.start - spanEnd(currentEdit.span);

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (spanEnd(currentEdit.span) >= spanEnd(nextEdit.span)) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }

            return result;
        }


        /**
         * Apply an array of text edits to a string, and return the resulting string.
         * 
         * Copied from TypeScript shim
         */
        export function applyEdits(content: string, edits: ts.TextChange[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.span.start);
                var middle = edit.newText;
                var suffix = result.substring(edit.span.start + edit.span.length);
                result = prefix + middle + suffix;
            }
            return result;
        }
        
}