// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript.AstWalkerWithDetailCallback {
    export interface AstWalkerDetailCallback {
        EmptyCallback? (pre, ast: AST): bool;
        EmptyExprCallback? (pre, ast: AST): bool;
        TrueCallback? (pre, ast: AST): bool;
        FalseCallback? (pre, ast: AST): bool;
        ThisCallback? (pre, ast: AST): bool;
        SuperCallback? (pre, ast: AST): bool;
        QStringCallback? (pre, ast: AST): bool;
        RegexCallback? (pre, ast: AST): bool;
        NullCallback? (pre, ast: AST): bool;
        ArrayLitCallback? (pre, ast: AST): bool;
        ObjectLitCallback? (pre, ast: AST): bool;
        VoidCallback? (pre, ast: AST): bool;
        CommaCallback? (pre, ast: AST): bool;
        PosCallback? (pre, ast: AST): bool;
        NegCallback? (pre, ast: AST): bool;
        DeleteCallback? (pre, ast: AST): bool;
        AwaitCallback? (pre, ast: AST): bool;
        InCallback? (pre, ast: AST): bool;
        DotCallback? (pre, ast: AST): bool;
        FromCallback? (pre, ast: AST): bool;
        IsCallback? (pre, ast: AST): bool;
        InstOfCallback? (pre, ast: AST): bool;
        TypeofCallback? (pre, ast: AST): bool;
        NumberLitCallback? (pre, ast: AST): bool;
        NameCallback? (pre, identifierAst: Identifier): bool;
        TypeRefCallback? (pre, ast: AST): bool;
        IndexCallback? (pre, ast: AST): bool;
        CallCallback? (pre, ast: AST): bool;
        NewCallback? (pre, ast: AST): bool;
        AsgCallback? (pre, ast: AST): bool;
        AsgAddCallback? (pre, ast: AST): bool;
        AsgSubCallback? (pre, ast: AST): bool;
        AsgDivCallback? (pre, ast: AST): bool;
        AsgMulCallback? (pre, ast: AST): bool;
        AsgModCallback? (pre, ast: AST): bool;
        AsgAndCallback? (pre, ast: AST): bool;
        AsgXorCallback? (pre, ast: AST): bool;
        AsgOrCallback? (pre, ast: AST): bool;
        AsgLshCallback? (pre, ast: AST): bool;
        AsgRshCallback? (pre, ast: AST): bool;
        AsgRs2Callback? (pre, ast: AST): bool;
        QMarkCallback? (pre, ast: AST): bool;
        LogOrCallback? (pre, ast: AST): bool;
        LogAndCallback? (pre, ast: AST): bool;
        OrCallback? (pre, ast: AST): bool;
        XorCallback? (pre, ast: AST): bool;
        AndCallback? (pre, ast: AST): bool;
        EqCallback? (pre, ast: AST): bool;
        NeCallback? (pre, ast: AST): bool;
        EqvCallback? (pre, ast: AST): bool;
        NEqvCallback? (pre, ast: AST): bool;
        LtCallback? (pre, ast: AST): bool;
        LeCallback? (pre, ast: AST): bool;
        GtCallback? (pre, ast: AST): bool;
        GeCallback? (pre, ast: AST): bool;
        AddCallback? (pre, ast: AST): bool;
        SubCallback? (pre, ast: AST): bool;
        MulCallback? (pre, ast: AST): bool;
        DivCallback? (pre, ast: AST): bool;
        ModCallback? (pre, ast: AST): bool;
        LshCallback? (pre, ast: AST): bool;
        RshCallback? (pre, ast: AST): bool;
        Rs2Callback? (pre, ast: AST): bool;
        NotCallback? (pre, ast: AST): bool;
        LogNotCallback? (pre, ast: AST): bool;
        IncPreCallback? (pre, ast: AST): bool;
        DecPreCallback? (pre, ast: AST): bool;
        IncPostCallback? (pre, ast: AST): bool;
        DecPostCallback? (pre, ast: AST): bool;
        TypeAssertionCallback? (pre, ast: AST): bool;
        FuncDeclCallback? (pre, funcDecl: FuncDecl): bool;
        MemberCallback? (pre, ast: AST): bool;
        VarDeclCallback? (pre, varDecl: VarDecl): bool;
        ArgDeclCallback? (pre, ast: AST): bool;
        ReturnCallback? (pre, ast: AST): bool;
        BreakCallback? (pre, ast: AST): bool;
        ContinueCallback? (pre, ast: AST): bool;
        ThrowCallback? (pre, ast: AST): bool;
        ForCallback? (pre, ast: AST): bool;
        ForInCallback? (pre, ast: AST): bool;
        IfCallback? (pre, ast: AST): bool;
        WhileCallback? (pre, ast: AST): bool;
        DoWhileCallback? (pre, ast: AST): bool;
        BlockCallback? (pre, block: Block): bool;
        CaseCallback? (pre, ast: AST): bool;
        SwitchCallback? (pre, ast: AST): bool;
        TryCallback? (pre, ast: AST): bool;
        TryCatchCallback? (pre, ast: AST): bool;
        TryFinallyCallback? (pre, ast: AST): bool;
        FinallyCallback? (pre, ast: AST): bool;
        CatchCallback? (pre, ast: AST): bool;
        ListCallback? (pre, astList: ASTList): bool;
        ScriptCallback? (pre, script: Script): bool;
        ClassCallback? (pre, ast: AST): bool;
        InterfaceCallback? (pre, interfaceDecl: TypeDecl): bool;
        ModuleCallback? (pre, moduleDecl: ModuleDecl): bool;
        ImportCallback? (pre, ast: AST): bool;
        WithCallback? (pre, ast: AST): bool;
        LabelCallback? (pre, labelAST: AST): bool;
        LabeledStatementCallback? (pre, ast: AST): bool;
        EBStartCallback? (pre, ast: AST): bool;
        GotoEBCallback? (pre, ast: AST): bool;
        EndCodeCallback? (pre, ast: AST): bool;
        ErrorCallback? (pre, ast: AST): bool;
        CommentCallback? (pre, ast: AST): bool;
        DebuggerCallback? (pre, ast: AST): bool;
        DefaultCallback? (pre, ast: AST): bool;
    }

    export function walk(script: Script, callback: AstWalkerDetailCallback): void {
        var pre = (cur: AST, parent: AST) => {
            walker.options.goChildren = AstWalkerCallback(true, cur, callback);
            return cur;
        }

        var post = (cur: AST, parent: AST) => {
            AstWalkerCallback(false, cur, callback);            return cur;
        }

        var walker = TypeScript.getAstWalkerFactory().getWalker(pre, post);
        walker.walk(script, null);
    }

    function AstWalkerCallback(pre: bool, ast: AST, callback: AstWalkerDetailCallback): bool {
        // See if the Callback needs to be handled using specific one or default one
        var nodeType = ast.nodeType;
        var callbackString = (<any>NodeType)._map[nodeType] + "Callback";
        if (callback[callbackString]) {
            return callback[callbackString](pre, ast);
        }

        if (callback.DefaultCallback) {
            return callback.DefaultCallback(pre, ast);
        }

        return true;
    }
}