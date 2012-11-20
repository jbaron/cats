// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

module TypeScript {
    export class AstLogger {

        constructor (public logger: ILogger) { }

        public logScript(script: TypeScript.Script): void {
            this.logLinemap(script.locationInfo.lineMap);

            var stack: AST[]= [];

            var pre = (cur: TypeScript.AST, parent: TypeScript.AST) => {
                stack.push(cur);
                var indent = (stack.length - 1) * 2;
                this.logComments(script, cur.preComments, indent);
                this.logNode(script, cur, indent);
                this.logComments(script, cur.postComments, indent);
                return cur;
            }

            var post = (cur: TypeScript.AST, parent: TypeScript.AST) => {
                stack.pop();
                return cur;
            }

            TypeScript.getAstWalkerFactory().walk(script, pre, post);
        }


        public logNode(script: TypeScript.Script, cur: TypeScript.AST, indent: number) {
            var msg = this.addPadding("", indent, "| ", true);

            msg = msg.concat("+ " + cur.treeViewLabel());
            msg = this.addPadding(msg, 70, " ", false);

            msg = msg + this.addLineColumn(script, cur.minChar);
            msg = this.addPadding(msg, 80, " ", false);

            msg = msg + "=> ";
            msg = msg + this.addLineColumn(script, cur.limChar);
            msg = this.addPadding(msg, 102, " ", false);

            msg = msg.concat("[" + this.addPadding(cur.minChar.toString(), 1, " ", true) + ", " + this.addPadding(cur.limChar.toString(), 1, " ", true) + "]");

            msg = this.addPadding(msg, 115, " ", false);
            msg = msg.concat("sym=" + (<any>cur).sym);

            msg = this.addPadding(msg, 135, " ", false);
            msg = msg.concat("type=" + (cur.type === null ? "null" : cur.type.getTypeName()));
            this.logger.log(msg);
        }

        private logComments(script: TypeScript.Script, comments: TypeScript.AST[], indent: number) {
            if (comments == null)
                return;

            for (var i = 0; i < comments.length; i++) {
                this.logNode(script, comments[i], indent);
            }
        }

        public logLinemap(linemap: number[]) {
            var result = "[";
            for (var i = 0; i < linemap.length; i++) {
                if (i > 0)
                    result += ",";
                result += linemap[i];
            }
            result += "]";
            this.logger.log("linemap: " + result);
        }

        private addPadding(s: string, targetLength: number, paddingString: string, leftPadding: bool): string {
            var result = (leftPadding ? "" : s);
            for (var i = s.length; i < targetLength; i++) {
                result = result + paddingString;
            }
            result = result + (leftPadding ? s : "");
            return result;
        }

        private addLineColumn(script: TypeScript.Script, position: number): string {
            // just for calling getSourceLineColFromMap
            var lineInfo = {
                line: -1,
                col: -1
            }
            TypeScript.getSourceLineColFromMap(lineInfo, position, script.locationInfo.lineMap);

            if (lineInfo.col !== -1) {
                lineInfo.col++; //TODO: function above seems to consider line as 1-based, and column as 0-based
            }

            return "(" + lineInfo.line + ", " + lineInfo.col + ")";
        }
    }
}
