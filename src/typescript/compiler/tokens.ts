// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export enum TokenID {
        ANY,
        BOOL,
        BREAK,
        CASE,
        CATCH,
        CLASS,
        CONST,
        CONTINUE,
        DEBUGGER,
        DEFAULT,
        DELETE,
        DO,
        ELSE,
        ENUM,
        EXPORT,
        EXTENDS,
        DECLARE,
        FALSE,
        FINALLY,
        FOR,
        FUNCTION,
        CONSTRUCTOR,
        GET,
        IF,
        IMPLEMENTS,
        IMPORT,
        IN,
        INSTANCEOF,
        INTERFACE,
        LET,
        MODULE,
        NEW,
        NUMBER,
        NULL,
        PACKAGE,
        PRIVATE,
        PROTECTED,
        PUBLIC,
        RETURN,
        SET,
        STATIC,
        STRING,
        SUPER,
        SWITCH,
        THIS,
        THROW,
        TRUE,
        TRY,
        TYPEOF,
        VAR,
        VOID,
        WITH,
        WHILE,
        YIELD,
        SColon,
        LParen,
        RParen,
        LBrack,
        RBrack,
        LCurly,
        RCurly,
        Comma,
        Asg,
        AsgAdd,
        AsgSub,
        AsgMul,
        AsgDiv,
        AsgMod,
        AsgAnd,
        AsgXor,
        AsgOr,
        AsgLsh,
        AsgRsh,
        AsgRs2,
        QMark,
        Colon,
        LogOr,
        LogAnd,
        Or,
        Xor,
        And,
        EQ,
        NE,
        Eqv,
        NEqv,
        LT,
        LE,
        GT,
        GE,
        Lsh,
        Rsh,
        Rs2,
        Add,
        Sub,
        Mult,
        Div,
        Pct,
        Tilde,
        Bang,
        Inc,
        Dec,
        Dot,
        Ellipsis,
        Error,
        EOF,
        Arrow,
        ID,
        QString,
        Regex,
        NumberLit,
        Whitespace,
        Comment,
        Lim,
        LimFixed = Arrow,
        LimKeyword = YIELD,
    }

    export var tokenTable = new TokenInfo[];
    export var nodeTypeTable = new string[];
    export var nodeTypeToTokTable = new number[];
    export var noRegexTable = new bool[];

    noRegexTable[TokenID.ID] = true;
    noRegexTable[TokenID.QString] = true;
    noRegexTable[TokenID.NumberLit] = true;
    noRegexTable[TokenID.Regex] = true;
    noRegexTable[TokenID.THIS] = true;
    noRegexTable[TokenID.Inc] = true;
    noRegexTable[TokenID.Dec] = true;
    noRegexTable[TokenID.RParen] = true;
    noRegexTable[TokenID.RBrack] = true;
    noRegexTable[TokenID.RCurly] = true;
    noRegexTable[TokenID.TRUE] = true;
    noRegexTable[TokenID.FALSE] = true;

    export enum OperatorPrecedence {
        No,
        Cma,
        Asg,
        Que,
        Lor,
        Lan,
        Bor,
        Xor,
        Ban,
        Equ,
        Cmp,
        Shf,
        Add,
        Mul,
        Uni,
        Lim
    }

    export enum Reservation {
        None = 0,
        Javascript = 1,
        JavascriptFuture = 2,
        TypeScript = 4,
        JavascriptFutureStrict = 8,
        TypeScriptAndJS = Javascript | TypeScript,
        TypeScriptAndJSFuture = JavascriptFuture | TypeScript,
        TypeScriptAndJSFutureStrict = JavascriptFutureStrict | TypeScript,
    }

    export class TokenInfo {
        constructor (public tokenId: TokenID, public reservation: Reservation,
                    public binopPrecedence: number, public binopNodeType: number,
                    public unopPrecedence: number, public unopNodeType: number,
                    public text: string, public ers: ErrorRecoverySet) { }
    }

    function setTokenInfo(tokenId: TokenID, reservation: number, binopPrecedence: number,
        binopNodeType: number, unopPrecedence: number, unopNodeType: number,
        text: string, ers: ErrorRecoverySet) {
        if (tokenId !== undefined) {
            tokenTable[tokenId] = new TokenInfo(tokenId, reservation, binopPrecedence,
                                              binopNodeType, unopPrecedence, unopNodeType, text, ers);
            if (binopNodeType != NodeType.None) {
                nodeTypeTable[binopNodeType] = text;
                nodeTypeToTokTable[binopNodeType] = tokenId;
            }
            if (unopNodeType != NodeType.None) {
                nodeTypeTable[unopNodeType] = text;
            }
        }
    }

    setTokenInfo(TokenID.ANY, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "any", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.BOOL, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "bool", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.BREAK, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "break", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.CASE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "case", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.CATCH, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "catch", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.CLASS, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "class", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.CONST, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "const", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.CONTINUE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "continue", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.DEBUGGER, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.Debugger, "debugger", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.DEFAULT, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "default", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.DELETE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.Delete, "delete", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.DO, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "do", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.ELSE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "else", ErrorRecoverySet.Else);
    setTokenInfo(TokenID.ENUM, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "enum", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.EXPORT, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "export", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.EXTENDS, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "extends", ErrorRecoverySet.None);
    setTokenInfo(TokenID.DECLARE, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "declare", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.FALSE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "false", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.FINALLY, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "finally", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.FOR, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "for", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.FUNCTION, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "function", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.CONSTRUCTOR, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "constructor", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.GET, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "get", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.SET, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "set", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.IF, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "if", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.IMPLEMENTS, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "implements", ErrorRecoverySet.None);
    setTokenInfo(TokenID.IMPORT, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "import", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.IN, Reservation.TypeScriptAndJS, OperatorPrecedence.Cmp, NodeType.In, OperatorPrecedence.No, NodeType.None, "in", ErrorRecoverySet.None);
    setTokenInfo(TokenID.INSTANCEOF, Reservation.TypeScriptAndJS, OperatorPrecedence.Cmp, NodeType.InstOf, OperatorPrecedence.No, NodeType.None, "instanceof", ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.INTERFACE, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "interface", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.LET, Reservation.JavascriptFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "let", ErrorRecoverySet.None);
    setTokenInfo(TokenID.MODULE, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "module", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.NEW, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "new", ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.NUMBER, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "number", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.NULL, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "null", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.PACKAGE, Reservation.JavascriptFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "package", ErrorRecoverySet.None);
    setTokenInfo(TokenID.PRIVATE, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "private", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.PROTECTED, Reservation.JavascriptFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "protected", ErrorRecoverySet.None);
    setTokenInfo(TokenID.PUBLIC, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "public", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.RETURN, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "return", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.STATIC, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "static", ErrorRecoverySet.None);
    setTokenInfo(TokenID.STRING, Reservation.TypeScript, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "string", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.SUPER, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "super", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.SWITCH, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "switch", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.THIS, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "this", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.THROW, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "throw", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.TRUE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "true", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.TRY, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "try", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.TYPEOF, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.Typeof, "typeof", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.VAR, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "var", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.VOID, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.Void, "void", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.WITH, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.With, "with", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.WHILE, Reservation.TypeScriptAndJS, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "while", ErrorRecoverySet.While);
    setTokenInfo(TokenID.YIELD, Reservation.JavascriptFutureStrict, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "yield", ErrorRecoverySet.None);

    setTokenInfo(TokenID.ID, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "identifier", ErrorRecoverySet.ID);
    setTokenInfo(TokenID.NumberLit, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "numberLiteral", ErrorRecoverySet.Literal);
    setTokenInfo(TokenID.Regex, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "regex", ErrorRecoverySet.RegExp);
    setTokenInfo(TokenID.QString, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "qstring", ErrorRecoverySet.Literal);

    // Non-operator non-identifier tokens
    setTokenInfo(TokenID.SColon, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, ";", ErrorRecoverySet.SColon); // ;
    setTokenInfo(TokenID.RParen, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, ")", ErrorRecoverySet.RParen); // )
    setTokenInfo(TokenID.RBrack, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "]", ErrorRecoverySet.RBrack); // ]
    setTokenInfo(TokenID.LCurly, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "{", ErrorRecoverySet.LCurly); // {
    setTokenInfo(TokenID.RCurly, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "}", ErrorRecoverySet.RCurly); // }
    setTokenInfo(TokenID.Ellipsis, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "...", ErrorRecoverySet.None); // ...

    // Operator non-identifier tokens
    setTokenInfo(TokenID.Comma, Reservation.None, OperatorPrecedence.Cma, NodeType.Comma, OperatorPrecedence.No, NodeType.None, ",", ErrorRecoverySet.Comma); // ,
    setTokenInfo(TokenID.Asg, Reservation.None, OperatorPrecedence.Asg, NodeType.Asg, OperatorPrecedence.No, NodeType.None, "=", ErrorRecoverySet.Asg); // =
    setTokenInfo(TokenID.AsgAdd, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgAdd, OperatorPrecedence.No, NodeType.None, "+=", ErrorRecoverySet.BinOp); // +=
    setTokenInfo(TokenID.AsgSub, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgSub, OperatorPrecedence.No, NodeType.None, "-=", ErrorRecoverySet.BinOp); // -=
    setTokenInfo(TokenID.AsgMul, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgMul, OperatorPrecedence.No, NodeType.None, "*=", ErrorRecoverySet.BinOp); // *=



    setTokenInfo(TokenID.AsgDiv, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgDiv, OperatorPrecedence.No, NodeType.None, "/=", ErrorRecoverySet.BinOp); // /=
    setTokenInfo(TokenID.AsgMod, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgMod, OperatorPrecedence.No, NodeType.None, "%=", ErrorRecoverySet.BinOp); // %=
    setTokenInfo(TokenID.AsgAnd, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgAnd, OperatorPrecedence.No, NodeType.None, "&=", ErrorRecoverySet.BinOp); // &=
    setTokenInfo(TokenID.AsgXor, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgXor, OperatorPrecedence.No, NodeType.None, "^=", ErrorRecoverySet.BinOp); // ^=
    setTokenInfo(TokenID.AsgOr, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgOr, OperatorPrecedence.No, NodeType.None, "|=", ErrorRecoverySet.BinOp); // |=
    setTokenInfo(TokenID.AsgLsh, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgLsh, OperatorPrecedence.No, NodeType.None, "<<=", ErrorRecoverySet.BinOp); // <<=
    setTokenInfo(TokenID.AsgRsh, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgRsh, OperatorPrecedence.No, NodeType.None, ">>=", ErrorRecoverySet.BinOp); // >>=
    setTokenInfo(TokenID.AsgRs2, Reservation.None, OperatorPrecedence.Asg, NodeType.AsgRs2, OperatorPrecedence.No, NodeType.None, ">>>=", ErrorRecoverySet.BinOp); // >>>=
    setTokenInfo(TokenID.QMark, Reservation.None, OperatorPrecedence.Que, NodeType.QMark, OperatorPrecedence.No, NodeType.None, "?", ErrorRecoverySet.BinOp); // ?
    setTokenInfo(TokenID.Colon, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, ":", ErrorRecoverySet.Colon); // :
    setTokenInfo(TokenID.LogOr, Reservation.None, OperatorPrecedence.Lor, NodeType.LogOr, OperatorPrecedence.No, NodeType.None, "||", ErrorRecoverySet.BinOp); // ||
    setTokenInfo(TokenID.LogAnd, Reservation.None, OperatorPrecedence.Lan, NodeType.LogAnd, OperatorPrecedence.No, NodeType.None, "&&", ErrorRecoverySet.BinOp); // &&
    setTokenInfo(TokenID.Or, Reservation.None, OperatorPrecedence.Bor, NodeType.Or, OperatorPrecedence.No, NodeType.None, "|", ErrorRecoverySet.BinOp); // |
    setTokenInfo(TokenID.Xor, Reservation.None, OperatorPrecedence.Xor, NodeType.Xor, OperatorPrecedence.No, NodeType.None, "^", ErrorRecoverySet.BinOp); // ^
    setTokenInfo(TokenID.And, Reservation.None, OperatorPrecedence.Ban, NodeType.And, OperatorPrecedence.No, NodeType.None, "&", ErrorRecoverySet.BinOp); // &
    setTokenInfo(TokenID.EQ, Reservation.None, OperatorPrecedence.Equ, NodeType.Eq, OperatorPrecedence.No, NodeType.None, "==", ErrorRecoverySet.BinOp); // ==
    setTokenInfo(TokenID.NE, Reservation.None, OperatorPrecedence.Equ, NodeType.Ne, OperatorPrecedence.No, NodeType.None, "!=", ErrorRecoverySet.BinOp); // !=
    setTokenInfo(TokenID.Eqv, Reservation.None, OperatorPrecedence.Equ, NodeType.Eqv, OperatorPrecedence.No, NodeType.None, "===", ErrorRecoverySet.BinOp); // ===
    setTokenInfo(TokenID.NEqv, Reservation.None, OperatorPrecedence.Equ, NodeType.NEqv, OperatorPrecedence.No, NodeType.None, "!==", ErrorRecoverySet.BinOp); // !==
    setTokenInfo(TokenID.LT, Reservation.None, OperatorPrecedence.Cmp, NodeType.Lt, OperatorPrecedence.No, NodeType.None, "<", ErrorRecoverySet.BinOp); // <
    setTokenInfo(TokenID.LE, Reservation.None, OperatorPrecedence.Cmp, NodeType.Le, OperatorPrecedence.No, NodeType.None, "<=", ErrorRecoverySet.BinOp); // <=
    setTokenInfo(TokenID.GT, Reservation.None, OperatorPrecedence.Cmp, NodeType.Gt, OperatorPrecedence.No, NodeType.None, ">", ErrorRecoverySet.BinOp); // >
    setTokenInfo(TokenID.GE, Reservation.None, OperatorPrecedence.Cmp, NodeType.Ge, OperatorPrecedence.No, NodeType.None, ">=", ErrorRecoverySet.BinOp); // >=
    setTokenInfo(TokenID.Lsh, Reservation.None, OperatorPrecedence.Shf, NodeType.Lsh, OperatorPrecedence.No, NodeType.None, "<<", ErrorRecoverySet.BinOp); // <<
    setTokenInfo(TokenID.Rsh, Reservation.None, OperatorPrecedence.Shf, NodeType.Rsh, OperatorPrecedence.No, NodeType.None, ">>", ErrorRecoverySet.BinOp); // >>
    setTokenInfo(TokenID.Rs2, Reservation.None, OperatorPrecedence.Shf, NodeType.Rs2, OperatorPrecedence.No, NodeType.None, ">>>", ErrorRecoverySet.BinOp); // >>>
    setTokenInfo(TokenID.Add, Reservation.None, OperatorPrecedence.Add, NodeType.Add, OperatorPrecedence.Uni, NodeType.Pos, "+", ErrorRecoverySet.AddOp); // +
    setTokenInfo(TokenID.Sub, Reservation.None, OperatorPrecedence.Add, NodeType.Sub, OperatorPrecedence.Uni, NodeType.Neg, "-", ErrorRecoverySet.AddOp); // -
    setTokenInfo(TokenID.Mult, Reservation.None, OperatorPrecedence.Mul, NodeType.Mul, OperatorPrecedence.No, NodeType.None, "*", ErrorRecoverySet.BinOp); // *
    setTokenInfo(TokenID.Div, Reservation.None, OperatorPrecedence.Mul, NodeType.Div, OperatorPrecedence.No, NodeType.None, "/", ErrorRecoverySet.BinOp); // /
    setTokenInfo(TokenID.Pct, Reservation.None, OperatorPrecedence.Mul, NodeType.Mod, OperatorPrecedence.No, NodeType.None, "%", ErrorRecoverySet.BinOp); // %
    setTokenInfo(TokenID.Tilde, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.Not, "~", ErrorRecoverySet.PreOp); // ~
    setTokenInfo(TokenID.Bang, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.LogNot, "!", ErrorRecoverySet.PreOp); // !
    setTokenInfo(TokenID.Inc, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.IncPre, "++", ErrorRecoverySet.PreOp); // ++
    setTokenInfo(TokenID.Dec, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.Uni, NodeType.DecPre, "--", ErrorRecoverySet.PreOp); // --
    setTokenInfo(TokenID.LParen, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "(", ErrorRecoverySet.LParen); // (
    setTokenInfo(TokenID.LBrack, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "[", ErrorRecoverySet.LBrack); // [
    setTokenInfo(TokenID.Dot, Reservation.None, OperatorPrecedence.Uni, NodeType.None, OperatorPrecedence.No, NodeType.None, ".", ErrorRecoverySet.Dot); // .
    setTokenInfo(TokenID.EOF, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "<EOF>", ErrorRecoverySet.EOF); // EOF
    setTokenInfo(TokenID.Arrow, Reservation.None, OperatorPrecedence.No, NodeType.None, OperatorPrecedence.No, NodeType.None, "=>", ErrorRecoverySet.None); // =>

    export function lookupToken(tokenId: TokenID): TokenInfo {
        return tokenTable[tokenId];
    }

    export enum TokenClass {
        Punctuation,
        Keyword,
        Operator,
        Comment,
        Whitespace,
        Identifier,
        Literal,
    }

    export class SavedToken {
        constructor (public tok: Token, public minChar: number, public limChar: number) { }
    }

    export class Token {
        constructor (public tokenId: TokenID) { }
        public toString() {
            return "token: " + this.tokenId + " " + this.getText() + " (" + (<any>TokenID)._map[this.tokenId] + ")";
        }

        public print(line: number, outfile) {
            outfile.WriteLine(this.toString() + ",on line" + line);
        }

        public getText(): string {
            return tokenTable[this.tokenId].text;
        }

        public classification(): TokenClass {
            if (this.tokenId <= TokenID.LimKeyword) {
                return TokenClass.Keyword;
            }
            else {
                var tokenInfo = lookupToken(this.tokenId);
                if (tokenInfo != undefined) {
                    if ((tokenInfo.unopNodeType != NodeType.None) ||
                        (tokenInfo.binopNodeType != NodeType.None)) {
                        return TokenClass.Operator;
                    }
                }
            }
            return TokenClass.Punctuation;
        }
    }

    export class NumberToken extends Token {
        constructor (public value: number) {
            super(TokenID.NumberLit);
        }
        public getText(): string {
            return this.value.toString();
        }
        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    export class StringToken extends Token {
        constructor (public value: string) {
            super(TokenID.QString);
        }
        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    export class IdentifierToken extends Token {
        constructor (public value: string, public hasEscapeSequence : bool) {
            super(TokenID.ID);
        }
        public getText(): string {
            return this.value;
        }
        public classification(): TokenClass {
            return TokenClass.Identifier;
        }
    }

    export class WhitespaceToken extends Token {
        public tokenId: TokenID;
        constructor (tokenId: TokenID, public value: string) {
            super(tokenId);
            this.tokenId = tokenId;
        }

        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Whitespace;
        }
    }

    export class CommentToken extends Token {
        public tokenID: TokenID;
        constructor (tokenID: TokenID, public value: string, public isBlock: bool, public startPos: number, public line: number, public endsLine: bool) {
            super(tokenID);
            this.tokenID = tokenID;
        }

        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Comment;
        }
    }

    export class RegexToken extends Token {
        constructor(public regex) {
            super(TokenID.Regex);
        }
        public getText(): string {
            return this.regex.toString();
        }

        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    // TODO: new with length TokenID.LimFixed
    export var staticTokens = new Token[];
    export function initializeStaticTokens() {
        for (var i = 0; i <= TokenID.LimFixed; i++) {
            staticTokens[i] = new Token(i);
        }
    }
}