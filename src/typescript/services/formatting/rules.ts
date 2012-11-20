// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class Rules {
        public getRuleName(rule: Rule) {
            var o = <any>this;
            for (var name in o) {
                if (o[name] === rule) {
                    return name;
                }
            }
            throw new Error("Unknown rule");
        }

        public IgnoreBeforeComment: Rule;
        public IgnoreAfterLineComment: Rule;

        // Space after keyword but not before ; or : or ?
        public NoSpaceBeforeSemicolon: Rule;
        public NoSpaceBeforeColon: Rule;
        public NoSpaceBeforeQMark: Rule;
        public SpaceAfterColon: Rule;
        public SpaceAfterQMark: Rule;
        public SpaceAfterSemicolon: Rule;

        // Space/new line after }.
        public NewLineAfterCloseCurly: Rule;
        public SpaceAfterCloseCurly: Rule;

        // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseCurly rule not applied
        public SpaceBetweenCloseCurlyAndElse: Rule;
        public SpaceBetweenCloseCurlyAndWhile: Rule;

        // No space for indexer and dot
        public NoSpaceBeforeDot: Rule;
        public NoSpaceAfterDot: Rule;
        public NoSpaceBeforeOpenBracket: Rule;
        public NoSpaceAfterOpenBracket    : Rule;
        public NoSpaceBeforeCloseBracket  : Rule;
        public NoSpaceAfterCloseBracket   : Rule;

        // Insert after { and before } a space in single-line contexts, but remove space from empty object literals {}.
        public SpaceAfterOpenCurly               : Rule;
        public SpaceBeforeCloseCurly             : Rule;
        public NoSpaceBetweenEmptyCurlyBrackets  : Rule;

        // Insert new line after { and before } in multi-line contexts.
        public NewLineAfterOpenCurlyInBlockContext: Rule;

        // For empty function/control body insert a space between curly brackets
        public SpaceBetweenCurlyBrackets: Rule;

        // For functions and control block place } on a new line    [multi-line rule]
        public NewLineBeforeCloseCurlyInFunctionOrControl: Rule;

        // Special handling of unary operators.
        // Prefix operators generally shouldn't have a space between
        // them and their target unary expression.
        public NoSpaceAfterUnaryPrefixOperator          : Rule;
        public NoSpaceAfterUnaryPreincrementOperator    : Rule;
        public NoSpaceAfterUnaryPredecrementOperator    : Rule;
        public NoSpaceBeforeUnaryPostincrementOperator  : Rule;
        public NoSpaceBeforeUnaryPostdecrementOperator  : Rule;

        // More unary operator special-casing.
        // DevDiv 181814:  Be careful when removing leading whitespace
        // around unary operators.  Examples:
        //      1 - -2  --X-->  1--2
        //      a + ++b --X-->  a+++b
        public SpaceAfterPostincrementWhenFollowedByAdd     : Rule;
        public SpaceAfterAddWhenFollowedByUnaryPlus         : Rule;
        public SpaceAfterAddWhenFollowedByPreincrement      : Rule;
        public SpaceAfterPostdecrementWhenFollowedBySubtract: Rule;
        public SpaceAfterSubtractWhenFollowedByUnaryMinus   : Rule;
        public SpaceAfterSubtractWhenFollowedByPredecrement : Rule;

        public NoSpaceBeforeComma: Rule;

        public SpaceAfterCertainKeywords        : Rule;
        public NoSpaceBeforeOpenParenInFuncCall : Rule;
        public SpaceAfterFunctionInFuncDecl     : Rule;
        public NoSpaceBeforeOpenParenInFuncDecl : Rule;

        // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
        // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
        public SpaceBetweenStatements: Rule;

        // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenCurlyInControl didn't execute on FormatOnEnter.
        public SpaceAfterTryFinally: Rule;

        // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
        // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
        //      get x() {}
        //      set x(val) {}
        public SpaceAfterGetSetInMember: Rule;

        // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
        public SpaceBeforeBinaryKeywordOperator: Rule;
        public SpaceAfterBinaryKeywordOperator: Rule;

        // These rules are higher in priority than user-configurable rules.
        public HighPriorityCommonRules: Rule[];

            // These rules are lower in priority than user-configurable rules.
        public LowPriorityCommonRules: Rule[];

        //#endregion

        //#region Rules controlled by user options

        // Insert space after comma delimiter
        public SpaceAfterComma: Rule;
        public NoSpaceAfterComma: Rule;

        // Insert space before and after binary operators
        public SpaceBeforeBinaryOperator: Rule;
        public SpaceAfterBinaryOperator: Rule;
        public NoSpaceBeforeBinaryOperator: Rule;
        public NoSpaceAfterBinaryOperator: Rule;

        // Insert space after keywords in control flow statements
        public SpaceAfterKeywordInControl   : Rule;
        public NoSpaceAfterKeywordInControl : Rule;

        // Open curly braces after function
        //TypeScript: Function can have return types, which can be made of tons of different token kinds
        public FunctionOpenCurlyLeftTokenRange: Shared.TokenRange;
        public FunctionOpenCurlyLeftTokenRange_Js: Shared.TokenRange;
        public SpaceBeforeOpenCurlyInFunction: Rule;
        public NewLineBeforeOpenCurlyInFunction: Rule;

        // Open curly braces after TypeScript module/class/interface
        public TypeScriptOpenCurlyLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenCurlyInTypeScriptDeclWithBlock: Rule;
        public NewLineBeforeOpenCurlyInTypeScriptDeclWithBlock: Rule;

        // Open curly braces after control block
        public ControlOpenCurlyLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenCurlyInControl: Rule;
        public NewLineBeforeOpenCurlyInControl: Rule;

        // Insert space after semicolon in for statement
        public SpaceAfterSemicolonInFor: Rule;
        public NoSpaceAfterSemicolonInFor: Rule;

        // Insert space after opening and before closing nonempty parenthesis
        public SpaceAfterOpenParen: Rule;
        public SpaceBeforeCloseParen: Rule;
        public NoSpaceBetweenParens: Rule;
        public NoSpaceAfterOpenParen: Rule;
        public NoSpaceBeforeCloseParen: Rule;

        // Insert space after function keyword for anonymous functions
        public SpaceAfterAnonymousFunctionKeyword: Rule;
        public NoSpaceAfterAnonymousFunctionKeyword: Rule;



        constructor() {
            //#region Common Rules

            // Leave comments alone
            this.IgnoreBeforeComment = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkComment), RuleOperation.create1(RuleAction.Ignore));
            this.IgnoreAfterLineComment = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkComment, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsFirstTokenLineCommentContext), RuleAction.Ignore));

            // Space after keyword but not before ; or : or ?
            this.NoSpaceBeforeSemicolon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkSColon), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotForContext), RuleAction.Delete));
            this.NoSpaceBeforeColon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkColon), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceBeforeQMark = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkQMark), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.SpaceAfterColon = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkColon, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Space));
            this.SpaceAfterQMark = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkQMark, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSemicolon = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkSColon, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // Space/new line after }.
            this.NewLineAfterCloseCurly = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkRCurly, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineChildParentContext), RuleAction.NewLine));
            this.SpaceAfterCloseCurly = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkRCurly, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineSiblingNodeContext), RuleAction.Space));

            // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseCurly rule not applied
            this.SpaceBetweenCloseCurlyAndElse = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkRCurly, AuthorTokenKind.atkElse), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.SpaceBetweenCloseCurlyAndWhile = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkRCurly, AuthorTokenKind.atkWhile), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // No space for indexer and dot
            this.NoSpaceBeforeDot = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkDot), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterDot = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkDot, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeOpenBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkLBrack), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenBracket = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkLBrack, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkRBrack), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterCloseBracket = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkRBrack, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Insert after { and before } a space in single-line contexts, but remove space from empty object literals {}.
            this.SpaceAfterOpenCurly = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkLCurly, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.SpaceBeforeCloseCurly = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkRCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.NoSpaceBetweenEmptyCurlyBrackets = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkLCurly, AuthorTokenKind.atkRCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsObjectContext), RuleAction.Delete));

            // Insert new line after { and before } in multi-line contexts.
            this.NewLineAfterOpenCurlyInBlockContext = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkLCurly, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // For empty function/control body insert a space between curly brackets
            this.SpaceBetweenCurlyBrackets = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkLCurly, AuthorTokenKind.atkRCurly), RuleOperation.create1(RuleAction.Space));

            // For functions and control block place } on a new line    [multi-line rule]
            this.NewLineBeforeCloseCurlyInFunctionOrControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkRCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // Special handling of unary operators.
            // Prefix operators generally shouldn't have a space between
            // them and their target unary expression.
            this.NoSpaceAfterUnaryPrefixOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.UnaryPrefixOperators, Shared.TokenRange.UnaryPrefixExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPreincrementOperator = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkInc, Shared.TokenRange.UnaryPreincrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPredecrementOperator = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkDec, Shared.TokenRange.UnaryPredecrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostincrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostincrementExpressions, AuthorTokenKind.atkInc), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostdecrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostdecrementExpressions, AuthorTokenKind.atkDec), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // More unary operator special-casing.
            // DevDiv 181814:  Be careful when removing leading whitespace
            // around unary operators.  Examples:
            //      1 - -2  --X-->  1--2
            //      a + ++b --X-->  a+++b
            this.SpaceAfterPostincrementWhenFollowedByAdd = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkInc, AuthorTokenKind.atkAdd), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByUnaryPlus = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkAdd, AuthorTokenKind.atkAdd), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByPreincrement = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkAdd, AuthorTokenKind.atkInc), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterPostdecrementWhenFollowedBySubtract = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkDec, AuthorTokenKind.atkSub), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByUnaryMinus = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkSub, AuthorTokenKind.atkSub), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByPredecrement = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkSub, AuthorTokenKind.atkDec), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            this.NoSpaceBeforeComma = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkComma), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            this.SpaceAfterCertainKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([AuthorTokenKind.atkVar, AuthorTokenKind.atkThrow, AuthorTokenKind.atkNew, AuthorTokenKind.atkDelete, AuthorTokenKind.atkReturn, AuthorTokenKind.atkVoid, AuthorTokenKind.atkTypeof]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncCall = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsFunctionCallOrNewContext), RuleAction.Delete));
            this.SpaceAfterFunctionInFuncDecl = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkFunction, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncDecl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsFunctionOrGetSetDeclContext), RuleAction.Delete));

            // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
            // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
            this.SpaceBetweenStatements = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([AuthorTokenKind.atkRParen, AuthorTokenKind.atkDo, AuthorTokenKind.atkElse, AuthorTokenKind.atkCase]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotForContext), RuleAction.Space));

            // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenCurlyInControl didn't execute on FormatOnEnter.
            this.SpaceAfterTryFinally = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([AuthorTokenKind.atkTry, AuthorTokenKind.atkFinally]), AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
            // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
            //      get x() {}
            //      set x(val) {}
            this.SpaceAfterGetSetInMember = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkIdentifier), RuleOperation.create2(new RuleOperationContext(Rules.IsGetSetMemberContext), RuleAction.Space));

            // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
            this.SpaceBeforeBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryKeywordOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryKeywordOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            // These rules are higher in priority than user-configurable rules.
            this.HighPriorityCommonRules =
            [
                this.IgnoreBeforeComment, this.IgnoreAfterLineComment,
                this.NoSpaceBeforeSemicolon, this.NoSpaceBeforeColon, this.SpaceAfterColon, this.NoSpaceBeforeQMark, this.SpaceAfterQMark, this.NewLineAfterCloseCurly,
                this.NoSpaceBeforeDot, this.NoSpaceAfterDot,
                this.NoSpaceAfterUnaryPrefixOperator,
                this.NoSpaceAfterUnaryPreincrementOperator, this.NoSpaceAfterUnaryPredecrementOperator,
                this.NoSpaceBeforeUnaryPostincrementOperator, this.NoSpaceBeforeUnaryPostdecrementOperator,
                this.SpaceAfterPostincrementWhenFollowedByAdd,
                this.SpaceAfterAddWhenFollowedByUnaryPlus, this.SpaceAfterAddWhenFollowedByPreincrement,
                this.SpaceAfterPostdecrementWhenFollowedBySubtract,
                this.SpaceAfterSubtractWhenFollowedByUnaryMinus, this.SpaceAfterSubtractWhenFollowedByPredecrement,
                this.SpaceAfterOpenCurly, this.SpaceBeforeCloseCurly, this.SpaceAfterCloseCurly, this.SpaceBetweenCloseCurlyAndElse, this.SpaceBetweenCloseCurlyAndWhile, this.NoSpaceBetweenEmptyCurlyBrackets,
                this.NewLineBeforeCloseCurlyInFunctionOrControl,
                this.SpaceBetweenCurlyBrackets,
                this.SpaceAfterFunctionInFuncDecl, this.NewLineAfterOpenCurlyInBlockContext, this.SpaceAfterGetSetInMember,
                this.SpaceAfterCertainKeywords,
                this.NoSpaceBeforeOpenParenInFuncCall,
                this.SpaceBeforeBinaryKeywordOperator, this.SpaceAfterBinaryKeywordOperator,
            ];

                // These rules are lower in priority than user-configurable rules.
            this.LowPriorityCommonRules =
            [
                this.NoSpaceBeforeComma,
                this.NoSpaceBeforeOpenBracket, this.NoSpaceAfterOpenBracket,
                this.NoSpaceBeforeCloseBracket, this.NoSpaceAfterCloseBracket,
                this.SpaceAfterSemicolon,
                this.NoSpaceBeforeOpenParenInFuncDecl,
                this.SpaceBetweenStatements, this.SpaceAfterTryFinally
            ];

            //#endregion

            //#region Rules controlled by user options

            // Insert space after comma delimiter
            this.SpaceAfterComma = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkComma, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceAfterComma = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkComma, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Insert space before and after binary operators
            this.SpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.NoSpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));

            // Insert space after keywords in control flow statements
            this.SpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Space));
            this.NoSpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Delete));

            // Open curly braces after function
            //TypeScript: Function can have return types, which can be made of tons of different token kinds
            this.FunctionOpenCurlyLeftTokenRange = Shared.TokenRange.Any;
            this.FunctionOpenCurlyLeftTokenRange_Js = Shared.TokenRange.FromTokens([AuthorTokenKind.atkRParen, AuthorTokenKind.atkComment]);
            this.SpaceBeforeOpenCurlyInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);
            this.NewLineBeforeOpenCurlyInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open curly braces after TypeScript module/class/interface
            this.TypeScriptOpenCurlyLeftTokenRange = Shared.TokenRange.FromTokens([AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkComment]);
            this.SpaceBeforeOpenCurlyInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);
            this.NewLineBeforeOpenCurlyInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open curly braces after control block
            this.ControlOpenCurlyLeftTokenRange = Shared.TokenRange.FromTokens([AuthorTokenKind.atkRParen, AuthorTokenKind.atkComment, AuthorTokenKind.atkDo, AuthorTokenKind.atkTry, AuthorTokenKind.atkFinally, AuthorTokenKind.atkElse]);
            this.SpaceBeforeOpenCurlyInControl = new Rule(RuleDescriptor.create2(this.ControlOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);
            this.NewLineBeforeOpenCurlyInControl = new Rule(RuleDescriptor.create2(this.ControlOpenCurlyLeftTokenRange, AuthorTokenKind.atkLCurly), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Insert space after semicolon in for statement
            this.SpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkSColon, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsForContext), RuleAction.Space));
            this.NoSpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkSColon, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsForContext), RuleAction.Delete));

            // Insert space after opening and before closing nonempty parenthesis
            this.SpaceAfterOpenParen = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkLParen, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkRParen), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBetweenParens = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkLParen, AuthorTokenKind.atkRParen), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenParen = new Rule(RuleDescriptor.create3(AuthorTokenKind.atkLParen, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, AuthorTokenKind.atkRParen), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Insert space after function keyword for anonymous functions
            this.SpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkFunction, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(AuthorTokenKind.atkFunction, AuthorTokenKind.atkLParen), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Delete));

            //#endregion
        }

        //#region Contexts

        static IsForContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFor;
        }

        static IsNotForContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkFor;
        }

        static IsBinaryOpContext(context: FormattingContext): bool {
            if (context.contextNode.AuthorNode.Details.ast != null) {
                switch (context.contextNode.AuthorNode.Details.ast.nodeType) {
                    case TypeScript.NodeType.Import:
                        return true;
                }
            }

            switch (context.contextNode.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkAdd:
                case AuthorParseNodeKind.apnkSub:
                case AuthorParseNodeKind.apnkMul:
                case AuthorParseNodeKind.apnkDiv:
                case AuthorParseNodeKind.apnkMod:
                case AuthorParseNodeKind.apnkOr:
                case AuthorParseNodeKind.apnkXor:
                case AuthorParseNodeKind.apnkAnd:
                case AuthorParseNodeKind.apnkEq:
                case AuthorParseNodeKind.apnkNe:
                case AuthorParseNodeKind.apnkLt:
                case AuthorParseNodeKind.apnkLe:
                case AuthorParseNodeKind.apnkGe:
                case AuthorParseNodeKind.apnkGt:

                case AuthorParseNodeKind.apnkAsg:
                case AuthorParseNodeKind.apnkInstOf:
                case AuthorParseNodeKind.apnkIn:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkEqv:
                case AuthorParseNodeKind.apnkNEqv:

                case AuthorParseNodeKind.apnkLogOr:
                case AuthorParseNodeKind.apnkLogAnd:
                case AuthorParseNodeKind.apnkLsh:
                case AuthorParseNodeKind.apnkRsh:
                case AuthorParseNodeKind.apnkRs2:

                case AuthorParseNodeKind.apnkQmark:
                case AuthorParseNodeKind.apnkAsgAdd:
                case AuthorParseNodeKind.apnkAsgSub:
                case AuthorParseNodeKind.apnkAsgMul:
                case AuthorParseNodeKind.apnkAsgDiv:
                case AuthorParseNodeKind.apnkAsgMod:
                case AuthorParseNodeKind.apnkAsgAnd:
                case AuthorParseNodeKind.apnkAsgXor:
                case AuthorParseNodeKind.apnkAsgOr:
                case AuthorParseNodeKind.apnkAsgLsh:
                case AuthorParseNodeKind.apnkAsgRsh:
                case AuthorParseNodeKind.apnkAsgRs2:
                    return true;

                case AuthorParseNodeKind.apnkVarDecl:
                    var varOrArgDecl = <TypeScript.BoundDecl>context.contextNode.AuthorNode.Details.ast;

                    // TypeScript: Special case for "?" tokens: We don't want to format them as 
                    //         as binary operators unless they are in the initialiation expression
                    var tokenSpan: Span = null;
                    if (context.tokenSpan.tokenID === TypeScript.TokenID.QMark)
                        tokenSpan = context.tokenSpan.Span.span;
                    else if (context.nextTokenSpan.tokenID === TypeScript.TokenID.QMark)
                        tokenSpan = context.nextTokenSpan.Span.span;

                    // TypeScript: Special case for ":" tokens: We don't want to format them as 
                    //         as binary operators if they are the "type" part of the VarDecl.
                    if (context.tokenSpan.tokenID === TypeScript.TokenID.Colon)
                        tokenSpan = context.tokenSpan.Span.span;
                    else if (context.nextTokenSpan.tokenID === TypeScript.TokenID.Colon)
                        tokenSpan = context.nextTokenSpan.Span.span;

                    if (tokenSpan != null) {
                        if (varOrArgDecl != null && (varOrArgDecl.nodeType === TypeScript.NodeType.VarDecl || varOrArgDecl.nodeType === TypeScript.NodeType.ArgDecl)) {
                            if (TypeScript.isValidAstNode(varOrArgDecl)) {
                                if (!TypeScript.isValidAstNode(varOrArgDecl.init)) {
                                    // If no init expression, the token is not part of the binary expression
                                    return false;
                                }

                                var initSpan = Span.FromBounds(varOrArgDecl.init.minChar, varOrArgDecl.init.limChar);
                                return initSpan.Contains(tokenSpan);
                            }
                        }
                    }
                    return true;

                default:
                    return false;
            }
        }

        static IsNotBinaryOpContext(context: FormattingContext): bool {
            return !IsBinaryOpContext(context);
        }

        static IsBlockContext(node: ParseNode): bool {
            if (IsTypeScriptDeclWithBlockContextNode(node))
                return true;

            switch (node.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkBlock:
                case AuthorParseNodeKind.apnkList:
                case AuthorParseNodeKind.apnkObject:

                case AuthorParseNodeKind.apnkFncDecl:

                case AuthorParseNodeKind.apnkFor:
                case AuthorParseNodeKind.apnkIf:
                case AuthorParseNodeKind.apnkWhile:
                case AuthorParseNodeKind.apnkDoWhile:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkWith:

                case AuthorParseNodeKind.apnkSwitch:

                case AuthorParseNodeKind.apnkTryCatch:
                case AuthorParseNodeKind.apnkCatch:
                case AuthorParseNodeKind.apnkTry:
                case AuthorParseNodeKind.apnkFinally:
                case AuthorParseNodeKind.apnkTryFinally:
                    return true;

                default:
                    return false;
            }
        }

        static IsTypeScriptDeclWithBlockContextNode(node: ParseNode): bool {
            switch (node.AuthorNode.Details.nodeType) {
                case TypeScript.NodeType.Module:
                case TypeScript.NodeType.Interface:
                case TypeScript.NodeType.Class:
                    return true;

                default:
                    return false;
            }
        }

        static IsSingleLineBlockContext(context: FormattingContext): bool {
            if (!IsBlockContext(context.contextNode))
                return false;

            return context.ContextNodeAllOnSameLine();
        }

        static IsMultilineBlockContext(context: FormattingContext): bool {
            if (!IsBlockContext(context.contextNode))
                return false;

            return !context.ContextNodeAllOnSameLine();
        }

        static IsFunctionDeclContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl;
        }

        static IsTypeScriptDeclWithBlockContext(context: FormattingContext): bool {
            return IsTypeScriptDeclWithBlockContextNode(context.contextNode);
        }

        static IsControlDeclContext(context: FormattingContext): bool {
            switch (context.contextNode.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkFor:
                case AuthorParseNodeKind.apnkIf:
                case AuthorParseNodeKind.apnkWhile:
                case AuthorParseNodeKind.apnkDoWhile:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkWith:

                case AuthorParseNodeKind.apnkSwitch:

                case AuthorParseNodeKind.apnkTryCatch:
                case AuthorParseNodeKind.apnkCatch:
                case AuthorParseNodeKind.apnkTry:
                case AuthorParseNodeKind.apnkFinally:
                case AuthorParseNodeKind.apnkTryFinally:
                    return true;

                default:
                    return false;
            }
        }

        static  IsObjectContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkObject;
        }

        static IsFunctionCallContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkCall;
        }

        static IsNewContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkNew;
        }

        static IsFunctionCallOrNewContext(context: FormattingContext): bool {
            return IsFunctionCallContext(context) || IsNewContext(context);
        }

        static IsSameLineTokenContext(context: FormattingContext): bool {
            return context.TokensAreOnSameLine();
        }

        static IsSameLineSiblingNodeContext(context: FormattingContext): bool {
            return context.TokensAreSiblingNodesOnSameLine();
        }

        static IsMultilineChildParentContext(context: FormattingContext): bool {
            var parent = context.contextNode.Parent;

            if (parent == null)
                return false;

            return parent.AuthorNode.Details.EndOffset == context.nextTokenSpan.Span.startPosition() && IsMultilineBlockContext(context);
        }

        static IsNotFormatOnEnter(context: FormattingContext): bool {
            return context.formattingRequestKind != FormattingRequestKind.FormatOnEnter;
        }

        static IsSameLineTokenOrMultilineBlockContext(context: FormattingContext): bool {
            //// This check is mainly used inside SpaceBeforeOpenCurlyInControl and SpaceBeforeOpenCurlyInFunction.
            ////
            //// Ex: 
            //// if (1)     { ....
            ////      * ) and { are on the same line so apply the rule. Here we don't care whether it's same or multi block context
            ////
            //// Ex: 
            //// if (1)
            //// { ... }
            ////      * ) and { are on differnet lines. We only need to format if the block is multiline context. So in this case we don't format.
            ////
            //// Ex:
            //// if (1) 
            //// { ...
            //// }
            ////      * ) and { are on differnet lines. We only need to format if the block is multiline context. So in this case we format.

            return context.TokensAreOnSameLine() || IsMultilineBlockContext(context);
        }

        static IsFunctionOrGetSetDeclContext(context: FormattingContext): bool {
            return IsFunctionDeclContext(context) || IsGetSetMemberContext(context);
        }

        static IsGetSetMemberContext(context: FormattingContext): bool {
            return context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkGetMember ||
                context.contextNode.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkSetMember;
        }

        static IsFirstTokenLineCommentContext(context: FormattingContext): bool {
            var token = context.tokenSpan;
            var twoCharSpan = token.Span.Intersection(new Span(token.Span.startPosition(), 2));
            return twoCharSpan != null && twoCharSpan.GetText() == "//";
        }

        //#endregion
    }
}
