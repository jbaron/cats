// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: Services.FormatCodeOptions;
        private activeRules: List_Rule;
        private rulesMap: RulesMap;

        constructor(private logger: TypeScript.ILogger) {
            this.globalRules = new Rules();
        }

        public getRuleName(rule: Rule): string {
            return this.globalRules.getRuleName(rule);
        }

        public getRuleByName(name: string): Rule {
            return this.globalRules[name];
        }

        public setActiveRules(staticList: List_Rule) {
            this.activeRules = staticList;
            this.rulesMap = RulesMap.create(this.activeRules);
        }

        public getActiveRules() {
            return this.activeRules;
        }

        public getRulesMap() {
            return this.rulesMap;
        }

        public ensureUptodate(options: Services.FormatCodeOptions) {
            if (this.options == null || !Services.compareDataObjects(this.options, options)) {
                var activeRules: List_Rule = TypeScript.timeFunction(this.logger, "RulesProvider: createActiveRules()", () => { return this.createActiveRules(options); });
                var rulesMap: RulesMap = TypeScript.timeFunction(this.logger, "RulesProvider: RulesMap.create()", () => { return RulesMap.create(activeRules); });

                this.activeRules = activeRules;
                this.rulesMap = rulesMap;
                this.options = options;
            }
        }

        private createActiveRules(options: Services.FormatCodeOptions): List_Rule {
            var rules = new List_Rule()

            rules.AddRange(this.globalRules.HighPriorityCommonRules);

            if (options.InsertSpaceAfterCommaDelimiter) {
                rules.Add(this.globalRules.SpaceAfterComma);
            }
            else {
                rules.Add(this.globalRules.NoSpaceAfterComma);
            }

            if (options.InsertSpaceAfterFunctionKeywordForAnonymousFunctions) {
                rules.Add(this.globalRules.SpaceAfterAnonymousFunctionKeyword);
            }
            else {
                rules.Add(this.globalRules.NoSpaceAfterAnonymousFunctionKeyword);
            }

            if (options.InsertSpaceAfterKeywordsInControlFlowStatements) {
                rules.Add(this.globalRules.SpaceAfterKeywordInControl);
            }
            else {
                rules.Add(this.globalRules.NoSpaceAfterKeywordInControl);
            }

            if (options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis) {
                rules.Add(this.globalRules.SpaceAfterOpenParen);
                rules.Add(this.globalRules.SpaceBeforeCloseParen);
                rules.Add(this.globalRules.NoSpaceBetweenParens);
            }
            else {
                rules.Add(this.globalRules.NoSpaceAfterOpenParen);
                rules.Add(this.globalRules.NoSpaceBeforeCloseParen);
                rules.Add(this.globalRules.NoSpaceBetweenParens);
            }

            if (options.InsertSpaceAfterSemicolonInForStatements) {
                rules.Add(this.globalRules.SpaceAfterSemicolonInFor);
            }
            else {
                rules.Add(this.globalRules.NoSpaceAfterSemicolonInFor);
            }

            if (options.InsertSpaceBeforeAndAfterBinaryOperators) {
                rules.Add(this.globalRules.SpaceBeforeBinaryOperator);
                rules.Add(this.globalRules.SpaceAfterBinaryOperator);
            }
            else {
                rules.Add(this.globalRules.NoSpaceBeforeBinaryOperator);
                rules.Add(this.globalRules.NoSpaceAfterBinaryOperator);
            }

            if (options.PlaceOpenBraceOnNewLineForControlBlocks) {
                rules.Add(this.globalRules.NewLineBeforeOpenCurlyInControl);
            }
            else {
                rules.Add(this.globalRules.SpaceBeforeOpenCurlyInControl);
            }

            if (options.PlaceOpenBraceOnNewLineForFunctions) {
                rules.Add(this.globalRules.NewLineBeforeOpenCurlyInFunction);
                rules.Add(this.globalRules.NewLineBeforeOpenCurlyInTypeScriptDeclWithBlock);
            }
            else {
                rules.Add(this.globalRules.SpaceBeforeOpenCurlyInFunction);
                rules.Add(this.globalRules.SpaceBeforeOpenCurlyInTypeScriptDeclWithBlock);
            }

            rules.AddRange(this.globalRules.LowPriorityCommonRules);

            return rules;
        }
    }
}