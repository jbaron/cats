// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {

    export enum TypeContext {
        NoTypes = 0,
        ArraySuffix = 1,
        Primitive = 2,
        Named = 4,
        AllSimpleTypes = Primitive | Named,
        AllTypes = Primitive | Named | ArraySuffix,
    }

    export enum ParseState {
        None,
        StartScript,
        StartStmtList,
        StartStatement,
        StartFncDecl,
        FncDeclName,
        FncDeclArgs,
        FncDeclReturnType,
        ForInit,
        ForInitAfterVar,
        ForCondStart,
        EndStmtList,
        EndScript,
    }

    export interface IStatementInfo {
        stmt: Statement;
        labels: ASTList;
    }

    export interface ILambdaArgumentContext {
        preProcessedLambdaArgs: AST;
    }

    export class QuickParseResult {
        constructor (public Script: Script, public endLexState: LexState) { }
    }

    export class Parser {
        public varLists: ASTList[] = [];
        public scopeLists: ASTList[] = [];
        public staticsLists: ASTList[] = [];
        public scanner: IScanner = new Scanner();
        public tok: Token = null;
        public needTerminator = false;
        // TODO: consolidate these
        public inFnc = false;
        public inStaticFnc = false;
        public inInterfaceDecl = false;
        public currentClassDecl: TypeDecl = null;

        public inFncDecl = false;  // this is only for FuncDecls - not constructors, like inFnc
        public anonId = new Identifier("_anonymous");
        public style_requireSemi = false;
        public style_funcInLoop = true;
        public incremental = false;
        public errorRecovery = false;
        public outfile: ITextWriter = undefined;
        public errorCallback: (minChar: number, charLen: number, message: string, unit: number) =>void = null;
        public state: ParseState = ParseState.StartStmtList;
        public cursorLine = -1;
        public cursorColumn = -1;
        public cursorState: ParseState = ParseState.None;
        public errorMessage = "";
        public ambientModule = false;
        public ambientClass = false;
        public topLevel = true;
        public currentUnitIndex = (-1);
        public prevIDTok: Token = null;
        public stmtStack: IStatementInfo[] = new IStatementInfo[];
        public hasTopLevelImportOrExport = false; // for imports, only true if it's a dynamic module
        public strictMode = false;
        public nestingLevel = 0;
        public prevExpr: AST = null;
        public currentClassDefinition: ClassDecl = null;
        public parsingClassConstructorDefinition = false;
        public parsingDeclareFile = false;
        public amdDependencies: string[] = [];
        public inferPropertiesFromThisAssignment = false;

        public resetStmtStack() {
            this.stmtStack = new IStatementInfo[];
        }

        public inLoop() {
            for (var j = this.stmtStack.length - 1; j >= 0; j--) {
                if (this.stmtStack[j].stmt.isLoop()) {
                    return true;
                }
            }
            return false;
        }

        public pushStmt(stmt: Statement, labels: ASTList) {
            // allocate here to avoid always storing this information in statements
            var info = { stmt: stmt, labels: labels };
            this.stmtStack.push(info);
        }

        public popStmt(): IStatementInfo {
            return this.stmtStack.pop();
        }

        public resolveJumpTarget(jump: Jump): void {
            var resolvedTarget = AST.getResolvedIdentifierName(jump.target);
            var len = this.stmtStack.length;
            for (var i = len - 1; i >= 0; i--) {
                var info = this.stmtStack[i];
                if (jump.target) {
                    if (info.labels && (info.labels.members.length > 0)) {
                        for (var j = 0, labLen = info.labels.members.length; j < labLen; j++) {
                            var label = <Label>info.labels.members[j];
                            if (label.id.text == resolvedTarget) {
                                jump.setResolvedTarget(this, info.stmt);
                                return;
                            }
                        }
                    }
                }
                else {
                    if (info.stmt.isLoop()) {
                        jump.setResolvedTarget(this, info.stmt);
                        return;
                    }
                    else if ((info.stmt.nodeType == NodeType.Switch) && (jump.nodeType == NodeType.Break)) {
                        jump.setResolvedTarget(this, info.stmt);
                        return;
                    }
                }
            }
            // no luck
            if (jump.target) {
                this.reportParseError("could not find enclosing statement with label " + jump.target);
            }
            else {
                if (jump.nodeType == NodeType.Break) {
                    this.reportParseError("break statement requires enclosing loop or switch");
                }
                else {
                    this.reportParseError("continue statement requires enclosing loop");
                }
            }
        }

        public setNonInteractive() {
            this.errorRecovery = false;
        }

        public setErrorRecovery(outf, l: number, c: number) {
            this.outfile = outf;
            this.cursorLine = l;
            this.cursorColumn = c;
            this.cursorState = ParseState.None;

            this.errorRecovery = true;
        }

        public posMatchesCursor(pos: number) {
            var lineCol = { line: -1, col: -1 };
            this.getSourceLineCol(lineCol, pos);
            return (lineCol.line == this.cursorLine) && (lineCol.col == this.cursorColumn);
        }

        public getSourceLineCol(lineCol: ILineCol, minChar: number): void {
            getSourceLineColFromMap(lineCol, minChar, this.scanner.lineMap);
        }

          public createRef(text: string, hasEscapeSequence: bool, minChar: number): Identifier {
            var id = new Identifier(text, hasEscapeSequence);
            id.minChar = minChar;
            return id;
        }

        public reportParseStyleError(message: string) {
            this.reportParseError("STYLE: " + message);
        }

        public reportParseError(message: string, startPos = this.scanner.startPos, pos = this.scanner.pos) {
            var len = Math.max(1, pos - startPos);
            if (this.errorCallback) {
                this.errorCallback(startPos, len, message, this.currentUnitIndex);
            }
            else if (this.errorRecovery) {
                var lineCol = { line: -1, col: -1 };
                this.getSourceLineCol(lineCol, startPos);
                if (this.outfile) {
                    this.outfile.WriteLine("// " + this.fname + " (" + lineCol.line + "," + lineCol.col + "): " + message);
                }
            }
            else {
                throw new SyntaxError(this.fname + " (" + this.scanner.line + "," + this.scanner.col + "): " + message);
            }
        }

        public chkNxtTok(tokenId: TokenID, errorText: string, errorRecoverySet: ErrorRecoverySet): void {
            this.tok = this.scanner.scan();
            this.chkCurTok(tokenId, errorText, errorRecoverySet);
        }

        public skip(errorRecoverySet: ErrorRecoverySet) {
            errorRecoverySet |= ErrorRecoverySet.EOF;
            var ersTok = ErrorRecoverySet.None;
            var tokenInfo = lookupToken(this.tok.tokenId);
            if (tokenInfo != undefined) {
                ersTok = tokenInfo.ers;
            }
            var pendingRightCurlies = 0;
            while (((ersTok & errorRecoverySet) == ErrorRecoverySet.None) ||
                   (this.tok.tokenId == TokenID.RCurly) && (pendingRightCurlies > 0)) {
                if (this.tok.tokenId == TokenID.LCurly) {
                    pendingRightCurlies++;
                }
                else if (this.tok.tokenId == TokenID.RCurly) {
                    pendingRightCurlies--;
                }
                this.tok = this.scanner.scan();
                ersTok = ErrorRecoverySet.None;
                tokenInfo = lookupToken(this.tok.tokenId);
                if (tokenInfo != undefined) {
                    ersTok = tokenInfo.ers;
                }
                // TODO: regex rescan 
            }
        }

        public chkCurTok(tokenId: TokenID, errorText: string, errorRecoverySet: ErrorRecoverySet): void {
            if (this.tok.tokenId != tokenId) {
                this.reportParseError(errorText);
                if (this.errorRecovery) {
                    this.skip(errorRecoverySet);
                }
            }
            else {
                this.tok = this.scanner.scan();
            }
        }

        public pushDeclLists() {
            this.staticsLists.push(new ASTList());
            this.varLists.push(new ASTList());
            this.scopeLists.push(new ASTList());
        }

        public popDeclLists() {
            this.staticsLists.pop();
            this.varLists.pop();
            this.scopeLists.pop();
        }

        public topVarList() {
            return this.varLists[this.varLists.length - 1];
        }

        public topScopeList() {
            return this.scopeLists[this.scopeLists.length - 1];
        }

        public topStaticsList() {
            return this.staticsLists[this.staticsLists.length - 1];
        }

        public parseComment(comment: CommentToken) {

            if (comment) {
                var c: Comment = new Comment(comment.value, comment.isBlock, comment.endsLine);
                c.minChar = comment.startPos;
                c.limChar = comment.startPos + comment.value.length;

                if (!comment.isBlock && comment.value.length > 3 && comment.value.substring(0, 3) == "///") {
                    var dependencyPath = getAdditionalDependencyPath(comment.value);

                    if (dependencyPath) {
                        this.amdDependencies.push(dependencyPath);
                    }

                    if (getImplicitImport(comment.value)) {
                        this.hasTopLevelImportOrExport = true;
                    }
                }

                return c;
            }
            else {
                return null;
            }

        }

        public parseCommentsInner(comments: CommentToken[]) {
            if (comments) {
                var commentASTs: Comment[] = new Comment[];
                for (var i = 0; i < comments.length; i++) {
                    commentASTs.push(this.parseComment(comments[i]));
                }
                return commentASTs;
            } else {
                return null;
            }
        }

        public parseComments() {
            var comments = this.scanner.getComments();
            return this.parseCommentsInner(comments);
        }

        public parseCommentsForLine(line: number) {
            var comments = this.scanner.getCommentsForLine(line);

            return this.parseCommentsInner(comments);
        }

        public combineComments(comment1: Comment[], comment2: Comment[]) {
            if (comment1 == null) {
                return comment2;
            }
            else if (comment2 == null) {
                return comment1;
            }
            else {
                return comment1.concat(comment2);
            }
        }

        public parseEnumDecl(errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers): ModuleDecl {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;

            var name: Identifier = null;
            if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                name = Identifier.fromToken(this.tok);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.tok = this.scanner.scan();
            }
            else {
                this.reportParseError("Enum declaration requires identifier");
                if (this.errorRecovery) {
                    name = new MissingIdentifier();
                    name.minChar = this.scanner.startPos;
                    name.limChar = this.scanner.startPos;
                    name.flags |= ASTFlags.Error;
                }
            }

            var membersMinChar = this.scanner.startPos;
            this.chkCurTok(TokenID.LCurly, "Expected '{'", errorRecoverySet | ErrorRecoverySet.ID);
            this.pushDeclLists();
            var members = new ASTList();
            members.minChar = membersMinChar;
            var mapDecl = new VarDecl(new Identifier("_map"), 0);
            mapDecl.varFlags |= VarFlags.Exported;
            mapDecl.varFlags |= VarFlags.Private;

            // REVIEW: Is this still necessary?
            mapDecl.varFlags |= (VarFlags.Property | VarFlags.Public);
            mapDecl.init = new UnaryExpression(NodeType.ArrayLit, null);
            members.append(mapDecl);
            var lastValue: NumberLiteral = null;
            for (; ;) {
                var minChar = this.scanner.startPos;
                var limChar;
                var memberName: Identifier = null;
                var memberValue: AST = null;
                var preComments = null;
                var postComments = null;

                if ((this.tok.tokenId == TokenID.ID) || convertTokToIDName(this.tok)) {
                    memberName = Identifier.fromToken(this.tok);
                    memberName.minChar = this.scanner.startPos;
                    memberName.limChar = this.scanner.pos;
                }
                else if (this.tok.tokenId == TokenID.RCurly) {
                    break;
                }
                else {
                    this.reportParseError("Expected identifer of enum member");
                    if (this.errorRecovery) {
                        memberName = new MissingIdentifier();
                        memberName.minChar = this.scanner.startPos;
                        memberName.limChar = this.scanner.startPos;
                        memberName.flags |= ASTFlags.Error;
                    }
                }

                limChar = this.scanner.pos;
                preComments = this.parseComments();
                this.tok = this.scanner.scan();
                postComments = this.parseComments();

                if (this.tok.tokenId == TokenID.Asg) {
                    this.tok = this.scanner.scan();
                    memberValue = this.parseExpr(errorRecoverySet, OperatorPrecedence.Cma, true,
                                          TypeContext.NoTypes);
                    lastValue = <NumberLiteral>memberValue;
                    limChar = memberValue.limChar;
                }
                else {
                    if (lastValue == null) {
                        memberValue = new NumberLiteral(0);
                        lastValue = <NumberLiteral>memberValue;
                    }
                    else {
                        memberValue = new NumberLiteral(lastValue.value + 1);
                        lastValue = <NumberLiteral>memberValue;
                    }
                    var map: BinaryExpression =
                        new BinaryExpression(NodeType.Asg,
                                             new BinaryExpression(NodeType.Index,
                                                                  new Identifier("_map"),
                                                                  memberValue),
                                             new StringLiteral('"' + memberName.actualText + '"'));
                    members.append(map);
                }
                var member = new VarDecl(memberName, this.nestingLevel);
                member.minChar = minChar;
                member.limChar = limChar;
                member.init = memberValue;
                // Note: Leave minChar, limChar as "-1" on typeExpr as this is a parsing artifact.
                member.typeExpr = new TypeReference(this.createRef(name.actualText, name.hasEscapeSequence, -1), 0);
                member.varFlags |= (VarFlags.Readonly | VarFlags.Property);
                if (memberValue.nodeType == NodeType.NumberLit) {
                    member.varFlags |= VarFlags.Constant;
                }
                member.preComments = preComments;
                members.append(member);
                member.postComments = postComments;
                // all enum members are exported
                member.varFlags |= VarFlags.Exported;

                if (this.tok.tokenId == TokenID.Comma) {
                    this.tok = this.scanner.scan();
                    member.postComments = this.combineComments(member.postComments, this.parseCommentsForLine(this.scanner.prevLine));
                    if ((this.tok.tokenId == TokenID.ID) || (convertTokToIDName(this.tok))) {
                        continue;
                    }
                }
                break;
            }
            var endingToken = new ASTSpan();
            endingToken.minChar = this.scanner.startPos;
            endingToken.limChar = this.scanner.pos;

            this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
            members.limChar = this.scanner.lastTokenLimChar();
            var modDecl = new ModuleDecl(name, members, this.topVarList(), this.topScopeList(), endingToken);
            modDecl.modFlags |= ModuleFlags.IsEnum;
            this.popDeclLists();

            modDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            modDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return modDecl;
        }

        public parseDottedName(enclosedList: AST[]): void {
            this.tok = this.scanner.scan();
            if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                var id = Identifier.fromToken(this.tok);
                id.preComments = this.parseComments();
                enclosedList[enclosedList.length] = id;
                id.minChar = this.scanner.startPos;
                id.limChar = this.scanner.pos;
                this.tok = this.scanner.scan();
                if (this.tok.tokenId == TokenID.Dot) {
                    this.parseDottedName(enclosedList);
                }
            }
            else {
                this.reportParseError("need identifier after '.'");
            }
        }

        // REVIEW: This is much more lenient than the spec - we're basically just checking to see if the
        // path is rooted or contains an extension, not if it could potentially be a bogus file path
        public isValidImportPath(importPath: string) {
            importPath = stripQuotes(importPath);

            if (!importPath ||
                importPath.indexOf(':') != -1 || 
                importPath.indexOf('\\') != -1 ||
                //(importPath.indexOf('.') != -1 && importPath.charAt(0) != '.') ||
                importPath.charAt(0) == '/') {
                return false;
            }
            return true;
        }

            public parseImportDecl(errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers): ImportDecl {

                var name: Identifier = null;
                var alias: AST = null;
                var importDecl: ImportDecl = null;
                var minChar = this.scanner.startPos;
                var isDynamicImport = false;

                this.tok = this.scanner.scan();

                if (this.tok.tokenId == TokenID.ID || convertTokToID(this.tok, this.strictMode)) {
                    name = Identifier.fromToken(this.tok);
                }
                else {
                    this.reportParseError("Expected identifer after 'import'");
                    name = new MissingIdentifier();
                }

                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;

                this.tok = this.scanner.scan();

                this.chkCurTok(TokenID.Asg, "Expected =", errorRecoverySet | ErrorRecoverySet.ID);

                var aliasPreComments = this.parseComments();

                var limChar;
                if (this.tok.tokenId == TokenID.ID || convertTokToID(this.tok, this.strictMode)) {

                    if (this.tok.tokenId == TokenID.MODULE) {
                        limChar = this.scanner.pos;
                        this.tok = this.scanner.scan();
                        if (this.tok.tokenId == TokenID.LParen) {
                            this.tok = this.scanner.scan();

                            if (this.tok.tokenId == TokenID.QString || this.tok.tokenId == TokenID.ID || convertTokToID(this.tok, this.strictMode)) {

                                if (this.tok.tokenId == TokenID.QString) {

                                    if (this.topLevel) {
                                        this.hasTopLevelImportOrExport = true;
                                    }

                                    var aliasText = this.tok.getText();
                                    alias = Identifier.fromToken(this.tok);
                                    alias.minChar = this.scanner.startPos;
                                    alias.limChar = this.scanner.pos;

                                    if (!this.isValidImportPath((<Identifier>alias).text)) {
                                        this.reportParseError("Invalid import path");
                                    }

                                    isDynamicImport = true;
                                    this.tok = this.scanner.scan();
                                    
                                    alias.preComments = aliasPreComments;
                                }
                                else {
                                    alias = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon,
                                              OperatorPrecedence.Asg, true,
                                              TypeContext.NoTypes);
                                    
                                    alias.preComments = aliasPreComments;
                                }
                            }

                            limChar = this.scanner.pos;
                            this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet | ErrorRecoverySet.ID);
                            
                            if (alias) {
                                alias.postComments = this.parseComments();
                            }
                            
                            // gobble up the ';' if there is one...
                            if (this.tok.tokenId == TokenID.SColon) {
                                limChar = this.scanner.pos;
                                this.tok = this.scanner.scan();
                            }
                        }
                    }
                    else {
                        alias = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon,
                                              OperatorPrecedence.Asg, true,
                                              TypeContext.NoTypes);
                        limChar = this.scanner.pos; // Include semicolon if needed
                    }
                }
                else {
                    this.reportParseError("Expected module name");
                    alias = new MissingIdentifier();
                    alias.minChar = this.scanner.startPos;
                    if (this.tok.tokenId == TokenID.SColon) {
                        alias.limChar = this.scanner.startPos;
                    } else {
                        alias.limChar = this.scanner.pos;
                        this.tok = this.scanner.scan();
                    }
                    alias.flags |= ASTFlags.Error;
                    limChar = alias.limChar;
                }

                importDecl = new ImportDecl(name, alias);
                importDecl.isDynamicImport = isDynamicImport;

                if (hasFlag(modifiers, Modifiers.Exported)) {
                    importDecl.varFlags |= VarFlags.Exported;
                }

                importDecl.minChar = minChar;
                importDecl.limChar = limChar;

                return importDecl;
            }

            public parseModuleDecl(errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers): ModuleDecl {
                var leftCurlyCount = this.scanner.leftCurlyCount;
                var rightCurlyCount = this.scanner.rightCurlyCount;

                var svAmbient = this.ambientModule;
                var svTopLevel = this.topLevel;
                this.topLevel = false;
                if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                    this.ambientModule = true;
                }

                this.tok = this.scanner.scan();
                var name: AST = null;
                var enclosedList: AST[] = null;
                this.pushDeclLists();
                var modulePreComments = this.parseComments();
                var minChar = this.scanner.startPos;
                var isDynamicMod = false;

                if ((this.tok.tokenId == TokenID.ID) || (this.tok.tokenId == TokenID.QString) || (!isPrimitiveTypeToken(this.tok) && convertTokToID(this.tok, this.strictMode))) {
                    var nameText = this.tok.getText();

                    if (this.tok.tokenId == TokenID.QString) {
                        isDynamicMod = true;
                        if (!this.ambientModule) {
                            this.reportParseError("Only ambient dynamic modules may have string literal names");
                        }
                    }

                    name = Identifier.fromToken(this.tok);
                    name.minChar = this.scanner.startPos;
                    name.limChar = this.scanner.pos;

                    this.tok = this.scanner.scan();
                }
                else if (this.tok.tokenId == TokenID.LCurly) {
                    this.reportParseError("Module name missing");
                    name = new Identifier("");
                    // "fake" position of where the ID would be
                    name.minChar = minChar;
                    name.limChar = minChar;
                }

                if (this.tok.tokenId == TokenID.Dot) {
                    enclosedList = new AST[];
                    this.parseDottedName(enclosedList);
                }

                if (name == null) {
                    name = new MissingIdentifier();
                }

                var moduleBody = new ASTList();
                var bodyMinChar = this.scanner.startPos;
                this.chkCurTok(TokenID.LCurly, "Expected '{'", errorRecoverySet | ErrorRecoverySet.ID);
                this.parseStmtList(errorRecoverySet | ErrorRecoverySet.RCurly, moduleBody, true, true,
                                AllowedElements.ModuleMembers, modifiers);
                moduleBody.minChar = bodyMinChar;
                moduleBody.limChar = this.scanner.pos;

                var endingToken = new ASTSpan();
                endingToken.minChar = this.scanner.startPos;
                endingToken.limChar = this.scanner.pos;
                this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);

                var limChar = this.scanner.pos;
                var moduleDecl: ModuleDecl;
                if (enclosedList && (enclosedList.length > 0)) {
                    var len = enclosedList.length;
                    var innerName = <Identifier>enclosedList[len - 1];
                    var innerDecl = new ModuleDecl(innerName, moduleBody, this.topVarList(),
                                                    this.topScopeList(), endingToken);

                    if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                        innerDecl.modFlags |= ModuleFlags.Ambient;
                    }

                    innerDecl.modFlags |= ModuleFlags.Exported;

                    // REVIEW: will also possibly need to re-parent comments as well
                    innerDecl.minChar = minChar;
                    innerDecl.limChar = limChar;

                    this.popDeclLists();
                    var outerModBod: ASTList;
                    for (var i = len - 2; i >= 0; i--) {
                        outerModBod = new ASTList();
                        outerModBod.append(innerDecl);
                        innerName = <Identifier>enclosedList[i];
                        innerDecl = new ModuleDecl(innerName, outerModBod, new ASTList(),
                                                    new ASTList(), endingToken);
                        outerModBod.minChar = innerDecl.minChar = minChar;
                        outerModBod.limChar = innerDecl.limChar = limChar;

                        if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                            innerDecl.modFlags |= ModuleFlags.Ambient;
                        }

                        innerDecl.modFlags |= ModuleFlags.Exported;
                    }
                    outerModBod = new ASTList();
                    outerModBod.append(innerDecl);
                    outerModBod.minChar = minChar;
                    outerModBod.limChar = limChar;
                    moduleDecl = new ModuleDecl(<Identifier>name, outerModBod, new ASTList(),
                                                new ASTList(), endingToken);
                }
                else {
                    moduleDecl = new ModuleDecl(<Identifier>name, moduleBody, this.topVarList(), this.topScopeList(), endingToken);
                    this.popDeclLists();
                }

                if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                    moduleDecl.modFlags |= ModuleFlags.Ambient;
                }
                if (this.parsingDeclareFile || svAmbient || hasFlag(modifiers, Modifiers.Exported)) {
                    moduleDecl.modFlags |= ModuleFlags.Exported;
                }
                if (isDynamicMod) {
                    moduleDecl.modFlags |= ModuleFlags.IsDynamic;
                }

                moduleDecl.preComments = modulePreComments;
                moduleDecl.postComments = this.parseComments();
                this.ambientModule = svAmbient;

                this.topLevel = svTopLevel;
                moduleDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
                moduleDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
                return moduleDecl;
            }

            public parseTypeReferenceTail(errorRecoverySet: ErrorRecoverySet, minChar: number, term: AST) {
                var result = new TypeReference(term, 0);
                result.minChar = minChar;
                while (this.tok.tokenId == TokenID.LBrack) {
                    this.tok = this.scanner.scan();
                    result.arrayCount++;
                    this.chkCurTok(TokenID.RBrack, "Expected ']'",
                              errorRecoverySet | ErrorRecoverySet.LBrack);
                }
                result.limChar = this.scanner.lastTokenLimChar();
                return result;
            }


            public parseNamedType(errorRecoverySet: ErrorRecoverySet, minChar: number, term: AST, tail: bool): AST {
                this.tok = this.scanner.scan();
                if (this.tok.tokenId == TokenID.Dot) {
                    var curpos = this.scanner.pos;
                    this.tok = this.scanner.scan();
                    // Don't allow reserved words if immediately after a new line and error recovery is enabled
                    if ((this.tok.tokenId == TokenID.ID) || ((!this.errorRecovery || !this.scanner.lastTokenHadNewline()) && convertTokToID(this.tok, this.strictMode))) {
                        var op2 = Identifier.fromToken(this.tok);
                        op2.minChar = this.scanner.startPos;
                        op2.limChar = this.scanner.pos;
                        var dotNode = new BinaryExpression(NodeType.Dot, term, op2);
                        dotNode.minChar = term.minChar;
                        dotNode.limChar = op2.limChar;
                        return this.parseNamedType(errorRecoverySet, minChar,
                                              dotNode, tail);
                    }
                    else {
                        this.reportParseError("need identifier after '.'");
                        if (this.errorRecovery) {
                            term.flags |= ASTFlags.DotLHS;
                            // We set "limChar" to be slightly innacurate for completion list behavior
                            // (last AST node from "quickParse" will match DotLHS and be at end of file position)
                            // This is to match the behavior of TokenId.Dot processing in parsePostfixOperators.
                            term.limChar = this.scanner.lastTokenLimChar();
                            return term;
                        }
                        else {
                            var eop2 = new MissingIdentifier();
                            eop2.minChar = this.scanner.pos;
                            eop2.limChar = this.scanner.pos;
                            var edotNode = new BinaryExpression(NodeType.Dot, term, eop2);
                            edotNode.flags |= ASTFlags.Error;
                            edotNode.minChar = term.minChar;
                            edotNode.limChar = eop2.limChar;
                            return this.parseNamedType(errorRecoverySet, minChar,
                                                  edotNode, tail);
                        }
                    }
                }
                else {
                    if (tail) {
                        return this.parseTypeReferenceTail(errorRecoverySet, minChar, term);
                    }
                    else {
                        return term;
                    }
                }
            }

            public parseTypeReference(errorRecoverySet: ErrorRecoverySet, allowVoid: bool): AST {
                var minChar = this.scanner.startPos;
                var isConstructorMember = false;
                switch (this.tok.tokenId) {
                    case TokenID.VOID:
                        if (!allowVoid) {
                            this.reportParseError("void not a valid type in this context");
                        }
                    // Intentional fall-through
                    case TokenID.NUMBER:
                    case TokenID.BOOL:
                    case TokenID.ANY:
                    case TokenID.STRING: {
                        var text = tokenTable[this.tok.tokenId].text;
                        var primId = new Identifier(text);
                        primId.minChar = minChar;
                        primId.limChar = this.scanner.pos;
                        this.tok = this.scanner.scan();
                        return this.parseTypeReferenceTail(errorRecoverySet, minChar,
                                                      primId);
                    }

                    case TokenID.ID:
                        var ident = this.createRef(this.tok.getText(), (<IdentifierToken>this.tok).hasEscapeSequence, minChar);
                        ident.limChar = this.scanner.pos;
                        return this.parseNamedType(errorRecoverySet, minChar,
                                              ident, true);

                    case TokenID.LCurly:
                        this.tok = this.scanner.scan();
                        var members = new ASTList();
                        members.minChar = minChar;
                        var prevInInterfaceDecl = this.inInterfaceDecl;
                        this.inInterfaceDecl = true;
                        this.parseInterfaceMembers(errorRecoverySet | ErrorRecoverySet.RCurly,
                                              members);
                        this.inInterfaceDecl = prevInInterfaceDecl;
                        this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
                        var interfaceDecl = new TypeDecl(NodeType.Interface, this.anonId,
                                                       members, null, null, null);
                        interfaceDecl.minChar = minChar;
                        interfaceDecl.limChar = members.limChar;    // "}"
                        return this.parseTypeReferenceTail(errorRecoverySet, minChar, interfaceDecl);

                    case TokenID.NEW:
                        this.tok = this.scanner.scan();
                        // can't use chkCurrentTok, since we don't want to advance the token
                        if (this.tok.tokenId != TokenID.LParen) {
                            this.reportParseError("Expected '('");
                        }
                        else {
                            isConstructorMember = true;
                            // fall through...
                        }

                    case TokenID.LParen: {
                        // ( formals ) => type
                        var formals = new ASTList();
                        var variableArgList =
                            this.parseFormalParameterList(errorRecoverySet | ErrorRecoverySet.RParen,
                                              formals, false, true, false, false, false, false, null, true);
                        this.chkCurTok(TokenID.Arrow, "Expected '=>'", errorRecoverySet);
                        var returnType = this.parseTypeReference(errorRecoverySet, true);
                        var funcDecl = new FuncDecl(null, null, false, formals, null, null, null,
                                                  NodeType.FuncDecl);
                        funcDecl.returnTypeAnnotation = returnType;
                        funcDecl.variableArgList = variableArgList;
                        funcDecl.fncFlags |= FncFlags.Signature;

                        if (isConstructorMember) {
                            funcDecl.fncFlags |= FncFlags.ConstructMember;
                            funcDecl.hint = "_construct";
                            funcDecl.classDecl = null;
                        }
                        funcDecl.minChar = minChar;
                        return this.parseTypeReferenceTail(errorRecoverySet, minChar, funcDecl);
                    }

                    default:
                        this.reportParseError("Expected type name");
                        var etr = new TypeReference(null, 0);
                        etr.flags |= ASTFlags.Error;
                        etr.minChar = this.scanner.pos;
                        etr.limChar = this.scanner.pos;
                        return etr;
                }
            }

            public parseFunctionStatements(   errorRecoverySet: ErrorRecoverySet,
                                                name: Identifier,
                                                isConstructor: bool,
                                                isMethod: bool,
                                                args: ASTList,
                                                allowedElements: AllowedElements,
                                                minChar: number,
                                                requiresSignature: bool,
                                                parentModifiers: Modifiers) {

                this.pushDeclLists();
                // start new statement stack
                var svStmtStack = this.stmtStack;
                this.resetStmtStack();

                var bod: ASTList = null;
                var wasShorthand = false;
                var isAnonLambda = false;

                if (!requiresSignature) {
                    bod = new ASTList();
                    var bodMinChar = this.scanner.startPos;
                    if (this.tok.tokenId == TokenID.Arrow) {
                        if (isMethod) {
                            this.reportParseError("'=>' may not be used for class methods");
                        }
                        wasShorthand = true;
                        this.tok = this.scanner.scan();
                    }
                    if (wasShorthand && this.tok.tokenId != TokenID.LCurly) {
                        var retExpr = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon,
                                              OperatorPrecedence.Asg, true,
                                              TypeContext.NoTypes);
                        var retStmt = new ReturnStatement();
                        retStmt.returnExpression = retExpr;
                        retStmt.minChar = retExpr.minChar;
                        retStmt.limChar = retExpr.limChar;
                        bod.minChar = bodMinChar;
                        bod.append(retStmt);
                    }
                    else {
                        this.state = ParseState.StartStmtList;
                        this.chkCurTok(TokenID.LCurly, "Expected '{'", errorRecoverySet |
                                  ErrorRecoverySet.StmtStart);
                        var svInFnc = this.inFnc;
                        isAnonLambda = wasShorthand;
                        this.inFnc = true;
                        this.parseStmtList(errorRecoverySet | ErrorRecoverySet.RCurly |
                                      ErrorRecoverySet.StmtStart,
                                      bod, true, false, allowedElements, parentModifiers);
                        bod.minChar = bodMinChar;
                        bod.limChar = this.scanner.pos;
                        this.inFnc = svInFnc;
                        var ec = new EndCode();
                        ec.minChar = bod.limChar;
                        ec.limChar = ec.minChar;
                        bod.append(ec);
                    }
                }

                var funcDecl = new FuncDecl(name, bod, isConstructor, args, this.topVarList(),
                                          this.topScopeList(), this.topStaticsList(), NodeType.FuncDecl);
                this.popDeclLists();
                var scopeList = this.topScopeList();
                scopeList.append(funcDecl);
                var staticFuncDecl = false;
                var limChar = this.scanner.pos;
                if (requiresSignature) {
                    this.chkCurTok(TokenID.SColon, this.tok.tokenId == TokenID.LCurly ? "Function declarations are not permitted within interfaces, ambient modules or classes" : "Expected ';'", errorRecoverySet);
                }
                else {
                    if (!wasShorthand || isAnonLambda) {
                        funcDecl.endingToken = new ASTSpan();
                        funcDecl.endingToken.minChar = this.scanner.startPos;
                        funcDecl.endingToken.limChar = this.scanner.pos;
                        this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);

                        if (isAnonLambda) {
                            funcDecl.fncFlags |= FncFlags.IsFatArrowFunction;
                        }
                    }
                    else {
                        funcDecl.fncFlags |= FncFlags.IsFatArrowFunction;
                        funcDecl.endingToken = new ASTSpan();

                        funcDecl.endingToken.minChar = bod.members[0].minChar;
                        funcDecl.endingToken.limChar = bod.members[0].limChar;
                    }
                }
                funcDecl.minChar = minChar;
                funcDecl.limChar = limChar;

                if (!requiresSignature) {
                    funcDecl.fncFlags |= FncFlags.Definition;
                }

                this.stmtStack = svStmtStack;
                return funcDecl;
            }

            public transformAnonymousArgsIntoFormals(formals: ASTList, argList: AST) : bool {

                var translateBinExOperand = (operand: AST) : bool => {
                    if (operand.nodeType == NodeType.Comma) {
                        return this.transformAnonymousArgsIntoFormals(formals, operand);
                    }
                    else if (operand.nodeType == NodeType.Name || operand.nodeType == NodeType.Asg) {
                        var opArg = operand.nodeType == NodeType.Asg ? (<BinaryExpression>operand).operand1 : operand;

                        var arg = new ArgDecl(<Identifier>opArg);
                        arg.preComments = opArg.preComments;
                        arg.postComments = opArg.postComments;
                        arg.minChar = opArg.minChar;
                        arg.limChar = opArg.limChar;

                        if (hasFlag(opArg.flags, ASTFlags.PossibleOptionalParameter)) {
                            arg.isOptional = true;
                        }

                        if (operand.nodeType == NodeType.Asg) {
                            arg.init = (<BinaryExpression>operand).operand2;
                        }

                        formals.append(arg);

                        return arg.isOptional;
                    }
                    else {
                        this.reportParseError("Invalid lambda argument");
                    }
                    return false;
                }

                if (argList) {
                    if (argList.nodeType == NodeType.Comma) {
                        var commaList = <BinaryExpression> argList;
                        if (commaList.operand1.isParenthesized) { 
                            this.reportParseError("Invalid lambda argument", commaList.operand1.minChar, commaList.operand1.limChar);
                        }
                        if (commaList.operand2.isParenthesized) { 
                            this.reportParseError("Invalid lambda argument", commaList.operand2.minChar, commaList.operand2.limChar);
                        }
                        var isOptional = translateBinExOperand(commaList.operand1);
                        isOptional = translateBinExOperand(commaList.operand2) || isOptional;
                        return isOptional;
                    }
                    else {
                        return translateBinExOperand(argList);
                    }
                }
            }

            public parseFormalParameterList(errorRecoverySet: ErrorRecoverySet,
                                                formals: ASTList,
                                                isClassConstr: bool,
                                                isSig: bool,
                                                isIndexer: bool,
                                                isGetter: bool,
                                                isSetter: bool,
                                                isLambda: bool,
                                                preProcessedLambdaArgs: AST,
                                                expectClosingRParen: bool): bool 
            {

                formals.minChar = this.scanner.startPos; // '(' or '['
                if (isIndexer) {
                    this.tok = this.scanner.scan();
                }
                else if (!isLambda) {
                    this.chkCurTok(TokenID.LParen, "Expected '('",
                              errorRecoverySet | ErrorRecoverySet.RParen);
                }
                var sawEllipsis = false;
                var firstArg = true;
                var hasOptional = false;
                var haveFirstArgID = false;

                // if preProcessedLambdaArgs is "true", we either have a typeless argument list, or we have
                // a single identifier node and the current token is the ':' before a typereference
                if (isLambda && preProcessedLambdaArgs && preProcessedLambdaArgs.nodeType != NodeType.EmptyExpr) {
                    hasOptional = this.transformAnonymousArgsIntoFormals(formals, preProcessedLambdaArgs);
                    haveFirstArgID = true;
                }

                while (true) {
                    var munchedArg = false;
                    var argFlags = VarFlags.None;
                    var argMinChar = this.scanner.startPos;

                    if (this.inferPropertiesFromThisAssignment && this.tok.tokenId == TokenID.THIS) {
                        if (!isClassConstr) {
                            this.reportParseError("Instance property declarations using 'this' may only be used in class constructors");
                        }
                        this.tok = this.scanner.scan(); // consume the '.'

                        argFlags |= (VarFlags.Public | VarFlags.Property);
                        if (this.currentClassDefinition) {
                            this.currentClassDefinition.varFlags |= VarFlags.ClassSuperMustBeFirstCallInConstructor;
                        }
                    }
                    if (this.tok.tokenId == TokenID.PUBLIC) {
                        argFlags |= (VarFlags.Public | VarFlags.Property);

                        if (this.currentClassDefinition) {
                            this.currentClassDefinition.varFlags |= VarFlags.ClassSuperMustBeFirstCallInConstructor;
                        }
                    }
                    else if (this.tok.tokenId == TokenID.PRIVATE) {
                        argFlags |= (VarFlags.Private | VarFlags.Property);

                        if (this.currentClassDefinition) {
                            this.currentClassDefinition.varFlags |= VarFlags.ClassSuperMustBeFirstCallInConstructor;
                        }
                    }
                    else if (this.tok.tokenId == TokenID.STATIC && isClassConstr) {
                        this.reportParseError("Static properties can not be declared as parameter properties");
                        this.tok = this.scanner.scan();
                    }

                    if (argFlags != VarFlags.None) {
                        if (!isClassConstr) {
                            this.reportParseError("only constructor parameters can be properties");
                        }
                        this.tok = this.scanner.scan();

                        if (isModifier(this.tok)) { 
                            this.reportParseError("Multiple modifiers may not be applied to parameters");
                            this.tok = this.scanner.scan();
                        }

                        if (this.inferPropertiesFromThisAssignment && this.tok.tokenId == TokenID.THIS) {
                            if (!isClassConstr) {
                                this.reportParseError("Instance property declarations using 'this' may only be used in class constructors");
                            }
                            this.tok = this.scanner.scan(); // consume the '.'
                            this.tok = this.scanner.scan();
                        }
                    }
                    else if (this.tok.tokenId == TokenID.Ellipsis) {
                        sawEllipsis = true;
                        this.tok = this.scanner.scan();

                        if (!(this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                            this.reportParseError("'...' parameters require both a parameter name and an array type annotation to be specified");
                            sawEllipsis = false; // Do not treat this parameter as vararg
                        }
                    }

                    var argId: Identifier = null;

                    if (!haveFirstArgID && (this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                        argId = Identifier.fromToken(this.tok);
                        argId.minChar = this.scanner.startPos;
                        argId.limChar = this.scanner.pos;
                    }

                    if (haveFirstArgID || argId) {
                        munchedArg = true;
                        var type: AST = null;
                        var arg: ArgDecl = null;

                        if (haveFirstArgID && formals.members.length) {
                            arg = <ArgDecl>formals.members[formals.members.length - 1];

                            if (arg.isOptional) {
                                hasOptional = true;
                            }
                        }
                        else {
                            arg = new ArgDecl(argId);

                            if (isGetter) {
                                this.reportParseError("Property getters may not take any arguments");
                            }

                            if (isSetter && !firstArg) {
                                this.reportParseError("Property setters may only take one argument");
                            }

                            arg.minChar = argMinChar;
                            arg.preComments = this.parseComments();
                            this.tok = this.scanner.scan();
                        }

                        if (this.tok.tokenId == TokenID.QMark) {
                            arg.isOptional = true;
                            hasOptional = true;
                            this.tok = this.scanner.scan();
                        }

                        if (this.tok.tokenId == TokenID.Colon) {
                            this.tok = this.scanner.scan();
                            type = this.parseTypeReference(errorRecoverySet, false);
                        }

                        // check for default parameter
                        // REVIEW: In the case of a typed reference, assume that parseTypeReference or one
                        // of its children in the call graph advanced tok
                        if (this.tok.tokenId == TokenID.Asg) {
                            if (isSig) {
                                this.reportParseError("Arguments in signatures may not have default values");
                            }

                            hasOptional = true;
                            this.tok = this.scanner.scan();
                            arg.init = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                                OperatorPrecedence.Cma, false,
                                                TypeContext.NoTypes);

                        }

                        if (hasOptional && !arg.isOptionalArg() && !sawEllipsis) {
                            this.reportParseError("Optional parameters may only be followed by other optional parameters");
                        }

                        if (sawEllipsis && arg.isOptionalArg()) {
                            this.reportParseError("Varargs may not be optional or have default parameters");
                        }

                        if (sawEllipsis && !type) {
                            // Ellipsis is missing a type definition
                            this.reportParseError("'...' parameters require both a parameter name and an array type annotation to be specified");
                        }

                        // REVIEW: Ok for lambdas?
                        arg.postComments = this.parseComments();
                        arg.typeExpr = type;
                        arg.limChar = this.scanner.lastTokenLimChar();
                        arg.varFlags |= argFlags;
                        if (!haveFirstArgID) {
                            formals.append(arg);
                        }
                        else {
                            haveFirstArgID = false;
                        }
                    }
                    firstArg = false;
                    if (this.tok.tokenId == TokenID.Comma) {
                        if ((munchedArg) && (!sawEllipsis)) {
                            this.tok = this.scanner.scan();
                            continue;
                        }
                        else {
                            this.reportParseError("Unexpected ',' in argument list");
                            if (this.errorRecovery) {
                                this.tok = this.scanner.scan();
                                continue;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }

                if (isIndexer) {
                    this.chkCurTok(TokenID.RBrack, "Expected ']'", errorRecoverySet | ErrorRecoverySet.LCurly | ErrorRecoverySet.SColon);
                }
                else if (expectClosingRParen) {
                    this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet | ErrorRecoverySet.LCurly | ErrorRecoverySet.SColon);
                }
                formals.limChar = this.scanner.lastTokenLimChar(); // ')' or ']'
                return sawEllipsis;
            }

            public parseFncDecl(  errorRecoverySet: ErrorRecoverySet,
                                    isDecl: bool, requiresSignature: bool,
                                    isMethod: bool,
                                    methodName: Identifier,
                                    indexer: bool,
                                    isStatic: bool,
                                    markedAsAmbient: bool,
                                    modifiers: Modifiers,
                                    lambdaArgContext: ILambdaArgumentContext,
                                    expectClosingRParen: bool): AST {

                var leftCurlyCount = this.scanner.leftCurlyCount;
                var rightCurlyCount = this.scanner.rightCurlyCount;

                var prevInConstr = this.parsingClassConstructorDefinition;
                this.parsingClassConstructorDefinition = false;

                var name: Identifier = null;
                var fnMin = this.scanner.startPos;
                var minChar = this.scanner.pos;
                var prevNestingLevel = this.nestingLevel;
                this.nestingLevel = 0;
                if ((!this.style_funcInLoop) && this.inLoop()) {
                    this.reportParseStyleError("function declaration in loop");
                }
                if (!isMethod && !isStatic && !indexer && !lambdaArgContext) {
                    // past function keyword
                    this.tok = this.scanner.scan();
                    this.state = ParseState.StartFncDecl;
                    if ((this.tok.tokenId != TokenID.ID) && (!convertTokToID(this.tok, this.strictMode))) {
                        if (isDecl) {
                            this.reportParseError("Function declaration must include identifier");

                            this.nestingLevel = prevNestingLevel;
                            return new IncompleteAST(fnMin, this.scanner.pos);
                        }
                    }
                    else {
                        name = Identifier.fromToken(this.tok);
                        name.minChar = this.scanner.startPos;
                        name.limChar = this.scanner.pos;
                        this.tok = this.scanner.scan();
                    }
                }
                else {
                    if (methodName) {
                        name = methodName;
                    }
                }

                this.state = ParseState.FncDeclName;
                var args: ASTList = new ASTList();
                var variableArgList = false;
                var isOverload = false;
                var isGetter = hasFlag(modifiers, Modifiers.Getter);
                var isSetter = hasFlag(modifiers, Modifiers.Setter);
                if ((this.tok.tokenId == TokenID.LParen) || (indexer && (this.tok.tokenId == TokenID.LBrack)) || (lambdaArgContext && (lambdaArgContext.preProcessedLambdaArgs || this.tok.tokenId == TokenID.Ellipsis))) {
                    // arg list
                    variableArgList = this.parseFormalParameterList(errorRecoverySet, args, false, requiresSignature, indexer, isGetter, isSetter, !!lambdaArgContext, lambdaArgContext ? lambdaArgContext.preProcessedLambdaArgs : null, expectClosingRParen);
                }
                this.state = ParseState.FncDeclArgs;
                var returnType: AST = null;
                if (this.tok.tokenId == TokenID.Colon) {
                    this.tok = this.scanner.scan();
                    if (hasFlag(modifiers, Modifiers.Setter)) {
                        this.reportParseError("Property setters may not declare a return type");
                    }
                    returnType = this.parseTypeReference(errorRecoverySet, true);
                }

                if (indexer && args.members.length == 0) {
                    this.reportParseError("Index signatures require a parameter type to be specified");
                }
                this.state = ParseState.FncDeclReturnType;

                // REVIEW:
                // Currently, it's imperative that ambient functions *not* be marked as overloads.  At some point, we may
                // want to unify the two concepts internally
                if (isDecl && !(this.parsingDeclareFile || markedAsAmbient) && (!isMethod || !(this.ambientModule || this.ambientClass || this.inInterfaceDecl)) && this.tok.tokenId == TokenID.SColon) {
                    isOverload = true;
                    isDecl = false;
                    requiresSignature = true;
                }
                var svInFncDecl = this.inFncDecl;
                this.inFncDecl = true;
                var funcDecl: FuncDecl =
                    this.parseFunctionStatements(errorRecoverySet | ErrorRecoverySet.RCurly,
                                            name, false, isMethod, args, AllowedElements.FunctionBody,
                                            minChar, requiresSignature, Modifiers.None);
                this.inFncDecl = svInFncDecl;
                funcDecl.variableArgList = variableArgList;
                funcDecl.isOverload = isOverload;

                if (!requiresSignature) { // REVIEW: What's the point of this?  Why not just use 'Signature' instead of 'Definition'?
                    funcDecl.fncFlags |= FncFlags.Definition;
                }

                if (isStatic) {
                    funcDecl.fncFlags |= FncFlags.Static;
                }

                if (requiresSignature) {
                    funcDecl.fncFlags |= FncFlags.Signature;
                }
                if (indexer) {
                    funcDecl.fncFlags |= FncFlags.IndexerMember;
                }
                funcDecl.returnTypeAnnotation = returnType;
                if (isMethod) {
                    funcDecl.fncFlags |= FncFlags.Method;
                    // all class property methods are currently exported
                    funcDecl.fncFlags |= FncFlags.ClassPropertyMethodExported;
                }
                funcDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
                funcDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;

                this.nestingLevel = prevNestingLevel;
                this.parsingClassConstructorDefinition = prevInConstr;
                return funcDecl;
            }

            public convertToTypeReference(ast: AST): TypeReference {
                var result: TypeReference;
                switch (ast.nodeType) {
                    case NodeType.TypeRef:
                        return <TypeReference>ast;
                    case NodeType.Name:
                        result = new TypeReference(ast, 0);
                        result.minChar = ast.minChar;
                        result.limChar = ast.limChar;
                        return result;
                    case NodeType.Index: {
                        var expr = <BinaryExpression>ast;
                        result = this.convertToTypeReference(expr.operand1);
                        if (result) {
                            result.arrayCount++;
                            result.minChar = expr.minChar;
                            result.limChar = expr.limChar;
                            return result;
                        }
                        else {
                            var etr = <TypeReference>new AST(NodeType.Error);
                            return etr;
                        }
                    }
                }
                return null;
            }

            public parseArgList(errorRecoverySet: ErrorRecoverySet): ASTList {
                var args: ASTList = new ASTList();
                args.minChar = this.scanner.startPos;

                // skip left paren
                this.tok = this.scanner.scan();

                if (this.tok.tokenId !== TokenID.RParen) {
                    while (true) {
                        if (args.members.length > 0xffff) {
                            this.reportParseError("max number of args exceeded");
                            break;
                        }
                        var arg = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                          OperatorPrecedence.Cma, false, TypeContext.NoTypes);
                        args.append(arg);
                        if (this.tok.tokenId != TokenID.Comma) {
                            break;
                        }
                        this.tok = this.scanner.scan();
                    }
                }

                args.limChar = this.scanner.pos;
                return args;
            }

            public parseBaseList(extendsList: ASTList, implementsList: ASTList, errorRecoverySet: ErrorRecoverySet, interfaceOnly: bool, isClass: bool): void {
                var keyword = true;
            var currentList = extendsList;
            for (; ;) {
                if (keyword) {
                    if (this.tok.tokenId == TokenID.IMPLEMENTS) {
                        if (interfaceOnly) {
                            this.reportParseError("interfaces can not implement other types");
                        }
                        currentList = implementsList;
                    }
                    this.tok = this.scanner.scan();
                    keyword = false;
                }
                var baseName: Identifier = null;
                if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                    var minChar = this.scanner.startPos;
                    baseName = Identifier.fromToken(this.tok);
                    baseName.minChar = minChar;
                    baseName.limChar = this.scanner.pos;
                    baseName = <Identifier>this.parseNamedType(errorRecoverySet | ErrorRecoverySet.LCurly,
                                            minChar, baseName, false);
                }
                else {
                    this.reportParseError("Expected base name");
                    if (this.errorRecovery) {
                        baseName = new MissingIdentifier();
                        baseName.minChar = this.scanner.pos;
                        baseName.limChar = this.scanner.pos;
                        baseName.flags |= ASTFlags.Error;
                    }
                }
                if (this.tok.tokenId == TokenID.LParen) {
                    if (isClass) {
                        this.reportParseError("Base classes may only be initialized via a 'super' call within the constructor body");
                    }
                    else {
                        this.reportParseError("Interfaces may not be extended with a call expression");
                    }
                }
                else {
                    currentList.append(baseName);
                }

                if (!interfaceOnly && currentList == extendsList && extendsList.members.length > 1) {
                    this.reportParseError("A class may only extend one other class");
                }

                if (this.tok.tokenId == TokenID.Comma) {
                    this.tok = this.scanner.scan();
                    continue;
                }
                else if ((this.tok.tokenId == TokenID.EXTENDS) ||
                         (this.tok.tokenId == TokenID.IMPLEMENTS)) {
                    currentList = extendsList;
                    keyword = true;
                    continue;
                }

                break;
            }
        }

        public parseClassDecl(errorRecoverySet: ErrorRecoverySet, minChar: number, modifiers: Modifiers): ClassDecl {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;

            if ((modifiers & Modifiers.Readonly) != Modifiers.None) {
                this.reportParseError("const modifier is implicit for class");
            }

            // mark the class as ambient, as necessary
            if (this.parsingDeclareFile || this.ambientModule) {
                modifiers |= Modifiers.Ambient;
                modifiers |= Modifiers.Exported;
            }
            var classIsMarkedAsAmbient = this.parsingDeclareFile || (modifiers & Modifiers.Ambient) != Modifiers.None;
            var svAmbientClass = this.ambientClass;
            this.ambientClass = classIsMarkedAsAmbient;

            // grab the class's name
            this.tok = this.scanner.scan();
            var name: Identifier = null;
            if ((this.tok.tokenId == TokenID.ID) || (!isPrimitiveTypeToken(this.tok) && convertTokToID(this.tok, this.strictMode)) ) {
                name = Identifier.fromToken(this.tok);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.tok = this.scanner.scan();
            }
            else {
                this.reportParseError("class missing name");
                if (this.errorRecovery) {
                    name = new MissingIdentifier();
                    name.minChar = this.scanner.pos;
                    name.limChar = this.scanner.pos;
                    name.flags |= ASTFlags.Error;
                }
            }

            var baseClass: ASTList = null;
            var interfacesImplemented: ASTList = null;
            var requiresSignature = false;

            if ((this.tok.tokenId == TokenID.EXTENDS) ||
                (this.tok.tokenId == TokenID.IMPLEMENTS)) {
                baseClass = new ASTList();
                interfacesImplemented = new ASTList();
                this.parseBaseList(baseClass, interfacesImplemented, errorRecoverySet, false, true);
            }

            // REVIEW: Note that we don't set this as the current class decl
            var classDecl = new ClassDecl(name, new ASTList(), baseClass, interfacesImplemented);

            this.currentClassDefinition = classDecl;

            // parse the classes members
            this.parseClassElements(classDecl, errorRecoverySet, modifiers);


            if (this.ambientModule || this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Exported)) {
                classDecl.varFlags |= VarFlags.Exported;
            }

            if (this.ambientModule || hasFlag(modifiers, Modifiers.Ambient)) {
                classDecl.varFlags |= VarFlags.Ambient;
            }

            classDecl.varFlags |= VarFlags.Class;

            this.ambientClass = svAmbientClass;
            classDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            classDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return classDecl;
        }

        public parseClassElements(classDecl: ClassDecl, errorRecoverySet: ErrorRecoverySet, parentModifiers: Modifiers) {
            var modifiers = parentModifiers;
            var resetModifiers = false;

            var membersMinChar = this.scanner.startPos;
            this.chkCurTok(TokenID.LCurly, "Expected '{'", errorRecoverySet);

            this.nestingLevel++;

            var currentMemberMinChar = this.scanner.startPos;
            var wasGetOrSetId = false;

            while (!(this.tok.tokenId == TokenID.RCurly || this.tok.tokenId == TokenID.EOF)) {
                var scanNext = true;
                var publicOrPrivateFlags = Modifiers.Public | Modifiers.Private;

                // modifiers
                if (this.tok.tokenId == TokenID.GET) {
                    if (modifiers & Modifiers.Getter) {
                        this.reportParseError("Duplicate 'get' declaration in class body");
                    }
                    if (modifiers & Modifiers.Setter) {
                        this.reportParseError("Getter already marked as a setter");
                    }
                    modifiers |= Modifiers.Getter;
                }
                else if (this.tok.tokenId == TokenID.SET) {
                    if (modifiers & Modifiers.Setter) {
                        this.reportParseError("Duplicate 'set' declaration in class body");
                    }
                    if (modifiers & Modifiers.Getter) {
                        this.reportParseError("Setter already marked as a getter");
                    }
                    modifiers |= Modifiers.Setter;

                }
                else if (this.tok.tokenId == TokenID.PRIVATE) {
                    if (modifiers & publicOrPrivateFlags) {
                        this.reportParseError("Multiple modifiers may not be applied to class members");
                    }
                    modifiers |= Modifiers.Private;
                }
                else if (this.tok.tokenId == TokenID.PUBLIC) {
                    if (modifiers & publicOrPrivateFlags) {
                        this.reportParseError("Multiple modifiers may not be applied to class members");
                    }
                    modifiers |= Modifiers.Public;
                }
                else if (this.tok.tokenId == TokenID.STATIC) {
                    if (modifiers & Modifiers.Static) { // only check for double instances of static
                        this.reportParseError("Multiple modifiers may not be applied to class members");
                    }
                    modifiers |= Modifiers.Static;
                }  // constructors
                else if (this.tok.tokenId == TokenID.CONSTRUCTOR) {

                    if (modifiers != parentModifiers) {
                        this.reportParseError("Constructors may not have modifiers");
                    }

                    this.parseClassConstructorDeclaration(currentMemberMinChar, errorRecoverySet, modifiers);
                    scanNext = false; // parsing functions advances the token for us
                    resetModifiers = true;
                }  // member declarations
                else if (wasGetOrSetId || this.tok.tokenId == TokenID.ID || convertTokToIDName(this.tok)) {

                    var idText = wasGetOrSetId ? ((modifiers & Modifiers.Getter) ? "get" : "set") : this.tok.getText();
                    var id = wasGetOrSetId ? new Identifier(idText) : Identifier.fromToken(this.tok);
                    id.minChar = this.scanner.startPos;
                    id.limChar = this.scanner.pos;

                    // unset the get/set bit, if we're using it for an id
                    if (wasGetOrSetId) {
                        modifiers = modifiers ^ ((modifiers & Modifiers.Getter) ? Modifiers.Getter : Modifiers.Setter);
                        wasGetOrSetId = false;
                    }
                    else {
                        this.tok = this.scanner.scan();
                    }

                    if (this.tok.tokenId == TokenID.LParen) {
                        this.parseClassMemberFunctionDeclaration(id, currentMemberMinChar, errorRecoverySet, modifiers);
                        scanNext = false; // parsing functions advances the token for us
                    }
                    else {
                        if (modifiers & Modifiers.Getter || modifiers & Modifiers.Setter) {
                            this.reportParseError("Property accessors must be functions");
                        }

                        var varDecl = this.parseClassMemberVariableDeclaration(id, currentMemberMinChar, false, errorRecoverySet, modifiers);

                        if (varDecl.init && varDecl.init.nodeType == NodeType.FuncDecl) {
                            if (this.tok.tokenId == TokenID.RCurly) {
                                scanNext = false;
                            }
                        }
                        else if (varDecl.init && varDecl.init.nodeType == NodeType.ObjectLit && this.tok.tokenId != TokenID.SColon) {
                            scanNext = false;
                            varDecl.init.flags |= ASTFlags.AutomaticSemicolon;
                        }
                        else if (this.tok.tokenId != TokenID.SColon) {
                            this.reportParseError("Expected ';'");
                            scanNext = false;
                        }
                    }

                    resetModifiers = true;
                } // catch errant uses of 'super'
                else if (this.tok.tokenId == TokenID.SUPER) {
                    this.reportParseError("Base class initializers must be the first statement in a class definition");
                }
                else if (!wasGetOrSetId && ((modifiers & Modifiers.Getter) || (modifiers & Modifiers.Setter)) &&
                         (this.tok.tokenId == TokenID.LParen) || (this.tok.tokenId == TokenID.Asg)) {
                             // catch a 'get' or 'set' used as an identifier
                    wasGetOrSetId = true;
                    scanNext = false;

                }  // mark anything else as an error
                else if (this.tok.tokenId != TokenID.SColon) { // jettison semicolons
                    this.reportParseError("Unexpected '" + this.tok.getText() + "' in class definition");
                    resetModifiers = true;
                }

                if (scanNext) {
                    this.tok = this.scanner.scan();
                }

                if (resetModifiers) {
                    modifiers = parentModifiers;
                    currentMemberMinChar = this.scanner.startPos;
                    resetModifiers = false;
                }
            }

            var membersLimChar = this.scanner.pos;
            if (this.tok.tokenId == TokenID.RCurly) {
                classDecl.endingToken = new ASTSpan();
                classDecl.endingToken.minChar = this.scanner.startPos;
                classDecl.endingToken.limChar = this.scanner.pos;

                // for a class with an empty body, consume any 'dangling' inner comments
                if (!this.currentClassDefinition.definitionMembers.members.length) {
                    this.currentClassDefinition.preComments = this.parseComments();
                }

                this.tok = this.scanner.scan();
            }

            this.nestingLevel--;

            this.currentClassDefinition.members.minChar = membersMinChar;
            this.currentClassDefinition.members.limChar = membersLimChar;
            this.currentClassDefinition.limChar = membersLimChar;
            this.currentClassDefinition = null;
        }

        public parseClassConstructorDeclaration(minChar: number, errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers) {
            this.parsingClassConstructorDefinition = true;

            var isAmbient = this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient);

            var args: ASTList = new ASTList();
            var variableArgList = false;
            var preComments = this.parseComments();

            this.tok = this.scanner.scan(); // scan past the 'constructor' token

            if (this.tok.tokenId == TokenID.LParen) {
                variableArgList = this.parseFormalParameterList(errorRecoverySet, args, true, isAmbient, false, false, false, false, null, true);
                if (args.members.length > 0) {
                    var lastArg = args.members[args.members.length - 1];
                }
            }

            var requiresSignature = isAmbient || this.tok.tokenId == TokenID.SColon;


            if (requiresSignature) {
                for (var i = 0; i < args.members.length; i++) {
                    var arg = <ArgDecl> args.members[i];
                    if (hasFlag(arg.varFlags, VarFlags.Property)) {
                        this.reportParseError("Overload or ambient signatures may not specify parameter properties", arg.minChar, arg.limChar);
                    }
                }
            }

            if (!requiresSignature) {
                this.currentClassDefinition.constructorNestingLevel = this.nestingLevel + 1;
            }

            var constructorFuncDecl: FuncDecl =
                this.parseFunctionStatements(errorRecoverySet | ErrorRecoverySet.RCurly,
                                        this.currentClassDefinition.name, true, false, args, AllowedElements.ClassMembers,
                                        minChar, requiresSignature, modifiers);

            constructorFuncDecl.preComments = preComments;

            if (requiresSignature && !isAmbient) {
                constructorFuncDecl.isOverload = true;
            }

            constructorFuncDecl.variableArgList = variableArgList;
            this.currentClassDecl = null;
            constructorFuncDecl.returnTypeAnnotation = this.convertToTypeReference(this.currentClassDefinition.name);
            constructorFuncDecl.classDecl = this.currentClassDefinition;

            if (isAmbient) {
                constructorFuncDecl.fncFlags |= FncFlags.Ambient;
            }

            if (requiresSignature) {
                constructorFuncDecl.fncFlags |= FncFlags.Signature;
            }

            if (this.ambientModule || hasFlag(modifiers, Modifiers.Exported)) {
                constructorFuncDecl.fncFlags |= FncFlags.Exported;
            }


            if (this.currentClassDefinition.constructorDecl) {
                if (!isAmbient && !this.currentClassDefinition.constructorDecl.isSignature() && !constructorFuncDecl.isSignature()) {
                    this.reportParseError("Duplicate constructor definition");
                }
            }

            if (isAmbient || !constructorFuncDecl.isSignature()) {
                this.currentClassDefinition.constructorDecl = constructorFuncDecl;
            }

            // REVIEW: Should we have a separate flag for class constructors?  (Constructors are not methods)
            constructorFuncDecl.fncFlags |= FncFlags.ClassMethod;

            this.currentClassDefinition.definitionMembers.members[this.currentClassDefinition.definitionMembers.members.length] = constructorFuncDecl;

            this.parsingClassConstructorDefinition = false;

            constructorFuncDecl.postComments = this.parseComments();

            return constructorFuncDecl;
        }


        public parseClassMemberVariableDeclaration(text: Identifier, minChar: number, isDeclaredInConstructor: bool, errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers) {

            var varDecl = new VarDecl(text, this.nestingLevel);
            varDecl.minChar = minChar;
            var isStatic = false;
            varDecl.preComments = this.parseComments();

            if (this.tok.tokenId == TokenID.Colon) {
                this.tok = this.scanner.scan();
                varDecl.typeExpr =
                    this.parseTypeReference(errorRecoverySet | ErrorRecoverySet.Asg | ErrorRecoverySet.Comma, false);
            }

            if (this.tok.tokenId == TokenID.Asg) {
                if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                    this.reportParseError("context does not permit variable initializer");
                    if (this.errorRecovery) {
                        this.skip(errorRecoverySet);
                        varDecl.flags |= ASTFlags.Error;
                        varDecl.limChar = this.scanner.lastTokenLimChar();
                        return varDecl;
                    }
                }

                // TODO: note assignment for language service
                this.tok = this.scanner.scan();

                varDecl.init = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                        OperatorPrecedence.Cma, true, TypeContext.NoTypes);

                varDecl.limChar = varDecl.init.limChar;

                // member initializers on instance properties require that super be invoked as the first call within the constructor
                if (!(modifiers & Modifiers.Static)) {
                    this.currentClassDefinition.varFlags |= VarFlags.ClassSuperMustBeFirstCallInConstructor;
                }
            }
            else {
                varDecl.limChar = this.scanner.pos;
            }

            if (modifiers & Modifiers.Static) {
                varDecl.varFlags |= VarFlags.Static;
                isStatic = true;
            }

            if ((modifiers & Modifiers.Private) != Modifiers.None) {
                varDecl.varFlags |= VarFlags.Private;
            }
            else {
                varDecl.varFlags |= VarFlags.Public;
            }

            varDecl.varFlags |= VarFlags.Property;

            if (isDeclaredInConstructor) {
                varDecl.varFlags |= VarFlags.ClassConstructorProperty;
            }

            if (!isDeclaredInConstructor && !isStatic) {
                varDecl.varFlags |= VarFlags.ClassBodyProperty;
            }

            this.currentClassDefinition.knownMemberNames[text.actualText] = true;

            if (!isDeclaredInConstructor) {
                this.currentClassDefinition.definitionMembers.members[this.currentClassDefinition.definitionMembers.members.length] = varDecl;
            }
            this.currentClassDefinition.allMemberDefinitions.members[this.currentClassDefinition.allMemberDefinitions.members.length] = varDecl;

            varDecl.postComments = this.parseComments();
            return varDecl;
        }

        public parseClassMemberFunctionDeclaration(methodName: Identifier, minChar: number, errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers) {
            var wasAccessorID = this.prevIDTok != null;
            var isAccessor = hasFlag(modifiers, Modifiers.Getter) || hasFlag(modifiers, Modifiers.Setter);
            var isStatic = hasFlag(modifiers, Modifiers.Static);

            var isAmbient = this.ambientModule || hasFlag(modifiers, Modifiers.Ambient);

            errorRecoverySet |= ErrorRecoverySet.RParen;

            var preComments = this.parseComments();

            if (isAccessor && (modifiers & Modifiers.Ambient)) {
                this.reportParseError("Property accessors may not be declared in ambient classes");
            }

            // REVIEW: Why bother passing in isAmbient for both requiresSignature and isAmbient?  Shouldn't just saying its ambient suffice?
            var ast: AST = this.parseFncDecl(errorRecoverySet, true, isAmbient, true, methodName, false, isStatic, isAmbient, modifiers, null, true);
            if (ast.nodeType == NodeType.Error) {
                return ast;
            }

            var funcDecl = <FuncDecl>ast;
            funcDecl.preComments = preComments;

            funcDecl.minChar = minChar;
            if (funcDecl.bod !== null)
                funcDecl.limChar = funcDecl.bod.limChar;

            if (modifiers & Modifiers.Private) {
                funcDecl.fncFlags |= FncFlags.Private;
            }
            else {
                funcDecl.fncFlags |= FncFlags.Public;
            }

            if (isStatic) {
                funcDecl.fncFlags |= FncFlags.Static;
            }

            if (isAccessor) {
                // REVIEW: verify return-type annotations and arguments
                if (hasFlag(modifiers, Modifiers.Getter)) {
                    funcDecl.fncFlags |= FncFlags.GetAccessor;
                    funcDecl.hint = "get" + funcDecl.name.actualText;
                }
                else {
                    funcDecl.fncFlags |= FncFlags.SetAccessor;
                    funcDecl.hint = "set" + funcDecl.name.actualText;
                }
                funcDecl.fncFlags |= FncFlags.IsFunctionExpression;
                if (codeGenTarget < CodeGenTarget.ES5) {
                    this.reportParseError("Property accessors are only available when targeting ES5 or greater", funcDecl.minChar, funcDecl.limChar);
                }
            }

            funcDecl.fncFlags |= FncFlags.ClassMethod;

            this.currentClassDefinition.knownMemberNames[methodName.actualText] = true;

            this.currentClassDefinition.definitionMembers.members[this.currentClassDefinition.definitionMembers.members.length] = funcDecl;

            funcDecl.postComments = this.parseComments();

            return funcDecl;
        }

        public parseInterfaceMember(errorRecoverySet: ErrorRecoverySet): AST {
            var minChar = this.scanner.startPos;
            var propertyDecl = this.parsePropertyDecl(errorRecoverySet, Modifiers.Public, true, false);
            if (propertyDecl.nodeType == NodeType.VarDecl) {
                this.chkCurTok(TokenID.SColon, "Expected ';'", errorRecoverySet);
            }
            if (propertyDecl) {
                propertyDecl.minChar = minChar;
            }
            return propertyDecl;
        }

        public parseInterfaceMembers(errorRecoverySet: ErrorRecoverySet, members: ASTList) {
            for (; ;) {
                switch (this.tok.tokenId) {
                    case TokenID.RCurly:
                    case TokenID.EOF:
                        members.limChar = this.scanner.pos;
                        return;
                }
                var element = this.parseInterfaceMember(errorRecoverySet | ErrorRecoverySet.TypeScriptS);
                if (element) {
                    members.append(element);
                }
            }
        }

        public parseInterfaceDecl(errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers): TypeDecl {
            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;

            this.tok = this.scanner.scan();
            var minChar = this.scanner.pos;
            var name: Identifier = null;
            if ((this.tok.tokenId == TokenID.ID) || (!isPrimitiveTypeToken(this.tok) && convertTokToID(this.tok, this.strictMode))) {
                name = Identifier.fromToken(this.tok);
                name.minChar = this.scanner.startPos;
                name.limChar = this.scanner.pos;
                this.tok = this.scanner.scan();
            }
            else {
                this.reportParseError("interface missing name");
                if (this.errorRecovery) {
                    name = new MissingIdentifier();
                    name.minChar = this.scanner.pos;
                    name.limChar = this.scanner.pos;
                    name.flags |= ASTFlags.Error;
                }
            }
            var interfaces: ASTList = null;
            if (this.tok.tokenId == TokenID.EXTENDS) {
                interfaces = new ASTList();
                interfaces.minChar = this.scanner.startPos;
                this.parseBaseList(interfaces, null, errorRecoverySet, true, false);
            }

            var membersMinChar = this.scanner.startPos;
            this.chkCurTok(TokenID.LCurly, "Expected '{'", errorRecoverySet | ErrorRecoverySet.TypeScriptS);
            var members = new ASTList();
            members.minChar = membersMinChar;
            var prevInInterfaceDecl = this.inInterfaceDecl;
            this.inInterfaceDecl = true;
            this.parseInterfaceMembers(errorRecoverySet | ErrorRecoverySet.RCurly, members);
            this.inInterfaceDecl = prevInInterfaceDecl;
            this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
            var interfaceDecl = new TypeDecl(NodeType.Interface, name, members, null, interfaces, null);
            if (hasFlag(modifiers, Modifiers.Private)) {
                interfaceDecl.varFlags |= VarFlags.Private;
            }
            if (hasFlag(modifiers, Modifiers.Public)) {
                interfaceDecl.varFlags |= VarFlags.Public;
            }
            if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Exported)) {
                interfaceDecl.varFlags |= VarFlags.Exported;
            }

            interfaceDecl.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            interfaceDecl.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            return interfaceDecl;
        }

        public makeVarDecl(id: Identifier, nest: number): VarDecl {
            var varDecl = new VarDecl(id, nest);
            var currentVarList = this.topVarList();
            if (currentVarList) {
                currentVarList.append(varDecl);
            }
            return varDecl;
        }

        public parsePropertyDecl(errorRecoverySet: ErrorRecoverySet, modifiers: Modifiers, requireSignature: bool, isStatic: bool): AST {
            var text: Identifier = null;
            var minChar = this.scanner.startPos;
            var nameLimChar = minChar;
            var isNew = false;
            var isIndexer = false;
            var wasAccessorID = this.prevIDTok != null;
            var isAccessor = hasFlag(modifiers, Modifiers.Getter) || hasFlag(modifiers, Modifiers.Setter);

            if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Ambient)) {
                requireSignature = true;
            }
            if (this.tok.tokenId == TokenID.LParen && !wasAccessorID) {
                if (!requireSignature && !isStatic) {
                    this.reportParseError("Expected identifier in property declaration");
                    if (this.errorRecovery) {
                        this.skip(errorRecoverySet);
                        //REVIEW: Use something else than "Identifier"?
                        text = new MissingIdentifier();
                    }
                }
            }
            else if (this.tok.tokenId == TokenID.NEW) {
                if (requireSignature) {
                    this.tok = this.scanner.scan();
                    if (this.tok.tokenId == TokenID.LParen) {
                        isNew = true;

                    }
                }
                if (!isNew) {
                    // is identifier
                    if (!requireSignature) {
                        this.tok = this.scanner.scan();
                    }
                    text = new Identifier("new");
                    text.minChar = this.scanner.pos - 3;
                    text.limChar = this.scanner.pos;
                    nameLimChar = this.scanner.pos;
                }
            }
            else if ((this.tok.tokenId == TokenID.LBrack) && requireSignature) {
                // indexer signature
                isIndexer = true;
                //REVIEW: Should we use a special "compiler reserved" identifier node?
                text = new Identifier("__item");
            }
            else if ((this.tok.tokenId != TokenID.ID) && (!convertTokToIDName(this.tok)) && !wasAccessorID) {
                this.reportParseError("Expected identifier in property declaration");
                if (this.errorRecovery) {
                    var eminChar = this.scanner.startPos;
                    var curpos = this.scanner.pos;
                    this.skip(errorRecoverySet & (~ErrorRecoverySet.Comma));
                    if (this.scanner.pos == curpos) {
                        // ensure progress
                        this.tok = this.scanner.scan();
                    }

                    var epd = new VarDecl(new MissingIdentifier(), this.nestingLevel);
                    epd.flags |= ASTFlags.Error;
                    epd.minChar = eminChar;
                    epd.limChar = this.scanner.lastTokenLimChar();
                    return epd;
                }
            }
            else {
                if (wasAccessorID) {
                    text = Identifier.fromToken(this.prevIDTok);
                    text.minChar = this.scanner.lastTokenLimChar() - 3;
                    text.limChar = this.scanner.lastTokenLimChar();
                    nameLimChar = text.limChar;

                    if (codeGenTarget < CodeGenTarget.ES5) {
                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                    }

                    // this block guards against 'get' and 'set' tokens that
                    // were coerced into identifiers
                    if (this.tok.getText() == text.actualText && this.tok != this.prevIDTok) {
                        this.tok = this.scanner.scan();
                    } // Otherwise, don't update the token - we're already at '('

                    // reset the previous ID Token
                    this.prevIDTok = null;
                }
                else {
                    text = Identifier.fromToken(this.tok);
                    text.minChar = this.scanner.startPos;
                    text.limChar = this.scanner.pos;
                    nameLimChar = this.scanner.pos;
                    this.tok = this.scanner.scan();
                }
            }

            if (this.tok.tokenId == TokenID.QMark) {
                if (this.inInterfaceDecl && text) {
                    text.flags |= ASTFlags.OptionalName;
                }
                else {
                    this.reportParseError("Optional properties may only be declared on interface or object types");
                }
                this.tok = this.scanner.scan();
            }

            if ((this.tok.tokenId == TokenID.LParen) ||
                (isIndexer && (this.tok.tokenId == TokenID.LBrack))) {
                var ers = errorRecoverySet | ErrorRecoverySet.RParen;
                if (isIndexer) {
                    ers = errorRecoverySet | ErrorRecoverySet.RBrack;
                }
                var ast = this.parseFncDecl(ers, true, requireSignature,
                                       !this.inFncDecl, text, isIndexer, isStatic, (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)), modifiers, null, true);
                var funcDecl: FuncDecl;
                if (ast.nodeType == NodeType.Error) {
                    return ast;
                }
                else {
                    funcDecl = <FuncDecl>ast;
                }
                if (funcDecl.name) {
                    funcDecl.name.minChar = minChar;
                    funcDecl.name.limChar = nameLimChar;
                }
                if ((modifiers & Modifiers.Public) != Modifiers.None) {
                    funcDecl.fncFlags |= FncFlags.Public;
                }
                if ((modifiers & Modifiers.Private) != Modifiers.None) {
                    funcDecl.fncFlags |= FncFlags.Private;
                }
                if (isStatic) {
                    funcDecl.fncFlags |= FncFlags.Static;
                }
                if (this.parsingDeclareFile || hasFlag(modifiers, Modifiers.Ambient)) {
                    funcDecl.fncFlags |= FncFlags.Ambient;
                }
                if (isAccessor) {
                    // REVIEW: verify return-type annotations and arguments
                    if (hasFlag(modifiers, Modifiers.Getter)) {
                        funcDecl.fncFlags |= FncFlags.GetAccessor;
                        funcDecl.hint = "get" + funcDecl.name.actualText;
                    }
                    else {
                        funcDecl.fncFlags |= FncFlags.SetAccessor;
                        funcDecl.hint = "set" + funcDecl.name.actualText;
                    }
                    funcDecl.fncFlags |= FncFlags.IsFunctionExpression;

                    if (modifiers & Modifiers.Ambient) {
                        this.reportParseError("Property accessors may not be declared in ambient types");
                    }
                }

                if (text == null) {
                    if (isNew) {
                        funcDecl.fncFlags |= FncFlags.ConstructMember;
                        funcDecl.hint = "_construct";
                        funcDecl.classDecl = this.currentClassDecl;
                    }
                    else {
                        funcDecl.hint = "_call";
                        funcDecl.fncFlags |= FncFlags.CallMember;
                    }
                }
                return funcDecl;
            }
            else {
                var varDecl = new VarDecl(text, this.nestingLevel);
                varDecl.minChar = minChar;
                if (this.tok.tokenId == TokenID.Colon) {
                    this.tok = this.scanner.scan();
                    varDecl.typeExpr =
                        this.parseTypeReference(errorRecoverySet | ErrorRecoverySet.Asg |
                                           ErrorRecoverySet.Comma, false);
                }
                if (this.tok.tokenId == TokenID.Asg) {
                    if (requireSignature) {
                        this.reportParseError("context does not permit variable initializer");
                        if (this.errorRecovery) {
                            this.skip(errorRecoverySet);
                            varDecl.flags |= ASTFlags.Error;
                            varDecl.limChar = this.scanner.lastTokenLimChar();
                            return varDecl;
                        }
                    }
                    // TODO: note assignment for language service
                    this.tok = this.scanner.scan();
                    varDecl.init = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                           OperatorPrecedence.Cma, true, TypeContext.NoTypes);
                    varDecl.limChar = varDecl.init.limChar;
                    if (varDecl.init.nodeType == NodeType.FuncDecl) {
                        var funcDecl = <FuncDecl>varDecl.init;
                        funcDecl.hint = varDecl.id.text;
                        funcDecl.boundToProperty = varDecl;
                    }
                    else if (isAccessor) {
                        this.reportParseError("Accessors may only be functions");
                    }
                }
                else {
                    varDecl.limChar = this.scanner.pos;
                }
                if ((modifiers & Modifiers.Readonly) != Modifiers.None) {
                    varDecl.varFlags |= VarFlags.Readonly;
                }
                if (isStatic) {
                    varDecl.varFlags |= VarFlags.Static;
                }
                if ((modifiers & Modifiers.Public) != Modifiers.None) {
                    varDecl.varFlags |= VarFlags.Public;
                }
                if ((modifiers & Modifiers.Private) != Modifiers.None) {
                    varDecl.varFlags |= VarFlags.Private;
                }
                varDecl.varFlags |= VarFlags.Property;
                return varDecl;
            }
        }

        public parseVarDecl(errorRecoverySet: ErrorRecoverySet,
            modifiers: Modifiers,
            allowIn: bool,
            isStatic: bool): AST {
            var isConst = hasFlag(modifiers, Modifiers.Readonly);
            var minChar = this.scanner.startPos;
            this.tok = this.scanner.scan();
            var varDecl: VarDecl = null;
            var declList: ASTList = null;
            var multivar = false;
            var varDeclPreComments = this.parseComments();
            for (; ;) {
                if ((this.tok.tokenId != TokenID.ID) && (!convertTokToID(this.tok, this.strictMode))) {
                    this.reportParseError("Expected identifier in variable declaration");
                    if (this.errorRecovery) {

                        varDecl = new VarDecl(new MissingIdentifier(), this.nestingLevel);
                        varDecl.minChar = minChar;
                        this.skip(errorRecoverySet);
                        varDecl.flags |= ASTFlags.Error;
                        varDecl.limChar = this.scanner.lastTokenLimChar();
                        return varDecl;
                    }
                }
                var varDeclName = Identifier.fromToken(this.tok)
                if (this.strictMode && (varDeclName.text == "eval")) {
                    this.reportParseError("'eval' may not name a variable in strict mode");
                }
                varDecl = this.makeVarDecl(varDeclName, this.nestingLevel);
                varDecl.id.minChar = this.scanner.startPos;
                varDecl.id.limChar = this.scanner.pos;
                varDecl.preComments = varDeclPreComments;

                if (isStatic) {
                    varDecl.varFlags |= VarFlags.Static;
                }
                if (hasFlag(modifiers, Modifiers.Readonly)) {
                    varDecl.varFlags |= VarFlags.Readonly;
                }
                if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Ambient)) {
                    varDecl.varFlags |= VarFlags.Ambient;
                }
                if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Exported)) {
                    varDecl.varFlags |= VarFlags.Exported;
                }
                varDecl.minChar = minChar;
                if (declList) {
                    declList.append(varDecl);
                }
                // move past ID; with error recovery need a test 
                this.tok = this.scanner.scan();
                if (this.tok.tokenId == TokenID.Colon) {
                    this.tok = this.scanner.scan();
                    var prevInFncDecl = this.inFncDecl;
                    this.inFncDecl = false;
                    varDecl.typeExpr =
                        this.parseTypeReference(errorRecoverySet | ErrorRecoverySet.Asg |
                                           ErrorRecoverySet.Comma, false);
                    this.inFncDecl = prevInFncDecl;
                }

                if (this.tok.tokenId == TokenID.Asg) {
                    if (hasFlag(varDecl.varFlags, VarFlags.Ambient)) {
                        this.reportParseError("Ambient variable can not have an initializer");
                    }
                    // TODO: note assignment for language service
                    this.tok = this.scanner.scan();
                    varDecl.init = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                           OperatorPrecedence.Cma, allowIn,
                                           TypeContext.NoTypes);
                    varDecl.limChar = varDecl.init.limChar;
                    if (varDecl.init.nodeType == NodeType.FuncDecl) {
                        // TODO: use 'as' operator when can bootstrap
                        var funcDecl = <FuncDecl>varDecl.init;
                        funcDecl.hint = varDecl.id.actualText;
                    }
                }
                else {
                    if (isConst) {
                        this.reportParseError("const declaration requires initializer");
                    }
                    varDecl.limChar = this.scanner.pos;
                }
                varDecl.postComments = this.parseCommentsForLine(this.scanner.line);

                if (this.tok.tokenId != TokenID.Comma) {
                    if (declList) {
                        declList.limChar = varDecl.limChar;
                        return declList;
                    }
                    else {
                        return varDecl;
                    }
                }

                if (!multivar) {
                    declList = new ASTList();
                    declList.minChar = varDecl.minChar;
                    declList.append(varDecl);
                    multivar = true;
                }

                this.tok = this.scanner.scan();
                minChar = this.scanner.startPos;
            }
        }

        public parseMemberList(errorRecoverySet: ErrorRecoverySet): ASTList {
            var elements = new ASTList();
            if (this.tok.tokenId == TokenID.RCurly) {
                return elements;
            }

            var idHint: string = null;
            var memberName: AST = null;
            var memberExpr: AST = null;
            var member: BinaryExpression = null;
            var minChar = this.scanner.startPos;
            var isSet = false;
            var skippedTokenForGetSetId = false;
            var getSetTok: Token = null;
            var getSetStartPos = 0;
            var getSetPos = 0;

            for (; ;) {
                var accessorPattern = false;
                if (this.tok.tokenId == TokenID.GET || this.tok.tokenId == TokenID.SET) {
                    isSet = this.tok.tokenId == TokenID.SET;
                    getSetTok = this.tok;
                    getSetStartPos = this.scanner.startPos;
                    getSetPos = this.scanner.pos;

                    this.tok = this.scanner.scan();

                    if ((this.tok.tokenId == TokenID.ID) || convertTokToIDName(this.tok)) {
                        idHint = isSet ? "set" : "get";
                        idHint = idHint + this.tok.getText();
                        memberName = Identifier.fromToken(this.tok);
                        memberName.minChar = this.scanner.startPos;
                        accessorPattern = true;
                        if (codeGenTarget < CodeGenTarget.ES5) {
                            this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                        }
                    }
                    else if (this.tok.tokenId != TokenID.Colon) {
                        this.reportParseError("Expected identifier, string or number as accessor name");
                    }
                    else {
                        skippedTokenForGetSetId = true;
                        memberName = Identifier.fromToken(getSetTok);
                        memberName.minChar = getSetStartPos;
                        memberName.limChar = getSetPos;
                    }
                }
                else if ((this.tok.tokenId == TokenID.ID) || convertTokToIDName(this.tok)) {
                    idHint = this.tok.getText();
                    memberName = Identifier.fromToken(this.tok);
                    memberName.minChar = this.scanner.startPos;
                    memberName.limChar = this.scanner.pos;
                }
                else if (this.tok.tokenId == TokenID.QString) {
                    idHint = this.tok.getText();
                    memberName = new StringLiteral(idHint);
                    memberName.minChar = this.scanner.startPos;
                    memberName.limChar = this.scanner.pos;
                }
                    // TODO: allow reserved words
                else if (this.tok.tokenId == TokenID.NumberLit) {
                    var ntok = <NumberToken>this.tok;
                    idHint = ntok.value.toString();
                    memberName = new StringLiteral(idHint);
                    memberName.minChar = this.scanner.startPos;
                    memberName.limChar = this.scanner.pos;
                }
                else {
                    this.reportParseError("Expected identifier, string or number as member name");
                    if (this.errorRecovery) {
                        memberName = new MissingIdentifier();
                        memberName.minChar = this.scanner.startPos;
                        memberName.flags |= ASTFlags.Error;
                        this.skip(errorRecoverySet | ErrorRecoverySet.Comma);
                        memberName.limChar = this.scanner.lastTokenLimChar();
                    }
                }

                if (!skippedTokenForGetSetId) {
                    this.tok = this.scanner.scan();
                }
                else {
                    skippedTokenForGetSetId = false;
                }

                if (this.tok.tokenId == TokenID.QMark) {
                    memberName.flags |= ASTFlags.OptionalName;
                    this.tok = this.scanner.scan();
                }

                if (accessorPattern) {
                    var args = new ASTList();
                    this.parseFormalParameterList(errorRecoverySet | ErrorRecoverySet.RParen,
                                      args, false, true, false, !isSet, isSet, false, null, true);

                    var funcDecl: FuncDecl =
                        this.parseFunctionStatements(errorRecoverySet | ErrorRecoverySet.RCurly,
                                                <Identifier>memberName, false, true, args,
                                                AllowedElements.FunctionDecls,
                                                this.scanner.startPos, false, Modifiers.None);

                    if (isSet && funcDecl.returnTypeAnnotation) {
                        this.reportParseError("Property setters may not declare a return type");
                    }

                    funcDecl.fncFlags |= isSet ? FncFlags.SetAccessor : FncFlags.GetAccessor;
                    funcDecl.fncFlags |= FncFlags.IsFunctionExpression;
                    funcDecl.hint = idHint;
                    memberExpr = funcDecl;
                    member = new BinaryExpression(NodeType.Member, memberName, memberExpr);
                    member.minChar = memberName.minChar;
                    if (memberExpr.nodeType == NodeType.FuncDecl) {
                        var funcDecl = <FuncDecl>memberExpr;
                        funcDecl.hint = idHint;
                    }
                }
                else if (this.tok.tokenId == TokenID.Colon) {
                    this.tok = this.scanner.scan();
                    memberExpr = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                         OperatorPrecedence.Cma, true, TypeContext.NoTypes);
                    // If the memberExpr is a type reference, we can be certain that it was an
                    // array type declaraion that lacked a "new".  We can realistically only
                    // expect call and name ASTs to be the result of this call to parseExpr.
                    // If it's a constructor without a "new", we'll flag it as an invalid
                    // call site later on.
                    if (memberExpr.nodeType == NodeType.TypeRef) {
                        this.reportParseError("Expected 'new' on array declaration in member definition")
                    }
                    member = new BinaryExpression(NodeType.Member, memberName, memberExpr);
                    member.minChar = memberName.minChar;
                    if (memberExpr.nodeType == NodeType.FuncDecl) {
                        var funcDecl = <FuncDecl>memberExpr;
                        funcDecl.hint = idHint;
                    }
                }
                else {
                    this.reportParseError("Expected ':' in member definition");
                    if (this.errorRecovery) {
                        this.skip(errorRecoverySet);
                        elements.flags |= ASTFlags.Error;
                        elements.minChar = minChar;
                        elements.limChar = this.scanner.lastTokenLimChar();
                        return elements;
                    }
                }
                idHint = null;
                elements.append(member);
                member.limChar = this.scanner.lastTokenLimChar();
                if (this.tok.tokenId != TokenID.Comma) {
                    break;
                }
                else {
                    // munch comma
                    this.tok = this.scanner.scan();
                }

                // trailing comma allowed
                if (this.tok.tokenId == TokenID.RCurly) {
                    break;
                }
            }

            if (member) {
                elements.limChar = member.limChar;
            }
            elements.minChar = minChar;
            return elements;
        }

        public parseArrayList(errorRecoverySet: ErrorRecoverySet): ASTList {
            var elements: ASTList = null;
            if (this.tok.tokenId == TokenID.RBrack) {
                return elements;
            }
            else {
                elements = new ASTList();
                elements.minChar = this.scanner.startPos;
            }

            var arg: AST;

            for (; ;) {
                if ((this.tok.tokenId == TokenID.Comma) ||
                    (this.tok.tokenId == TokenID.RBrack)) {
                    arg = new AST(NodeType.EmptyExpr);
                }
                else {
                    arg = this.parseExpr(ErrorRecoverySet.Comma | errorRecoverySet,
                                  OperatorPrecedence.Cma, true, TypeContext.NoTypes);
                }
                elements.append(arg);
                if (this.tok.tokenId != TokenID.Comma) {
                    break;
                }
                this.tok = this.scanner.scan();
            }
            elements.limChar = this.scanner.lastTokenLimChar();
            return elements;
        }

        public parseArrayLiteral(errorRecoverySet: ErrorRecoverySet): UnaryExpression {
            var arrayLiteral: UnaryExpression = null;
            arrayLiteral = new UnaryExpression(NodeType.ArrayLit,
                                             this.parseArrayList(errorRecoverySet));
            return arrayLiteral;
        }

        public parseTerm(errorRecoverySet: ErrorRecoverySet, allowCall: bool, typeContext: TypeContext, inCast: bool): AST {
            var ast: AST = null;
            var sawId = false;
            var inNew = false;
            var minChar = this.scanner.startPos;
            var limChar = this.scanner.pos;
            var parseAsLambda = false;
            var expectlambdaRParen = false;

            // keywords first
            switch (this.tok.tokenId) {
                case TokenID.NUMBER:
                case TokenID.BOOL:
                case TokenID.ANY:
                case TokenID.STRING:
                    var tid = new Identifier(tokenTable[this.tok.tokenId].text);
                    if (hasFlag(typeContext, TypeContext.Primitive)) {
                        ast = new TypeReference(tid, 0);
                        sawId = true;
                    }
                    else {
                        ast = tid;
                        sawId = true;
                    }
                    ast.minChar = minChar;
                    this.tok = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;
                case TokenID.THIS:
                    ast = new AST(NodeType.This);
                    ast.minChar = minChar;
                    this.tok = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;
                case TokenID.SUPER:
                    ast = new AST(NodeType.Super);
                    ast.minChar = minChar;
                    this.tok = this.scanner.scan();
                    limChar = this.scanner.lastTokenLimChar();
                    break;
                case TokenID.TRUE:
                    ast = new AST(NodeType.True);
                    this.tok = this.scanner.scan();
                    ast.minChar = minChar;
                    break;
                case TokenID.FALSE:
                    ast = new AST(NodeType.False);
                    this.tok = this.scanner.scan();
                    ast.minChar = minChar;
                    break;
                case TokenID.NULL:
                    ast = new AST(NodeType.Null);
                    this.tok = this.scanner.scan();
                    ast.minChar = minChar;
                    break;
                case TokenID.NEW:
                    minChar = this.scanner.pos;
                    this.tok = this.scanner.scan();
                    ast = new CallExpression(NodeType.New, this.parseTerm(errorRecoverySet, false,
                                                                  TypeContext.AllSimpleTypes, inCast),
                                           null);
                    ast.minChar = minChar;
                    limChar = this.scanner.lastTokenLimChar();
                    inNew = true;
                    break;
                case TokenID.FUNCTION:
                    minChar = this.scanner.pos;
                    ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, Modifiers.None, null, true);
                    (<FuncDecl>ast).fncFlags |= FncFlags.IsFunctionExpression;
                    ast.minChar = minChar;
                    limChar = this.scanner.lastTokenLimChar();
                    ast.limChar = limChar;
                    break;
            }

            if (ast == null) {
                if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {

                    var idText = this.tok.getText();
                    ast = this.createRef(idText, (<IdentifierToken>this.tok).hasEscapeSequence, minChar);
                    sawId = true;
 
                    ast.minChar = minChar;
                    this.tok = this.scanner.scan();

                    if (this.tok.tokenId == TokenID.QMark) {
                        ast.flags |= ASTFlags.PossibleOptionalParameter;
                    }

                    limChar = this.scanner.lastTokenLimChar();
                }
            }

            if (inCast) {
                this.chkCurTok(TokenID.GT, "Expected '>'", errorRecoverySet);
            }

            if (ast == null) {
                switch (this.tok.tokenId) {
                    case TokenID.LParen:
                        minChar = this.scanner.pos;
                        var prevTokId = this.scanner.previousToken().tokenId;
                        this.tok = this.scanner.scan();

                        var couldBeLambda = prevTokId == TokenID.LParen || // foo(()=>{});
                                            prevTokId == TokenID.Comma || // foo(x,()=>{});
                                            prevTokId == TokenID.EQ || // var foo = ()=>{};
                                            prevTokId == TokenID.Colon;    // var x = { foo: ()=> {} };


                        if (couldBeLambda && this.tok.tokenId == TokenID.RParen) {
                            parseAsLambda = true;
                            expectlambdaRParen = false;
                            this.tok = this.scanner.scan();
                        }
                        else if (couldBeLambda && this.tok.tokenId == TokenID.Ellipsis) {
                            parseAsLambda = true;
                            expectlambdaRParen = true;
                        }
                        else {
                            ast = this.parseExpr(errorRecoverySet | ErrorRecoverySet.RParen,
                                          OperatorPrecedence.No, true, TypeContext.NoTypes, couldBeLambda);
                            limChar = this.scanner.lastTokenLimChar();
                            parseAsLambda = couldBeLambda && (ast.nodeType == NodeType.Name || ast.nodeType == NodeType.Comma) &&
                                            (this.tok.tokenId == TokenID.Colon || this.tok.tokenId == TokenID.QMark);
                            expectlambdaRParen = true;
                        }

                        // Check for the RParen if it's not an anonymous '=>' function
                        if ((ast && !parseAsLambda)) {
                            if (hasFlag(ast.flags, ASTFlags.SkipNextRParen)) {
                                // REVIEW: parseExpr resulted in a lambda node, the LParen scanned earlier, is the beginning of that node, and not of a parenthesized expression;
                                //         do not look for a matching RParen for this node, but make sure to remove the flag, so that any enclosing parenthesis are matched correctly.
                                ast.flags = ast.flags & (~(ASTFlags.SkipNextRParen)); 
                                break;
                            }
                            this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet);
                            ast.isParenthesized = true;
                        }

                        break;
                    case TokenID.NumberLit: {
                        var numTok = <NumberToken>this.tok;
                        this.tok = this.scanner.scan();
                        ast = new NumberLiteral(numTok.value);
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;
                    }
                    case TokenID.QString:
                        ast = new StringLiteral(this.tok.getText());
                        this.tok = this.scanner.scan();
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;
                    case TokenID.Regex: {
                        var rtok = <RegexToken>this.tok;
                        ast = new RegexLiteral(rtok.regex);
                        this.tok = this.scanner.scan();
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        break;
                    }
                    case TokenID.LBrack:
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        ast = this.parseArrayLiteral(ErrorRecoverySet.RBrack | errorRecoverySet);
                        ast.minChar = minChar;
                        limChar = this.scanner.pos; // ']'
                        this.chkCurTok(TokenID.RBrack, "Expected ']'", errorRecoverySet);
                        break;
                    // TODO: rescan regex for TokenID.Div and AsgDiv
                    case TokenID.LCurly:
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var members = this.parseMemberList(ErrorRecoverySet.RCurly | errorRecoverySet)
                        this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
                        ast = new UnaryExpression(NodeType.ObjectLit, members);
                        ast.minChar = minChar;
                        limChar = this.scanner.lastTokenLimChar();
                        members.minChar = minChar;
                        members.limChar = limChar;
                        break;

                    case TokenID.LT:
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var term: AST = this.parseTypeReference(ErrorRecoverySet.BinOp, false);
                        this.chkCurTok(TokenID.GT, "Expected '>'", errorRecoverySet);
                        ast = new UnaryExpression(NodeType.TypeAssertion, this.parseExpr(errorRecoverySet, OperatorPrecedence.Uni, false, TypeContext.NoTypes));
                        (<UnaryExpression>ast).castTerm = term;
                        break;

                    default:
                        if (this.prevExpr && hasFlag(this.prevExpr.flags, ASTFlags.PossibleOptionalParameter)) {
                            parseAsLambda = true;
                            ast = this.prevExpr;
                        }
                        else {
                            this.reportParseError("Check format of expression term");
                            if (this.errorRecovery) {
                                var ident = new MissingIdentifier();
                                ident.minChar = minChar;
                                ident.flags |= ASTFlags.Error;
                                this.skip(errorRecoverySet | ErrorRecoverySet.Postfix);
                                if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                    ident.setText(this.tok.getText(), (<IdentifierToken>this.tok).hasEscapeSequence);
                                    this.tok = this.scanner.scan();
                                    limChar = this.scanner.lastTokenLimChar();
                                }
                                else {
                                    limChar = this.scanner.lastTokenLimChar();
                                    //tok=scanner.scan();
                                }

                                // REVIEW: set sawId
                                ast = ident;
                            }
                        }
                }
            }

            if (parseAsLambda) {
                // If the next token is an fat arrow or a colon, we either have a parameter list, or can rightly assume
                // that we have a typed formal, so we proceed with the lambda parse
                if (
                    this.tok.tokenId == TokenID.Colon ||
                    this.tok.tokenId == TokenID.Comma ||
                    this.tok.tokenId == TokenID.RParen ||
                    this.tok.tokenId == TokenID.Ellipsis) {

                        // We won't scan in the ':' case, since keeping the ':' simplifies argument handling in parseFormalParameterList
                        // Note that we don't set the minchar in this case
                    ast = this.parseLambdaExpr(errorRecoverySet, ast, true /* skipNextRParen */, expectlambdaRParen);
                    ast.minChar = minChar;
                    limChar = this.scanner.lastTokenLimChar();
                    ast.limChar = limChar;
                }
                else if (ast) {
                    ast.isParenthesized = true;
                }
            }

            if (sawId && (typeContext != TypeContext.NoTypes)) {
                typeContext |= TypeContext.ArraySuffix;
            }

            var postFix = this.parsePostfixOperators(errorRecoverySet, ast, allowCall, inNew, typeContext, minChar, limChar);

            // Defensive error check...
            if (postFix) {
                if (sawId && (postFix.nodeType == NodeType.Index)) {
                    var binExpr = <BinaryExpression>postFix;
                    if (binExpr.operand2 == null) {
                        postFix = this.convertToTypeReference(postFix);
                    }
                }

                ///////////////////////////////////////////////////////////
                //TODO: Eventually, we want to remove "minChar" and "limChar" assignments here,
                //      as they are sometimes not specific enough for each expression kind.
                postFix.minChar = minChar;
                // Only update "limChar" if it is not better than "lastTokenLimChar()"
                postFix.limChar = max(postFix.limChar, this.scanner.lastTokenLimChar());
                //
                ///////////////////////////////////////////////////////////
                return postFix;
            }
            else {
                return new AST(NodeType.Error);
            }

        }

        public parseLambdaExpr(errorRecoverySet: ErrorRecoverySet, lambdaArgs: AST, skipNextRParen: bool, expectClosingRParen: bool): AST {
            // REVIEW: Parse the remainder of a lambda expression. The opening paren has been read already, if it existed. 
            //         skipNextRParen sets a flag on the resulting lambda node to tell the calling parseTerm that the LParen it scanned has been matched as part of parsing the formal parameter list
            //         expectClosingRParen indicates that a closing RParen is expected, in the cases with optional parameter or more than one parameter.
            var ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, Modifiers.None, { preProcessedLambdaArgs: lambdaArgs }, expectClosingRParen);
            (<FuncDecl>ast).fncFlags |= FncFlags.IsFunctionExpression;
            (<FuncDecl>ast).fncFlags |= FncFlags.IsFatArrowFunction;
            if (!skipNextRParen) {
                ast.flags |= ASTFlags.SkipNextRParen;
            }
            ast.limChar = this.scanner.lastTokenLimChar();;
            return ast;
        }

        public parseExpr(errorRecoverySet: ErrorRecoverySet, minPrecedence: number, allowIn: bool,
            typeContext: TypeContext, possiblyInLambda: bool = false): AST {
            var ast: AST = null;
            var tokenInfo = lookupToken(this.tok.tokenId);
            var canAssign: bool = true;
            var idHint: string = null;
            var minChar = this.scanner.startPos;
            var preComments = this.parseComments();
            var exprIsAnonLambda = false;

            if ((tokenInfo != undefined) && (tokenInfo.unopNodeType != NodeType.None)) {
                canAssign = false;
                this.tok = this.scanner.scan();
                var tempExpr = this.parseExpr(ErrorRecoverySet.BinOp | errorRecoverySet,
                                       tokenInfo.unopPrecedence, allowIn,
                                       TypeContext.NoTypes);

                // fold unary +- into constants
                if ((tokenInfo.unopNodeType == NodeType.Pos) &&
                    (tempExpr.nodeType == NodeType.NumberLit)) {
                    ast = tempExpr;
                }
                else if ((tokenInfo.unopNodeType == NodeType.Neg) &&
                         (tempExpr.nodeType == NodeType.NumberLit)) {
                    var numLit = <NumberLiteral>tempExpr;
                    numLit.value = (-numLit.value);
                    if (numLit.value == 0) {
                        numLit.isNegativeZero = true;
                    }
                    ast = tempExpr;
                }
                else {
                    ast = new UnaryExpression(tokenInfo.unopNodeType, tempExpr);
                    ast.limChar = tempExpr.limChar;
                }
                ast.minChar = minChar;
            }
            else {
                ast = this.parseTerm(ErrorRecoverySet.BinOp | ErrorRecoverySet.AddOp |
                              errorRecoverySet, true, typeContext, false);
                var id: Identifier;
                var temp: AST;
                if (ast.nodeType == NodeType.Name) {
                    id = <Identifier>ast;
                    idHint = id.actualText;
                }
                else if (ast.nodeType == NodeType.Dot) {

                    // If this is within a class declaration, and the circumstances are right, we need to
                    // transform the dotted expression into a member declaration
                    var subsumedExpr = false;

                    if (this.inferPropertiesFromThisAssignment && 
                        (this.tok.tokenId == TokenID.Colon || this.tok.tokenId == TokenID.Asg) &&
                         this.parsingClassConstructorDefinition &&
                         this.nestingLevel == this.currentClassDefinition.constructorNestingLevel && // this nesting level means we're at the top-level in the constructor
                         (<BinaryExpression>ast).operand1.nodeType == NodeType.This) {

                        if ((<BinaryExpression>ast).operand2.nodeType == NodeType.Name) {
                            var op2ID: Identifier = (<Identifier>(<BinaryExpression>ast).operand2);

                            if (!this.currentClassDefinition.knownMemberNames[op2ID.actualText]) {
                                ast = this.parseClassMemberVariableDeclaration(op2ID, ast.minChar, true, errorRecoverySet, Modifiers.Public);
                                subsumedExpr = true;
                            }
                        }
                    }

                    if (!subsumedExpr) {
                        temp = ast;
                        while (temp.nodeType == NodeType.Dot) {
                            var binExpr = <BinaryExpression>temp;
                            temp = binExpr.operand2;
                        }
                        if (temp.nodeType == NodeType.Name) {
                             id = <Identifier>temp;
                            idHint = id.actualText;
                        }
                    }
                }
                if ((!this.scanner.lastTokenHadNewline()) &&
                    ((this.tok.tokenId == TokenID.Inc) || (this.tok.tokenId == TokenID.Dec))) {
                    canAssign = false;
                    var operand = ast;
                    ast = new UnaryExpression((this.tok.tokenId == TokenID.Inc) ? NodeType.IncPost : NodeType.DecPost, operand);
                    ast.limChar = this.scanner.pos;
                    ast.minChar = operand.minChar;
                    this.tok = this.scanner.scan();
                }
            }
            for (; ;) {
                tokenInfo = lookupToken(this.tok.tokenId);
                if ((tokenInfo == undefined) || (tokenInfo.binopNodeType == NodeType.None)) {
                    break;
                }
                if ((!allowIn) && (tokenInfo.binopNodeType == NodeType.In)) {
                    break;
                }
                if (tokenInfo.binopPrecedence == OperatorPrecedence.Asg) {
                    if (tokenInfo.binopPrecedence < minPrecedence) {
                        break;
                    }
                    if (!canAssign) {
                        this.reportParseError("illegal assignment");
                    }
                }
                else if (tokenInfo.binopPrecedence <= minPrecedence) {
                    break;
                }

                if (possiblyInLambda && this.tok.tokenId == TokenID.Comma && this.scanner.getLookAheadToken().tokenId == TokenID.Ellipsis) {
                    // The ellipsis can only exist in the formal list of a lambda expression, so do not attempt to parse the comma token as the comma binary operator
                    // instead parse it as a lambda
                    exprIsAnonLambda = true;
                    canAssign = false;
                    ast = this.parseLambdaExpr(errorRecoverySet, ast, false, true);
                    break;
                }

                // Precedence is high enough. Consume the operator token.
                this.tok = this.scanner.scan();
                canAssign = false;
                if (tokenInfo.binopNodeType == NodeType.QMark) {
                    if (possiblyInLambda && 
                        ( this.tok.tokenId == TokenID.Asg || this.tok.tokenId == TokenID.Colon || this.tok.tokenId == TokenID.RParen || this.tok.tokenId == TokenID.Comma)) {
                        // The QMark is not a ternary expression, it is a marker for optional parameter in a lambda expression.
                        exprIsAnonLambda = true;
                        canAssign = true;
                    }
                    else {
                        this.prevExpr = ast;
                        var qmarkNode = this.parseExpr(errorRecoverySet | ErrorRecoverySet.Colon,
                                                OperatorPrecedence.Asg, allowIn,
                                                TypeContext.NoTypes);

                        // Do not hold onto the prevExpr handle
                        this.prevExpr = null;
                        this.chkCurTok(TokenID.Colon, "Expected :", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart);
                        ast = new TrinaryExpression(NodeType.QMark, ast, qmarkNode,
                                                  this.parseExpr(errorRecoverySet |
                                                            ErrorRecoverySet.BinOp,
                                                            OperatorPrecedence.Asg,
                                                            allowIn, TypeContext.NoTypes));
                    }
                }
                else {
                    var tc = TypeContext.NoTypes;
                    var binExpr2: BinaryExpression;

                    binExpr2 = new BinaryExpression(tokenInfo.binopNodeType, ast,
                                                    this.parseExpr(errorRecoverySet |
                                                            ErrorRecoverySet.BinOp,
                                                            tokenInfo.binopPrecedence,
                                                            allowIn, TypeContext.NoTypes, possiblyInLambda));
                    if (binExpr2.operand2.nodeType == NodeType.FuncDecl) {
                        var funcDecl = <FuncDecl>binExpr2.operand2;
                        funcDecl.hint = idHint;
                    }

                    binExpr2.minChar = ast.minChar;
                    binExpr2.limChar = this.scanner.lastTokenLimChar();
                    idHint = null;
                    ast = binExpr2;
                }
            }
            if (canAssign) {
                ast.flags |= ASTFlags.Writeable;
            }
            if (!exprIsAnonLambda) {
                ///////////////////////////////////////////////////////////
                //TODO: Eventually, we want to remove "minChar" and "limChar" assignments here,
                //      as they are sometimes not specific enough for each statement kind.
                ast.minChar = minChar;
                // Only update "limChar" if it is not better than "lastTokenLimChar()"
                ast.limChar = max(ast.limChar, this.scanner.lastTokenLimChar());
                //
                ///////////////////////////////////////////////////////////
                ast.preComments = preComments;
                ast.postComments = this.parseCommentsForLine(this.scanner.line);
            }
            return ast;
        }

        public parsePostfixOperators(errorRecoverySet: ErrorRecoverySet, ast: AST, allowCall: bool, inNew: bool,
            typeContext: TypeContext, lhsMinChar: number, lhsLimChar: number): AST {
            var count = 0;

            if (!ast) {
                ast = new AST(NodeType.EmptyExpr);
                ast.isParenthesized = true;
            }

            ast.minChar = lhsMinChar;
            ast.limChar = lhsLimChar;

            for (; ;) {
                switch (this.tok.tokenId) {
                    case TokenID.LParen:
                        if (inNew) {
                            var callExpr = <CallExpression>ast;
                            callExpr.args = this.parseArgList(errorRecoverySet);
                            inNew = false;
                        }
                        else {
                            if (!allowCall) {
                                return ast;
                            }
                            ast = new CallExpression(NodeType.Call, ast,
                                                   this.parseArgList(errorRecoverySet));
                            ast.minChar = lhsMinChar;
                        }
                        ast.limChar = this.scanner.pos; // ')'
                        this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet);
                        break;
                    case TokenID.LBrack:
                        this.tok = this.scanner.scan();
                        if (this.tok.tokenId == TokenID.RBrack) {
                            if (hasFlag(typeContext, TypeContext.ArraySuffix)) {
                                this.tok = this.scanner.scan();
                                if (ast.nodeType == NodeType.TypeRef) {
                                    var typeRef = <TypeReference>ast;
                                    typeRef.arrayCount++;
                                }
                                else {
                                    ast = new BinaryExpression(NodeType.Index, ast, null);
                                }
                                ast.limChar = this.scanner.pos;
                                break; // note early exit from case
                            }
                        }

                        ast = new BinaryExpression(NodeType.Index, ast,
                                                 this.parseExpr(errorRecoverySet | ErrorRecoverySet.RBrack,
                                                           OperatorPrecedence.No, true,
                                                           TypeContext.NoTypes));
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.pos; // ']'
                        this.chkCurTok(TokenID.RBrack, "Expected ']'", errorRecoverySet);
                        break;
                    case TokenID.Dot: {
                        var name: Identifier = null;
                        var curpos = this.scanner.pos;
                        this.tok = this.scanner.scan();
                        // Don't allow reserved words if immediately after a new line and error recovery is enabled
                        if ((this.tok.tokenId == TokenID.ID) || ((!this.errorRecovery || !this.scanner.lastTokenHadNewline()) && convertTokToIDName(this.tok))) {
                            ast.flags |= ASTFlags.DotLHS;
                            name = this.createRef(this.tok.getText(), (<IdentifierToken>this.tok).hasEscapeSequence, this.scanner.startPos);
                            name.limChar = this.scanner.pos;
                            this.tok = this.scanner.scan();
                        }
                        else {
                            this.reportParseError("Expected identifier following dot");
                            if (this.errorRecovery) {
                                this.skip(errorRecoverySet);
                                ast.flags |= (ASTFlags.Error | ASTFlags.DotLHS);
                                return ast;
                            }
                            else {
                                name = new MissingIdentifier();
                            }
                        }
                        ast = new BinaryExpression(NodeType.Dot, ast, name);
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        break;
                    }
                    case TokenID.Arrow:
                        ast = this.parseFncDecl(errorRecoverySet, false, false, false, null, false, false, false, Modifiers.None, { preProcessedLambdaArgs: ast }, false);
                        (<FuncDecl>ast).fncFlags |= FncFlags.IsFunctionExpression;
                        ast.minChar = lhsMinChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        break;
                    default:
                        return ast;

                }
            }
        }


        public parseTry(tryNode: Try, errorRecoverySet: ErrorRecoverySet, allowedElements: AllowedElements, parentModifiers: Modifiers): Try {
            var minChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.tok = this.scanner.scan();
            if (this.tok.tokenId != TokenID.LCurly) {
                this.reportParseError("Expected '{'");
                if (this.errorRecovery) {
                    var etryNode = tryNode;
                    etryNode.minChar = minChar;
                    etryNode.limChar = this.scanner.lastTokenLimChar();
                    etryNode.flags |= ASTFlags.Error;
                    return etryNode;
                }
            }
            tryNode.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
            tryNode.minChar = minChar;
            tryNode.limChar = tryNode.body.limChar;
            tryNode.preComments = preComments;
            tryNode.postComments = this.parseComments();
            return tryNode;
        }

        public parseCatch(errorRecoverySet: ErrorRecoverySet, allowedElements: AllowedElements, parentModifiers: Modifiers): Catch {
            var catchMinChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.tok = this.scanner.scan();
            this.chkCurTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                        ErrorRecoverySet.ExprStart);
            if ((this.tok.tokenId != TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                this.reportParseError("Expected identifier in catch header");
                if (this.errorRecovery) {
                    this.skip(errorRecoverySet);

                    var ecatch = new Catch(new VarDecl(new MissingIdentifier(), this.nestingLevel),
                                            new Statement(NodeType.Empty));
                    ecatch.statement.minChar = catchMinChar;
                    ecatch.statement.limChar = this.scanner.pos;
                    ecatch.minChar = this.scanner.startPos;
                    ecatch.limChar = this.scanner.pos;
                    ecatch.flags |= ASTFlags.Error;
                    return ecatch;
                }
            }
            var param = new VarDecl(Identifier.fromToken(this.tok), this.nestingLevel);
            param.id.minChar = this.scanner.startPos;
            param.id.limChar = this.scanner.pos;
            param.minChar = param.id.minChar;
            param.limChar = param.id.limChar;
            this.tok = this.scanner.scan();
            var statementPos = this.scanner.pos;
            this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet |
                        ErrorRecoverySet.StmtStart);
            if (this.tok.tokenId != TokenID.LCurly) {
                this.reportParseError("Expected '{' to start catch body");
                if (this.errorRecovery) {
                    this.skip(errorRecoverySet);

                    var ecatch = new Catch(new VarDecl(new MissingIdentifier(), this.nestingLevel),
                                            new Statement(NodeType.Empty));
                    ecatch.statement.minChar = catchMinChar;
                    ecatch.statement.limChar = statementPos;
                    ecatch.minChar = this.scanner.startPos;
                    ecatch.limChar = this.scanner.pos;
                    ecatch.flags |= ASTFlags.Error;
                    return ecatch;
                }
            }

            var catchStmt = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
            var catchNode = new Catch(param, catchStmt);
            catchNode.statement.minChar = catchMinChar;
            catchNode.statement.limChar = statementPos;
            catchNode.minChar = catchMinChar;
            catchNode.limChar = catchStmt.limChar;
            catchNode.preComments = preComments;
            catchNode.postComments = this.parseComments();
            return catchNode;
        }

        public parseFinally(errorRecoverySet: ErrorRecoverySet, allowedElements: AllowedElements, parentModifiers: Modifiers): Finally {
            var finMinChar = this.scanner.startPos;
            var preComments = this.parseComments();
            this.tok = this.scanner.scan();
            if (this.tok.tokenId != TokenID.LCurly) {
                this.reportParseError("Expected '{' to start body of finally statement");
                if (this.errorRecovery) {
                    this.skip(errorRecoverySet);
                    var efin = new Finally(new Statement(NodeType.Empty));
                    efin.flags |= ASTFlags.Error;
                    efin.minChar = this.scanner.startPos;
                    efin.limChar = this.scanner.pos;
                    return efin;
                }
            }
            var finBody = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers)
            var fin = new Finally(finBody);
            fin.minChar = finMinChar;
            fin.limChar = fin.body.limChar;
            fin.preComments = preComments;
            fin.postComments = this.parseComments();
            return fin;
        }

        public parseTryCatchFinally(errorRecoverySet: ErrorRecoverySet, allowedElements: AllowedElements, parentModifiers: Modifiers, labelList: ASTList): AST {
            var tryPart: AST = new Try(null);
            var tryMinChar = this.scanner.startPos;
            this.pushStmt(<Statement>tryPart, labelList);
            this.parseTry(<Try>tryPart, errorRecoverySet | ErrorRecoverySet.Catch, allowedElements, parentModifiers);
            this.popStmt();
            var tc: TryCatch = null;
            var tf: TryFinally = null;
            if (this.tok.tokenId == TokenID.CATCH) {
                var catchPart = this.parseCatch(errorRecoverySet | ErrorRecoverySet.Catch, allowedElements, parentModifiers);
                tc = new TryCatch(<Try>tryPart, catchPart);
                tc.minChar = tryPart.minChar;
                tc.limChar = catchPart.limChar;
            }
            if (this.tok.tokenId != TokenID.FINALLY) {
                if (tc == null) {
                    this.reportParseError("try with neither catch nor finally");
                    if (this.errorRecovery) {
                        var etf = new TryFinally(tryPart, new Finally(new AST(NodeType.Empty)));
                        etf.flags |= ASTFlags.Error;
                        etf.minChar = this.scanner.startPos;
                        etf.limChar = this.scanner.pos;
                        return etf;
                    }
                    return new TryFinally(tryPart, new Finally(new AST(NodeType.Empty)));
                }
                else {
                    return tc;
                }
            }
            else {
                if (tc) {
                    tryPart = tc;
                }
                var finallyPart = this.parseFinally(errorRecoverySet, allowedElements, parentModifiers)
                tf = new TryFinally(tryPart, finallyPart);
                tf.minChar = tryMinChar;
                tf.limChar = finallyPart.limChar;
                return tf;
            }
        }

        public parseStatement(errorRecoverySet: ErrorRecoverySet, allowedElements: AllowedElements, parentModifiers: Modifiers): AST {
            var ast: AST = null;
            var labelList: ASTList = null;
            var astList: ASTList = null;
            var temp: AST;
            var modifiers = Modifiers.None;
            var minChar = this.scanner.startPos;
            var forInOk = false;
            var needTerminator = false;
            var fnOrVar: AST = null;
            var preComments = this.parseComments();
            this.state = ParseState.StartStatement;

            function isAmbient() {
                return hasFlag(modifiers, Modifiers.Ambient) || hasFlag(parentModifiers, Modifiers.Ambient);
            }

            function mayNotBeExported() {
                if (hasFlag(modifiers, Modifiers.Exported)) {
                    this.reportError("Statement may not be exported");
                }
            }

            for (; ;) {
                switch (this.tok.tokenId) {
                    case TokenID.EOF:
                        ast = new AST(NodeType.Error);
                        ast.minChar = minChar;
                        ast.limChar = this.scanner.pos;
                        break;
                    case TokenID.FUNCTION:
                        if (this.inStaticFnc) {
                            this.reportParseError("Ambient static function delarations may only contain other ambient static function declarations");
                        }
                        if (this.parsingDeclareFile || isAmbient() || this.ambientModule) {
                            this.tok = this.scanner.scan();
                            fnOrVar = this.parsePropertyDecl(errorRecoverySet | ErrorRecoverySet.SColon,
                                                      modifiers, true, false);
                            if (fnOrVar.nodeType == NodeType.VarDecl) {
                                this.reportParseError("function keyword can only introduce function declaration");
                            }
                            else if ((fnOrVar.nodeType == NodeType.FuncDecl) && ((<FuncDecl>fnOrVar).fncFlags, FncFlags.IsFatArrowFunction)) {
                                needTerminator = true;
                            }
                            ast = fnOrVar;
                            if (this.parsingDeclareFile || this.ambientModule && ast.nodeType == NodeType.FuncDecl) {
                                (<FuncDecl>ast).fncFlags |= FncFlags.Exported;
                            }
                        }
                        else {
                            ast = this.parseFncDecl(errorRecoverySet, true, false, false, null, false, false, isAmbient(), modifiers, null, true);
                            if (hasFlag((<FuncDecl>ast).fncFlags, FncFlags.IsFatArrowFunction)) {
                                needTerminator = true;
                            }
                            if (this.ambientModule) {
                                this.reportParseError("function declaration not permitted within ambient module");
                            }
                            if (hasFlag(modifiers, Modifiers.Exported)) {
                                (<FuncDecl>ast).fncFlags |= FncFlags.Exported;
                            }
                        }
                        break;
                    case TokenID.MODULE:
                        if ((allowedElements & AllowedElements.ModuleDecls) == AllowedElements.None) {
                            this.reportParseError("module not allowed in this context");
                            this.tok = this.scanner.scan();
                            ast = new AST(NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        else {
                            ast = this.parseModuleDecl(errorRecoverySet, modifiers);
                        }
                        break;
                    case TokenID.IMPORT:
                        if ((allowedElements & AllowedElements.ModuleDecls) == AllowedElements.None) {
                            this.reportParseError("module not allowed in this context");
                            this.tok = this.scanner.scan();
                            ast = new AST(NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        else {
                            ast = this.parseImportDecl(errorRecoverySet, modifiers);
                            needTerminator = true;
                        }
                        break;
                    case TokenID.EXPORT:
                        if ((allowedElements & AllowedElements.ModuleDecls) == AllowedElements.None) {
                            this.reportParseError("'export' statements are only allowed at the global and module levels");
                            this.tok = this.scanner.scan();
                            ast = new AST(NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        if (this.topLevel) {
                            this.hasTopLevelImportOrExport = true;
                        }
                        modifiers |= Modifiers.Exported;
                        this.tok = this.scanner.scan();
                        break;
                    case TokenID.PRIVATE:
                        modifiers |= Modifiers.Private;

                        this.tok = this.scanner.scan();

                        if (this.parsingClassConstructorDefinition) {

                            if (!this.inferPropertiesFromThisAssignment) {
                                this.reportParseError("Property declarations are not permitted within constructor bodies");
                            }

                            minChar = this.scanner.pos;
                            if (this.inferPropertiesFromThisAssignment && (this.tok.tokenId != TokenID.THIS || (this.tok = this.scanner.scan()).tokenId != TokenID.Dot)) {
                                this.reportParseError("Expected 'this.' for property declaration");
                                this.tok = this.scanner.scan();
                                ast = new AST(NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            }
                            else {
                                this.tok = this.scanner.scan();

                                var id = Identifier.fromToken(this.tok);
                                id.minChar = this.scanner.startPos;
                                id.limChar = this.scanner.pos;

                                this.tok = this.scanner.scan();
                                ast = this.parseClassMemberVariableDeclaration(id, minChar, this.parsingClassConstructorDefinition, errorRecoverySet, modifiers);
                            }
                        }
                        else {
                            if (this.tok.tokenId != TokenID.INTERFACE) {
                                if (this.tok.tokenId == TokenID.GET) {
                                    this.prevIDTok = this.tok;
                                    this.tok = this.scanner.scan();
                                    if (codeGenTarget < CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                        modifiers |= Modifiers.Getter;
                                        this.prevIDTok = null;
                                    }
                                }
                                else if (this.tok.tokenId == TokenID.SET) {
                                    this.prevIDTok = this.tok;
                                    this.tok = this.scanner.scan();
                                    if (codeGenTarget < CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                        modifiers |= Modifiers.Setter;
                                        this.prevIDTok = null;
                                    }
                                }
                                fnOrVar = this.parsePropertyDecl(errorRecoverySet | ErrorRecoverySet.SColon,
                                                          modifiers, isAmbient(), false);
                                if ((fnOrVar.nodeType == NodeType.VarDecl) ||
                                    ((fnOrVar.nodeType == NodeType.FuncDecl) && (hasFlag((<FuncDecl>fnOrVar).fncFlags, FncFlags.IsFatArrowFunction)))) {
                                    needTerminator = true;
                                }
                                ast = fnOrVar;
                            }
                        }
                        break;
                    case TokenID.PUBLIC:
                        if (this.parsingClassConstructorDefinition) {

                            if (!this.inferPropertiesFromThisAssignment) {
                                this.reportParseError("Property declarations are not permitted within constructor bodies");
                            }

                            this.tok = this.scanner.scan(); 
                            minChar = this.scanner.pos;
                            modifiers |= Modifiers.Public;
                            if (this.inferPropertiesFromThisAssignment && (this.tok.tokenId != TokenID.THIS || (this.tok = this.scanner.scan()).tokenId != TokenID.Dot)) {
                                this.reportParseError("Expected 'this.' for property declaration");
                                this.tok = this.scanner.scan();
                                ast = new AST(NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            }
                            else {
                                this.tok = this.scanner.scan();

                                var id = Identifier.fromToken(this.tok);
                                id.minChar = this.scanner.startPos;
                                id.limChar = this.scanner.pos;

                                this.tok = this.scanner.scan();
                                ast = this.parseClassMemberVariableDeclaration(id, minChar, this.parsingClassConstructorDefinition, errorRecoverySet, modifiers);
                            }
                        }
                        else {
                            if ((allowedElements & AllowedElements.Properties) == AllowedElements.None) {
                                this.reportParseError("'property' statements are only allowed within classes");
                                this.tok = this.scanner.scan();
                                ast = new AST(NodeType.Error);
                                ast.minChar = minChar;
                                ast.limChar = this.scanner.lastTokenLimChar();
                            }
                            else {
                                modifiers |= Modifiers.Public;
                                this.tok = this.scanner.scan();
                                if (this.tok.tokenId == TokenID.GET) {
                                    this.prevIDTok = this.tok;
                                    this.tok = this.scanner.scan();
                                    if (codeGenTarget < CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                        modifiers |= Modifiers.Getter;
                                        this.prevIDTok = null;
                                    }
                                }
                                else if (this.tok.tokenId == TokenID.SET) {
                                    this.prevIDTok = this.tok;
                                    this.tok = this.scanner.scan();
                                    if (codeGenTarget < CodeGenTarget.ES5) {
                                        this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                                    }
                                    if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                        modifiers |= Modifiers.Setter;
                                        this.prevIDTok = null;
                                    }
                                }
                                fnOrVar = this.parsePropertyDecl(errorRecoverySet | ErrorRecoverySet.SColon,
                                                            modifiers, isAmbient(), false);
                                if ((fnOrVar.nodeType == NodeType.VarDecl) ||
                                    ((fnOrVar.nodeType == NodeType.FuncDecl) && hasFlag((<FuncDecl>fnOrVar).fncFlags, FncFlags.IsFatArrowFunction))) {
                                    needTerminator = true;
                                }
                                ast = fnOrVar;
                            }
                        }
                        break;
                    case TokenID.DECLARE:
                        if (!(allowedElements & AllowedElements.AmbientDecls)) {
                            this.reportParseError("Ambient declarations are only allowed at the top-level or module scopes")
                        }
                        if (!this.parsingDeclareFile && hasFlag(parentModifiers, Modifiers.Ambient)) {
                            this.reportParseError("Duplicate ambient declaration in this context. (Is the enclosing module or class already ambient?)")
                        }
                        modifiers |= Modifiers.Ambient;
                        this.tok = this.scanner.scan();
                        break;
                    case TokenID.CLASS:
                        if ((allowedElements & AllowedElements.ClassDecls) == AllowedElements.None) {
                            this.reportParseError("class not allowed in this context");
                            this.tok = this.scanner.scan();
                            ast = new AST(NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        else {
                            ast = this.parseClassDecl(errorRecoverySet, minChar, modifiers);
                        }
                        break;
                    case TokenID.INTERFACE:
                        if ((allowedElements & AllowedElements.InterfaceDecls) == AllowedElements.None) {
                            this.reportParseError("interface not allowed in this context");
                            this.tok = this.scanner.scan();
                            ast = new AST(NodeType.Error);
                            ast.minChar = minChar;
                            ast.limChar = this.scanner.lastTokenLimChar();
                        }
                        else {
                            ast = this.parseInterfaceDecl(errorRecoverySet, modifiers);
                        }
                        break;
                    case TokenID.VAR:
                        var declAst: AST = this.parseVarDecl(errorRecoverySet | ErrorRecoverySet.StmtStart, modifiers,
                                                     true, false);
                        if (declAst.nodeType == NodeType.VarDecl) {
                            ast = declAst;
                        }
                        else {
                            ast = new Block(<ASTList>declAst, false);
                        }
                        needTerminator = true;
                        break;
                    case TokenID.STATIC:

                        if (this.currentClassDecl == null) {
                            this.reportParseError("Statics may only be class members");
                        }

                        mayNotBeExported();
                        modifiers |= Modifiers.Public;
                        this.tok = this.scanner.scan();
                        if (this.tok.tokenId == TokenID.GET) {
                            this.prevIDTok = this.tok;
                            this.tok = this.scanner.scan();
                            if (codeGenTarget < CodeGenTarget.ES5) {
                                this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                            }
                            if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                modifiers |= Modifiers.Getter;
                                this.prevIDTok = null;
                            }
                        }
                        else if (this.tok.tokenId == TokenID.SET) {
                            this.tok = this.scanner.scan();
                            if (codeGenTarget < CodeGenTarget.ES5) {
                                this.reportParseError("Property accessors are only available when targeting ES5 or greater");
                            }
                            if ((this.tok.tokenId == TokenID.ID) || convertTokToID(this.tok, this.strictMode)) {
                                modifiers |= Modifiers.Setter;
                            }
                        }
                        if (isAmbient()) {
                            modifiers |= Modifiers.Ambient;
                        }
                        fnOrVar = this.parsePropertyDecl(errorRecoverySet | ErrorRecoverySet.SColon,
                                                  modifiers, this.parsingDeclareFile || (modifiers & Modifiers.Ambient) != Modifiers.None, true);

                        var staticsList = this.topStaticsList();
                        if (staticsList && fnOrVar.nodeType == NodeType.VarDecl) {
                            staticsList.append(fnOrVar);
                        }

                        if (fnOrVar.nodeType == NodeType.VarDecl || ((fnOrVar.nodeType == NodeType.FuncDecl) && hasFlag((<FuncDecl>fnOrVar).fncFlags, FncFlags.IsFatArrowFunction))) {
                            needTerminator = true;
                        }

                        ast = fnOrVar;
                        break;
                    case TokenID.FOR:
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("syntax error: for statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.chkNxtTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart | ErrorRecoverySet.Var);
                        this.state = ParseState.ForInit;
                        forInOk = true;
                        switch (this.tok.tokenId) {
                            case TokenID.VAR:
                                temp = this.parseVarDecl(errorRecoverySet | ErrorRecoverySet.SColon |
                                                  ErrorRecoverySet.In, Modifiers.None, false, false);
                                break;
                            case TokenID.SColon:
                                temp = null;
                                this.state = ParseState.ForCondStart;
                                break;
                            default:
                                temp = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon |
                                               ErrorRecoverySet.In, OperatorPrecedence.No, false,
                                               TypeContext.NoTypes);
                                break;
                        }
                        this.state = ParseState.ForInitAfterVar;
                        if (this.tok.tokenId == TokenID.IN) {
                            if ((temp == null) || (!forInOk)) {
                                this.reportParseError("malformed for statement");
                                if (this.errorRecovery) {
                                    this.skip(errorRecoverySet | ErrorRecoverySet.StmtStart);
                                    ast = new AST(NodeType.Empty);
                                    ast.flags |= ASTFlags.Error;
                                }
                            }
                            else {
                                this.tok = this.scanner.scan();
                                var forInStmt = new ForInStatement(temp,
                                                                 this.parseExpr(ErrorRecoverySet.RParen |
                                                                           errorRecoverySet,
                                                                           OperatorPrecedence.Cma,
                                                                           false,
                                                                           TypeContext.NoTypes));

                                forInStmt.limChar = this.scanner.pos;
                                forInStmt.statement.minChar = minChar;
                                forInStmt.statement.limChar = this.scanner.pos;
                                this.chkCurTok(TokenID.RParen, "Expected ')'", ErrorRecoverySet.StmtStart |
                                          errorRecoverySet);
                                this.pushStmt(forInStmt, labelList);
                                forInStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                                this.popStmt();
                                forInStmt.minChar = minChar;
                                ast = forInStmt;
                            }
                        }
                        else {
                            var forStmt: ForStatement = new ForStatement(temp);
                            forStmt.minChar = minChar;
                            this.chkCurTok(TokenID.SColon, "Expected ';'", errorRecoverySet);
                            if (this.tok.tokenId == TokenID.SColon) {
                                forStmt.cond = null;
                            }
                            else {
                                forStmt.cond = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon |
                                                       ErrorRecoverySet.RParen,
                                                       OperatorPrecedence.No, true,
                                                       TypeContext.NoTypes);
                                if (this.tok.tokenId != TokenID.SColon) {
                                    this.skip(errorRecoverySet | ErrorRecoverySet.StmtStart);
                                    ast = forStmt;
                                    ast.flags |= ASTFlags.Error;
                                }
                            }
                            this.tok = this.scanner.scan();
                            if (this.tok.tokenId == TokenID.RParen) {
                                forStmt.incr = null;
                            }
                            else {
                                forStmt.incr = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon |
                                                       ErrorRecoverySet.RParen,
                                                       OperatorPrecedence.No, true,
                                                       TypeContext.NoTypes);
                            }
                            this.chkCurTok(TokenID.RParen, "Expected ')'",
                                      errorRecoverySet | ErrorRecoverySet.LCurly);
                            this.pushStmt(forStmt, labelList);
                            forStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                            this.popStmt();
                            forStmt.limChar = forStmt.body.limChar;
                            ast = forStmt;
                        }
                        break;
                    case TokenID.WITH: {
                        if (codeGenTarget < CodeGenTarget.ES5) {
                            this.reportParseError("'with' statements are only available in ES5 codegen mode or better");
                        }

                        if (this.strictMode) {
                            this.reportParseError("'with' statements are not available in strict mode");
                        }

                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("'with' statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.chkNxtTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart | ErrorRecoverySet.Var);

                        var expr = this.parseExpr(errorRecoverySet | ErrorRecoverySet.Colon,
                                                            OperatorPrecedence.No, true,
                                                            TypeContext.NoTypes);
                        this.chkCurTok(TokenID.RParen, "Expected ')'",
                                      errorRecoverySet | ErrorRecoverySet.LCurly);

                        var withStmt = new WithStatement(expr);
                        withStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                        withStmt.minChar = minChar;
                        withStmt.limChar = withStmt.body.limChar;
                        ast = withStmt;
                    }
                        break;
                    case TokenID.SWITCH: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("'switch' statement does not take modifiers");
                        }
                        this.chkNxtTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart);

                        var switchStmt = new SwitchStatement(this.parseExpr(errorRecoverySet |
                                                                     ErrorRecoverySet.RParen,
                                                                     OperatorPrecedence.No,
                                                                     true,
                                                                     TypeContext.NoTypes));
                        switchStmt.statement.minChar = minChar;
                        switchStmt.statement.limChar = this.scanner.pos;
                        this.chkCurTok(TokenID.RParen, "Expected ')'",
                                  errorRecoverySet | ErrorRecoverySet.LCurly);
                        var caseListMinChar = this.scanner.startPos;
                        this.chkCurTok(TokenID.LCurly, "Expected '{'",
                                  errorRecoverySet | ErrorRecoverySet.SCase);
                        switchStmt.defaultCase = null;
                        switchStmt.caseList = new ASTList();
                        var caseStmt: CaseStatement = null;
                        this.pushStmt(switchStmt, labelList);
                        for (; ;) {
                            if ((this.tok.tokenId == TokenID.CASE) ||
                                (this.tok.tokenId == TokenID.DEFAULT)) {
                                var isDefault = (this.tok.tokenId == TokenID.DEFAULT);
                                caseStmt = new CaseStatement();
                                caseStmt.minChar = this.scanner.startPos;
                                this.tok = this.scanner.scan();
                                if (isDefault) {
                                    switchStmt.defaultCase = caseStmt;
                                }
                                else {
                                    caseStmt.expr = this.parseExpr(errorRecoverySet | ErrorRecoverySet.Colon,
                                                            OperatorPrecedence.No, true,
                                                            TypeContext.NoTypes);
                                }
                                this.chkCurTok(TokenID.Colon, "Expected ':'", errorRecoverySet |
                                          ErrorRecoverySet.StmtStart);
                                caseStmt.body = new ASTList();
                                this.parseStmtList(errorRecoverySet | ErrorRecoverySet.RCurly,
                                              caseStmt.body, false, true, allowedElements, modifiers);
                                caseStmt.limChar = caseStmt.body.limChar;
                                switchStmt.caseList.append(caseStmt);
                            }
                            else {
                                break;
                            }
                        }
                        // end of switch statement
                        switchStmt.caseList.minChar = caseListMinChar;
                        switchStmt.caseList.limChar = this.scanner.pos;
                        switchStmt.limChar = switchStmt.caseList.limChar;
                        this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
                        this.popStmt();
                        ast = switchStmt;
                        break;
                    }
                    case TokenID.WHILE: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("'while' statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.chkNxtTok(TokenID.LParen, "Expected '('", ErrorRecoverySet.ExprStart |
                                  errorRecoverySet);
                        var whileStmt = new WhileStatement(this.parseExpr(errorRecoverySet |
                                                                   ErrorRecoverySet.RParen,
                                                                   OperatorPrecedence.No,
                                                                   true, TypeContext.NoTypes));
                        whileStmt.minChar = minChar;
                        this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet |
                                  ErrorRecoverySet.StmtStart);
                        this.pushStmt(whileStmt, labelList);
                        whileStmt.body = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                        whileStmt.limChar = whileStmt.body.limChar;
                        this.popStmt();
                        ast = whileStmt;
                        break;
                    }
                    case TokenID.DO: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("'do' statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var doStmt = new DoWhileStatement();
                        doStmt.minChar = minChar;
                        this.pushStmt(doStmt, labelList);
                        doStmt.body = this.parseStatement(errorRecoverySet | ErrorRecoverySet.While,
                                                   allowedElements, parentModifiers);
                        this.popStmt();
                        doStmt.whileAST = new Identifier("while");
                        doStmt.whileAST.minChar = this.scanner.startPos;
                        this.chkCurTok(TokenID.WHILE, "Expected 'while'", errorRecoverySet |
                                  ErrorRecoverySet.LParen);
                        doStmt.whileAST.limChar = doStmt.whileAST.minChar + 5;
                        this.chkCurTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart);
                        doStmt.cond = this.parseExpr(errorRecoverySet | ErrorRecoverySet.RParen,
                                              OperatorPrecedence.No, true, TypeContext.NoTypes);
                        doStmt.limChar = this.scanner.pos;
                        this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet);
                        ast = doStmt;
                        // compatibility; more strict would be to require the ';'
                        if (this.tok.tokenId == TokenID.SColon) {
                            this.tok = this.scanner.scan();
                        }
                        break;
                    }
                    case TokenID.IF: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("if statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.chkNxtTok(TokenID.LParen, "Expected '('", errorRecoverySet |
                                  ErrorRecoverySet.ExprStart);
                        var ifStmt = new IfStatement(this.parseExpr(errorRecoverySet |
                                                             ErrorRecoverySet.LParen,
                                                             OperatorPrecedence.No, true,
                                                             TypeContext.NoTypes));
                        ifStmt.minChar = minChar;
                        ifStmt.statement.minChar = minChar;
                        ifStmt.statement.limChar = this.scanner.pos;
                        this.chkCurTok(TokenID.RParen, "Expected ')'", errorRecoverySet |
                                  ErrorRecoverySet.StmtStart);
                        this.pushStmt(ifStmt, labelList);
                        ifStmt.thenBod = this.parseStatement(ErrorRecoverySet.Else | errorRecoverySet,
                                                      allowedElements, parentModifiers);
                        ifStmt.limChar = ifStmt.thenBod.limChar;
                        if (this.tok.tokenId == TokenID.ELSE) {
                            this.tok = this.scanner.scan();
                            ifStmt.elseBod = this.parseStatement(errorRecoverySet, allowedElements, parentModifiers);
                            ifStmt.limChar = ifStmt.elseBod.limChar;
                        }
                        this.popStmt();
                        ast = ifStmt;
                        break;
                    }
                    case TokenID.TRY: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("try statement does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        ast = this.parseTryCatchFinally(errorRecoverySet, AllowedElements.FunctionBody, parentModifiers, labelList);
                        break;
                    }
                    case TokenID.LCurly: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("block does not take modifiers");
                        }
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var block = new Block(new ASTList(), true);
                        this.pushStmt(block, labelList);
                        this.parseStmtList(errorRecoverySet | ErrorRecoverySet.RCurly, block.stmts, false, false,
                                      AllowedElements.Block, modifiers);
                        this.popStmt();
                        block.stmts.minChar = minChar;
                        block.stmts.limChar = this.scanner.pos;
                        block.minChar = block.stmts.minChar;
                        block.limChar = block.stmts.limChar;
                        this.chkCurTok(TokenID.RCurly, "Expected '}'", errorRecoverySet);
                        ast = block;
                        break;
                    }
                    case TokenID.SColon:
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifier can not appear here");
                        }
                        ast = new AST(NodeType.Empty);
                        this.tok = this.scanner.scan();
                        break;
                    case TokenID.BREAK:
                    case TokenID.CONTINUE: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifiers can not appear before jump statement");
                        }
                        var jump =
                            new Jump((this.tok.tokenId == TokenID.BREAK) ? NodeType.Break : NodeType.Continue);
                        this.tok = this.scanner.scan();
                        if ((this.tok.tokenId == TokenID.ID) && (!this.scanner.lastTokenHadNewline())) {
                            // Labeled break or continue.
                            jump.target = this.tok.getText();
                            this.tok = this.scanner.scan();
                        }
                        this.resolveJumpTarget(jump);
                        ast = jump;
                        needTerminator = true;
                        break;
                    }
                    case TokenID.RETURN: {
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifiers can not appear before return statement");
                        }
                        if (!this.inFnc) {
                            this.reportParseError("return statement outside of function body");
                        }
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var retStmt = new ReturnStatement();
                        retStmt.minChar = minChar;
                        if ((this.tok.tokenId != TokenID.SColon) &&
                            (this.tok.tokenId != TokenID.RCurly) &&
                            (!(this.scanner.lastTokenHadNewline()))) {
                            retStmt.returnExpression = this.parseExpr(errorRecoverySet |
                                                               ErrorRecoverySet.SColon,
                                                               OperatorPrecedence.No,
                                                               true, TypeContext.NoTypes);
                        }
                        needTerminator = true;
                        retStmt.limChar = this.scanner.lastTokenLimChar();
                        ast = retStmt;
                        break;
                    }
                    case TokenID.THROW:
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifiers can not appear before a throw statement");
                        }
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        if ((this.tok.tokenId != TokenID.SColon) &&
                            (this.tok.tokenId != TokenID.RCurly) &&
                            (!(this.scanner.lastTokenHadNewline()))) {
                            temp = this.parseExpr(errorRecoverySet | ErrorRecoverySet.SColon,
                                           OperatorPrecedence.No, true, TypeContext.NoTypes);
                        }
                        else {
                            this.reportParseError("throw with no target");
                            temp = null;
                        }
                        ast = new UnaryExpression(NodeType.Throw, temp);
                        ast.limChar = this.scanner.lastTokenLimChar();
                        needTerminator = true;
                        break;
                    case TokenID.ENUM:
                        // TODO: check module allowed here
                        //minChar=scanner.startPos;
                        this.tok = this.scanner.scan();
                        ast = this.parseEnumDecl(errorRecoverySet, modifiers);
                        ast.minChar = minChar;
                        ast.limChar = this.scanner.lastTokenLimChar();
                        if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Ambient)) {
                            (<ModuleDecl>ast).modFlags |= ModuleFlags.Ambient;
                        }
                        if (this.parsingDeclareFile || this.ambientModule || hasFlag(modifiers, Modifiers.Exported)) {
                            (<ModuleDecl>ast).modFlags |= ModuleFlags.Exported;
                        }
                        break;
                    case TokenID.DEBUGGER:
                        mayNotBeExported();
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifiers can not appear before debugger statement");
                        }
                        
                        minChar = this.scanner.startPos;
                        this.tok = this.scanner.scan();
                        var debuggerStmt = new DebuggerStatement();
                        debuggerStmt.minChar = minChar;
                        needTerminator = true;
                        debuggerStmt.limChar = this.scanner.lastTokenLimChar();
                        ast = debuggerStmt;
                        break;
                    default:
                        if (modifiers != Modifiers.None) {
                            this.reportParseError("modifiers can not appear before an expression statement or label");
                        }
                        minChar = this.scanner.startPos;
                        var svPos = this.scanner.pos;
                        temp = this.parseExpr(ErrorRecoverySet.Colon | ErrorRecoverySet.StmtStart |
                                       errorRecoverySet, OperatorPrecedence.No, true,
                                       TypeContext.NoTypes);
                        if (this.scanner.pos == svPos) {
                            // no progress
                            this.tok = this.scanner.scan();
                            ast = temp;
                        }
                        else if ((this.tok.tokenId == TokenID.Colon) && (!this.scanner.lastTokenHadNewline()) &&
                                        temp && (temp.nodeType == NodeType.Name)) {
                                            // It's a label
                            if (labelList == null) {
                                labelList = new ASTList();
                            }
                            labelList.append(new Label(<Identifier>temp));
                            this.tok = this.scanner.scan();
                        }
                        else {
                            // expression statement
                            ast = temp;
                            needTerminator = true;
                        }
                }
                if (ast) {
                    break;
                }
            }
            if (needTerminator) {
                switch (this.tok.tokenId) {
                    case TokenID.SColon:
                        this.tok = this.scanner.scan();
                        ast.flags |= ASTFlags.ExplicitSemicolon;
                        break;
                    case TokenID.EOF:
                        // Extend any incomplete statements to include EOF token. This makes sure that this node is in the path 
                        // when completion or parameter help is requested.
                        ast.limChar = this.scanner.pos;
                        // Intentional fallthrough
                    case TokenID.RCurly:
                        ast.flags |= ASTFlags.AutomaticSemicolon;
                        if (this.style_requireSemi) {
                            this.reportParseStyleError("no automatic semicolon");
                        }
                        break;
                    default:
                        if (!this.scanner.lastTokenHadNewline()) {
                            this.reportParseError("Expected ';'");
                        }
                        else {
                            ast.flags |= ASTFlags.AutomaticSemicolon;
                            if (this.style_requireSemi) {
                                this.reportParseStyleError("no automatic semicolon");
                            }
                        }
                        break;
                }
            }
            if (labelList) {
                ast = new LabeledStatement(labelList, ast);
            }

            ///////////////////////////////////////////////////////////
            //TODO: Eventually, we want to remove "minChar" and "limChar" assignments here,
            //      as they are sometimes not specific enough for each statement kind.
            ast.minChar = minChar;
            // Only update "limChar" if it is not better than "lastTokenLimChar()"
            ast.limChar = max(ast.limChar, this.scanner.lastTokenLimChar());
            //
            ///////////////////////////////////////////////////////////

            ast.preComments = preComments;
            if (this.ambientModule && (!this.okAmbientModuleMember(ast))) {
                this.reportParseError("statement not permitted within ambient module");
            }
            ast.flags |= ASTFlags.IsStatement;
            return ast;
        }

        public okAmbientModuleMember(ast: AST) {
            var nt = ast.nodeType;
            return (nt == NodeType.Class) || (nt == NodeType.Import) || (nt == NodeType.Interface) || (nt == NodeType.Module) ||
                (nt == NodeType.Empty) || (nt == NodeType.VarDecl) || 
                ((nt == NodeType.Block) && !(<Block>ast).isStatementBlock) ||
                ((nt == NodeType.FuncDecl) && ((<FuncDecl>ast).isMethod()));
        }

        public parseStmtList(errorRecoverySet: ErrorRecoverySet, stmts: ASTList, sourceElms: bool, noLeadingCase: bool,
            allowedElements: AllowedElements, parentModifiers: Modifiers): void {
            var directivePrologue = sourceElms;
            stmts.minChar = this.scanner.startPos;
            var limChar = this.scanner.pos;
            var innerStmts = (allowedElements & AllowedElements.ModuleDecls) == AllowedElements.None;
            var classNope = (allowedElements & AllowedElements.ClassDecls) == AllowedElements.None;

            errorRecoverySet |= ErrorRecoverySet.TypeScriptS | ErrorRecoverySet.RCurly;

            this.state = ParseState.StartStmtList;
            var oldStrictMode = this.strictMode;
            this.nestingLevel++;
            for (; ;) {
                if ((this.tok.tokenId == TokenID.RCurly) ||
                    (noLeadingCase && ((this.tok.tokenId == TokenID.CASE) || (this.tok.tokenId == TokenID.DEFAULT))) ||
                    (innerStmts && (this.tok.tokenId == TokenID.EXPORT)) ||
                    (classNope && (this.tok.tokenId == TokenID.CLASS)) ||
                    (this.tok.tokenId == TokenID.EOF)) {
                    this.state = ParseState.EndStmtList;
                    stmts.limChar = limChar;
                    if (stmts.members.length == 0) {
                        stmts.preComments = this.parseComments();
                    }
                    else {
                        stmts.postComments = this.parseComments();
                    }
                    this.strictMode = oldStrictMode;
                    this.nestingLevel--;
                    return;
                }

                var stmt = this.parseStatement(errorRecoverySet &
                                        (~(ErrorRecoverySet.Else | ErrorRecoverySet.RParen |
                                           ErrorRecoverySet.Catch | ErrorRecoverySet.Colon)),
                                        allowedElements, parentModifiers);


                if (stmt) {
                    stmt.postComments = this.combineComments(stmt.postComments, this.parseCommentsForLine(this.scanner.prevLine));
                    stmts.append(stmt);
                    limChar = stmt.limChar;
                    if (directivePrologue) {
                        if (stmt.nodeType == NodeType.QString) {
                            var qstring = <StringLiteral>stmt;
                            if (qstring.text == "\"use strict\"") {
                                stmts.flags |= ASTFlags.StrictMode;
                                this.strictMode = true;
                            }
                            else {
                                directivePrologue = false;
                            }
                        }
                        else {
                            directivePrologue = false;
                        }
                    }
                }
            }
        }

        public fname = "";

        public parseError = false;

        public quickParse(sourceText: ISourceText, filename: string, unitIndex: number): QuickParseResult {
            //TODO: REVIEW: We set this to avoid adding a "module" decl in the resulting script (see parse() method)
            var svGenTarget = TypeScript.moduleGenTarget;
            try {
                TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Local;
                var script = this.parse(sourceText, filename, unitIndex, AllowedElements.QuickParse);
                return new QuickParseResult(script, this.scanner.lexState);
            }
            finally {
                TypeScript.moduleGenTarget = svGenTarget;
            }
        }

        public parse(sourceText: ISourceText, filename: string, unitIndex: number, allowedElements = AllowedElements.Global): Script {
            this.ambientModule = false;
            this.topLevel = true;
            this.parseError = false;
            this.hasTopLevelImportOrExport = false;
            this.fname = filename;
            this.currentUnitIndex = unitIndex;
            this.amdDependencies = [];

            this.scanner.resetComments();
            this.scanner.setErrorHandler((message) =>this.reportParseError(message));
            this.scanner.setSourceText(sourceText, LexMode.File);

            var leftCurlyCount = this.scanner.leftCurlyCount;
            var rightCurlyCount = this.scanner.rightCurlyCount;

            var minChar = this.scanner.pos;
            this.tok = this.scanner.scan();
            this.pushDeclLists();
            var bod = new ASTList();
            bod.minChar = minChar;

            this.state = ParseState.StartScript;
            this.parsingDeclareFile = isDSTRFile(filename) || isDTSFile(filename);

            this.parseStmtList(ErrorRecoverySet.EOF | ErrorRecoverySet.Func,
                            bod, true, false, allowedElements, Modifiers.None);
            if (this.tok.tokenId != TokenID.EOF) {
                var badToken: TokenInfo = tokenTable[this.tok.tokenId];
                this.reportParseError("Unexpected statement block terminator '" + badToken.text + "'");
            }
            this.state = ParseState.EndScript;

            bod.limChar = this.scanner.pos;

            var topLevelMod: ModuleDecl = null;
            if (moduleGenTarget != ModuleGenTarget.Local && this.hasTopLevelImportOrExport) {
                var correctedFileName = switchToForwardSlashes(filename);
                var id: Identifier = new Identifier(correctedFileName);
                topLevelMod = new ModuleDecl(id, bod, this.topVarList(), this.topScopeList(), null);

                topLevelMod.modFlags |= ModuleFlags.IsDynamic;
                topLevelMod.modFlags |= ModuleFlags.IsWholeFile;
                topLevelMod.modFlags |= ModuleFlags.Exported;

                if (this.parsingDeclareFile) {
                    topLevelMod.modFlags |= ModuleFlags.Ambient;
                }

                topLevelMod.minChar = minChar;
                topLevelMod.limChar = this.scanner.pos;
                topLevelMod.prettyName = getPrettyName(correctedFileName);
                topLevelMod.containsUnicodeChar = this.scanner.seenUnicodeChar;
                topLevelMod.containsUnicodeCharInComment = this.scanner.seenUnicodeCharInComment;

                topLevelMod.amdDependencies = this.amdDependencies;

                bod = new ASTList();
                bod.minChar = topLevelMod.minChar;
                bod.limChar = topLevelMod.limChar;
                bod.append(topLevelMod);
            }

            var script = new Script(this.topVarList(), this.topScopeList());
            script.bod = bod;
            this.popDeclLists();
            script.minChar = minChar;
            script.limChar = this.scanner.pos;
            script.locationInfo = new LocationInfo(filename, this.scanner.lineMap, unitIndex);
            script.leftCurlyCount = this.scanner.leftCurlyCount - leftCurlyCount;
            script.rightCurlyCount = this.scanner.rightCurlyCount - rightCurlyCount;
            script.isDeclareFile = this.parsingDeclareFile;
            script.topLevelMod = topLevelMod;
            script.containsUnicodeChar = this.scanner.seenUnicodeChar;
            script.containsUnicodeCharInComment = this.scanner.seenUnicodeCharInComment;
            return script;
        }
    }

    export function quickParse(logger: TypeScript.ILogger, scopeStartAST: AST, sourceText: ISourceText, minChar: number, limChar: number,
        errorCapture: (minChar: number, charLen: number, message: string, unitIndex: number) => void ): QuickParseResult {

        var fragment = sourceText.getText(minChar, limChar);
        logger.log("Quick parse range (" + minChar + "," + limChar + "): \"" + TypeScript.stringToLiteral(fragment, 100) + "\"");

        var quickParser = new Parser();
        quickParser.setErrorRecovery(null, -1, -1);
        quickParser.errorCallback = errorCapture;

        // REVIEW: use enclosing scope to determine this
        // REVIEW: Why even use class here?
        var quickClassDecl = new TypeDecl(NodeType.Class, null, null, null, null, null);
        quickParser.currentClassDecl = quickClassDecl;

        var result = quickParser.quickParse(new StringSourceText(fragment), "", 0);
        return result;
    }
}
