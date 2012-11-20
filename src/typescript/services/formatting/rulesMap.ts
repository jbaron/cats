// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />



//module EditorAbstractions {
module Formatting {
    export class RulesMap {
        public map: RulesBucket[];
        public mapRowLength: number;

        constructor() {
            this.map = [];
            this.mapRowLength = 0;
        }

        static create(rules: List_Rule): RulesMap {
            var result = new RulesMap();
            result.Initialize(rules);
            return result;
        }

        public Initialize(rules: List_Rule) {
            this.mapRowLength = AuthorTokenKind.Length;
            this.map = new Array(this.mapRowLength * this.mapRowLength);

            // This array is used only during construction of the rulesbucket in the map
            var rulesBucketConstructionStateList: RulesBucketConstructionState[] = new Array(this.map.length);

            this.FillRules(rules, rulesBucketConstructionStateList);
            return this.map;
        }

        public FillRules(rules: List_Rule, rulesBucketConstructionStateList: RulesBucketConstructionState[]): void
        {
            rules.foreach((rule) => {
                this.FillRule(rule, rulesBucketConstructionStateList);
            });
        }

        private GetRuleBucketIndex(row: number, column: number): number {
            var rulesBucketIndex = (row * this.mapRowLength) + column;
            //Debug.Assert(rulesBucketIndex < this.map.Length, "Trying to access an index outside the array.");
            return rulesBucketIndex;
        }

        private FillRule(rule: Rule, rulesBucketConstructionStateList: RulesBucketConstructionState[]): void
        {
            var specificRule = rule.Descriptor.LeftTokenRange != Shared.TokenRange.Any &&
                               rule.Descriptor.RightTokenRange != Shared.TokenRange.Any;

            rule.Descriptor.LeftTokenRange.GetTokens().foreach((left) => {
                rule.Descriptor.RightTokenRange.GetTokens().foreach((right) => {
                    var rulesBucketIndex = this.GetRuleBucketIndex(left, right);

                    var rulesBucket = this.map[rulesBucketIndex];
                    if (rulesBucket == undefined) {
                        rulesBucket = this.map[rulesBucketIndex] = new RulesBucket();
                    }

                    rulesBucket.AddRule(rule, specificRule, rulesBucketConstructionStateList, rulesBucketIndex);
                })
            })
        }

        public  GetRule(context: FormattingContext): Rule {
            var bucketIndex = this.GetRuleBucketIndex(context.tokenSpan.Token, context.nextTokenSpan.Token);
            var bucket = this.map[bucketIndex];
            if (bucket != null) {
                for (var i = 0, len = bucket.Rules().count() ; i < len; i++) {
                    var rule = bucket.Rules().get(i);
                    if (rule.Operation.Context.InContext(context))
                        return rule;
                }
            }
            return null;
        }
    }

    var MaskBitSize = 5;
    var Mask = 0x1f;

    export enum Position {
        IgnoreRulesSpecific = 0,
        IgnoreRulesAny = MaskBitSize * 1,
        ContextRulesSpecific = MaskBitSize * 2,
        ContextRulesAny = MaskBitSize * 3,
        NoContextRulesSpecific = MaskBitSize * 4,
        NoContextRulesAny = MaskBitSize * 5
    }

    export class RulesBucketConstructionState {
        private rulesInsertionIndexBitmap: number;

        constructor() {
            //// The Rules list contains all the inserted rules into a rulebucket in the following order:
            ////    1- Ignore rules with specific token combination
            ////    2- Ignore rules with any token combination
            ////    3- Context rules with specific token combination
            ////    4- Context rules with any token combination
            ////    5- Non-context rules with specific token combination
            ////    6- Non-context rules with any token combination
            //// 
            //// The member rulesInsertionIndexBitmap is used to describe the number of rules
            //// in each sub-bucket (above) hence can be used to know the index of where to insert 
            //// the next rule. It's a bitmap which contains 6 different sections each is given 5 bits.
            ////
            //// Example:
            //// In order to insert a rule to the end of sub-bucket (3), we get the index by adding
            //// the values in the bitmap segments 3rd, 2nd, and 1st.
            this.rulesInsertionIndexBitmap = 0;
        }

        public GetInsertionIndex(maskPosition: Position): number {
            var index = 0;

            var pos = 0;
            var indexBitmap = this.rulesInsertionIndexBitmap;

            while (pos <= maskPosition) {
                index += (indexBitmap & Mask);
                indexBitmap >>= MaskBitSize;
                pos += MaskBitSize;
            }

            return index;
        }

        public IncreaseInsertionIndex(maskPosition: Position): void
        {
            var value = (this.rulesInsertionIndexBitmap >> maskPosition) & Mask;
            value++;
            Debug.Assert((value & Mask) == value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");

            var temp = this.rulesInsertionIndexBitmap & ~(Mask << maskPosition);
            temp |= value << maskPosition;

            this.rulesInsertionIndexBitmap = temp;
        }
    }

    export class RulesBucket {
        private rules: List_Rule;

        constructor() {
            this.rules = new List_Rule();
        }

        public Rules(): List_Rule {
            return this.rules;
        }

        public AddRule(rule: Rule, specificTokens: bool, constructionState: RulesBucketConstructionState[], rulesBucketIndex: number): void {
            var position: Position;

            if (rule.Operation.Action == RuleAction.Ignore) {
                position = specificTokens ?
                    Position.IgnoreRulesSpecific :
                    Position.IgnoreRulesAny;
            }
            else if (!rule.Operation.Context.IsAny()) {
                position = specificTokens ?
                    Position.ContextRulesSpecific :
                    Position.ContextRulesAny;
            }
            else {
                position = specificTokens ?
                    Position.NoContextRulesSpecific :
                    Position.NoContextRulesAny;
            }

            var state = constructionState[rulesBucketIndex];
            if (state === undefined) {
                state = constructionState[rulesBucketIndex] = new RulesBucketConstructionState();
            }
            var index = state.GetInsertionIndex(position);
            this.rules.insert(index, rule);
            state.IncreaseInsertionIndex(position);
        }
    }
}
