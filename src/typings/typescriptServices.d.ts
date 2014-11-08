declare module ts {
    interface TextRange {
        pos: number;
        end: number;
    }
    const enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        NumericLiteral = 6,
        StringLiteral = 7,
        RegularExpressionLiteral = 8,
        NoSubstitutionTemplateLiteral = 9,
        TemplateHead = 10,
        TemplateMiddle = 11,
        TemplateTail = 12,
        OpenBraceToken = 13,
        CloseBraceToken = 14,
        OpenParenToken = 15,
        CloseParenToken = 16,
        OpenBracketToken = 17,
        CloseBracketToken = 18,
        DotToken = 19,
        DotDotDotToken = 20,
        SemicolonToken = 21,
        CommaToken = 22,
        LessThanToken = 23,
        GreaterThanToken = 24,
        LessThanEqualsToken = 25,
        GreaterThanEqualsToken = 26,
        EqualsEqualsToken = 27,
        ExclamationEqualsToken = 28,
        EqualsEqualsEqualsToken = 29,
        ExclamationEqualsEqualsToken = 30,
        EqualsGreaterThanToken = 31,
        PlusToken = 32,
        MinusToken = 33,
        AsteriskToken = 34,
        SlashToken = 35,
        PercentToken = 36,
        PlusPlusToken = 37,
        MinusMinusToken = 38,
        LessThanLessThanToken = 39,
        GreaterThanGreaterThanToken = 40,
        GreaterThanGreaterThanGreaterThanToken = 41,
        AmpersandToken = 42,
        BarToken = 43,
        CaretToken = 44,
        ExclamationToken = 45,
        TildeToken = 46,
        AmpersandAmpersandToken = 47,
        BarBarToken = 48,
        QuestionToken = 49,
        ColonToken = 50,
        EqualsToken = 51,
        PlusEqualsToken = 52,
        MinusEqualsToken = 53,
        AsteriskEqualsToken = 54,
        SlashEqualsToken = 55,
        PercentEqualsToken = 56,
        LessThanLessThanEqualsToken = 57,
        GreaterThanGreaterThanEqualsToken = 58,
        GreaterThanGreaterThanGreaterThanEqualsToken = 59,
        AmpersandEqualsToken = 60,
        BarEqualsToken = 61,
        CaretEqualsToken = 62,
        Identifier = 63,
        BreakKeyword = 64,
        CaseKeyword = 65,
        CatchKeyword = 66,
        ClassKeyword = 67,
        ConstKeyword = 68,
        ContinueKeyword = 69,
        DebuggerKeyword = 70,
        DefaultKeyword = 71,
        DeleteKeyword = 72,
        DoKeyword = 73,
        ElseKeyword = 74,
        EnumKeyword = 75,
        ExportKeyword = 76,
        ExtendsKeyword = 77,
        FalseKeyword = 78,
        FinallyKeyword = 79,
        ForKeyword = 80,
        FunctionKeyword = 81,
        IfKeyword = 82,
        ImportKeyword = 83,
        InKeyword = 84,
        InstanceOfKeyword = 85,
        NewKeyword = 86,
        NullKeyword = 87,
        ReturnKeyword = 88,
        SuperKeyword = 89,
        SwitchKeyword = 90,
        ThisKeyword = 91,
        ThrowKeyword = 92,
        TrueKeyword = 93,
        TryKeyword = 94,
        TypeOfKeyword = 95,
        VarKeyword = 96,
        VoidKeyword = 97,
        WhileKeyword = 98,
        WithKeyword = 99,
        ImplementsKeyword = 100,
        InterfaceKeyword = 101,
        LetKeyword = 102,
        PackageKeyword = 103,
        PrivateKeyword = 104,
        ProtectedKeyword = 105,
        PublicKeyword = 106,
        StaticKeyword = 107,
        YieldKeyword = 108,
        AnyKeyword = 109,
        BooleanKeyword = 110,
        ConstructorKeyword = 111,
        DeclareKeyword = 112,
        GetKeyword = 113,
        ModuleKeyword = 114,
        RequireKeyword = 115,
        NumberKeyword = 116,
        SetKeyword = 117,
        StringKeyword = 118,
        TypeKeyword = 119,
        Missing = 120,
        QualifiedName = 121,
        TypeParameter = 122,
        Parameter = 123,
        Property = 124,
        Method = 125,
        Constructor = 126,
        GetAccessor = 127,
        SetAccessor = 128,
        CallSignature = 129,
        ConstructSignature = 130,
        IndexSignature = 131,
        TypeReference = 132,
        TypeQuery = 133,
        TypeLiteral = 134,
        ArrayType = 135,
        TupleType = 136,
        UnionType = 137,
        ParenType = 138,
        ArrayLiteral = 139,
        ObjectLiteral = 140,
        PropertyAssignment = 141,
        PropertyAccess = 142,
        IndexedAccess = 143,
        CallExpression = 144,
        NewExpression = 145,
        TaggedTemplateExpression = 146,
        TypeAssertion = 147,
        ParenExpression = 148,
        FunctionExpression = 149,
        ArrowFunction = 150,
        PrefixOperator = 151,
        PostfixOperator = 152,
        BinaryExpression = 153,
        ConditionalExpression = 154,
        TemplateExpression = 155,
        TemplateSpan = 156,
        OmittedExpression = 157,
        Block = 158,
        VariableStatement = 159,
        EmptyStatement = 160,
        ExpressionStatement = 161,
        IfStatement = 162,
        DoStatement = 163,
        WhileStatement = 164,
        ForStatement = 165,
        ForInStatement = 166,
        ContinueStatement = 167,
        BreakStatement = 168,
        ReturnStatement = 169,
        WithStatement = 170,
        SwitchStatement = 171,
        CaseClause = 172,
        DefaultClause = 173,
        LabeledStatement = 174,
        ThrowStatement = 175,
        TryStatement = 176,
        TryBlock = 177,
        CatchBlock = 178,
        FinallyBlock = 179,
        DebuggerStatement = 180,
        VariableDeclaration = 181,
        FunctionDeclaration = 182,
        FunctionBlock = 183,
        ClassDeclaration = 184,
        InterfaceDeclaration = 185,
        TypeAliasDeclaration = 186,
        EnumDeclaration = 187,
        ModuleDeclaration = 188,
        ModuleBlock = 189,
        ImportDeclaration = 190,
        ExportAssignment = 191,
        EnumMember = 192,
        SourceFile = 193,
        Program = 194,
        SyntaxList = 195,
        Count = 196,
        FirstAssignment = 51,
        LastAssignment = 62,
        FirstReservedWord = 64,
        LastReservedWord = 99,
        FirstKeyword = 64,
        LastKeyword = 119,
        FirstFutureReservedWord = 100,
        LastFutureReservedWord = 108,
        FirstTypeNode = 132,
        LastTypeNode = 138,
        FirstPunctuation = 13,
        LastPunctuation = 62,
        FirstToken = 1,
        LastToken = 119,
        FirstTriviaToken = 2,
        LastTriviaToken = 5,
        FirstLiteralToken = 6,
        LastLiteralToken = 9,
        FirstTemplateToken = 9,
        LastTemplateToken = 12,
    }
    const enum NodeFlags {
        Export = 1,
        Ambient = 2,
        QuestionMark = 4,
        Rest = 8,
        Public = 16,
        Private = 32,
        Protected = 64,
        Static = 128,
        MultiLine = 256,
        Synthetic = 512,
        DeclarationFile = 1024,
        Let = 2048,
        Const = 4096,
        Modifier = 243,
        AccessibilityModifier = 112,
        BlockScoped = 6144,
    }
    interface Node extends TextRange {
        kind: SyntaxKind;
        flags: NodeFlags;
        id?: number;
        parent?: Node;
        symbol?: Symbol;
        locals?: SymbolTable;
        nextContainer?: Node;
        localSymbol?: Symbol;
    }
    interface NodeArray<T> extends Array<T>, TextRange {
        hasTrailingComma?: boolean;
    }
    interface Identifier extends Node {
        text: string;
    }
    interface QualifiedName extends Node {
        left: Identifier | QualifiedName;
        right: Identifier;
    }
    type EntityName = Identifier | QualifiedName;
    interface ParsedSignature {
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ParameterDeclaration>;
        type?: TypeNode;
    }
    type DeclarationName = Identifier | LiteralExpression | ComputedPropertyName;
    interface Declaration extends Node {
        name?: Identifier | LiteralExpression | ComputedPropertyName;
    }
    interface ComputedPropertyName extends Node {
        expression: Expression;
    }
    interface TypeParameterDeclaration extends Declaration {
        name: Identifier;
        constraint?: TypeNode;
    }
    interface SignatureDeclaration extends Declaration, ParsedSignature {
    }
    interface VariableDeclaration extends Declaration {
        name: Identifier;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface PropertyDeclaration extends Declaration {
        type?: TypeNode;
        initializer?: Expression;
    }
    interface ParameterDeclaration extends VariableDeclaration {
    }
    interface FunctionLikeDeclaration extends Declaration, ParsedSignature {
        body?: Expression | Block;
    }
    interface FunctionDeclaration extends FunctionLikeDeclaration {
        name: Identifier;
        body?: Block;
    }
    interface MethodDeclaration extends FunctionLikeDeclaration {
        body?: Block;
    }
    interface ConstructorDeclaration extends FunctionLikeDeclaration {
        body?: Block;
    }
    interface AccessorDeclaration extends FunctionLikeDeclaration {
        body?: Block;
    }
    interface TypeNode extends Node {
    }
    interface TypeReferenceNode extends TypeNode {
        typeName: Identifier | QualifiedName;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface TypeQueryNode extends TypeNode {
        exprName: Identifier | QualifiedName;
    }
    interface TypeLiteralNode extends TypeNode {
        members: NodeArray<Node>;
    }
    interface ArrayTypeNode extends TypeNode {
        elementType: TypeNode;
    }
    interface TupleTypeNode extends TypeNode {
        elementTypes: NodeArray<TypeNode>;
    }
    interface UnionTypeNode extends TypeNode {
        types: NodeArray<TypeNode>;
    }
    interface ParenTypeNode extends TypeNode {
        type: TypeNode;
    }
    interface StringLiteralTypeNode extends TypeNode {
        text: string;
    }
    interface Expression extends Node {
        contextualType?: Type;
    }
    interface UnaryExpression extends Expression {
        operator: SyntaxKind;
        operand: Expression;
    }
    interface BinaryExpression extends Expression {
        left: Expression;
        operator: SyntaxKind;
        right: Expression;
    }
    interface ConditionalExpression extends Expression {
        condition: Expression;
        whenTrue: Expression;
        whenFalse: Expression;
    }
    interface FunctionExpression extends Expression, FunctionLikeDeclaration {
        name?: Identifier;
        body: Expression | Block;
    }
    interface LiteralExpression extends Expression {
        text: string;
    }
    interface TemplateExpression extends Expression {
        head: LiteralExpression;
        templateSpans: NodeArray<TemplateSpan>;
    }
    interface TemplateSpan extends Node {
        expression: Expression;
        literal: LiteralExpression;
    }
    interface ParenExpression extends Expression {
        expression: Expression;
    }
    interface ArrayLiteral extends Expression {
        elements: NodeArray<Expression>;
    }
    interface ObjectLiteral extends Expression {
        properties: NodeArray<Node>;
    }
    interface PropertyAccess extends Expression {
        left: Expression;
        right: Identifier;
    }
    interface IndexedAccess extends Expression {
        object: Expression;
        index: Expression;
    }
    interface CallExpression extends Expression {
        func: Expression;
        typeArguments?: NodeArray<TypeNode>;
        arguments: NodeArray<Expression>;
    }
    interface NewExpression extends CallExpression {
    }
    interface TaggedTemplateExpression extends Expression {
        tag: Expression;
        template: LiteralExpression | TemplateExpression;
    }
    interface TypeAssertion extends Expression {
        type: TypeNode;
        operand: Expression;
    }
    interface Statement extends Node {
    }
    interface Block extends Statement {
        statements: NodeArray<Statement>;
    }
    interface VariableStatement extends Statement {
        declarations: NodeArray<VariableDeclaration>;
    }
    interface ExpressionStatement extends Statement {
        expression: Expression;
    }
    interface IfStatement extends Statement {
        expression: Expression;
        thenStatement: Statement;
        elseStatement?: Statement;
    }
    interface IterationStatement extends Statement {
        statement: Statement;
    }
    interface DoStatement extends IterationStatement {
        expression: Expression;
    }
    interface WhileStatement extends IterationStatement {
        expression: Expression;
    }
    interface ForStatement extends IterationStatement {
        declarations?: NodeArray<VariableDeclaration>;
        initializer?: Expression;
        condition?: Expression;
        iterator?: Expression;
    }
    interface ForInStatement extends IterationStatement {
        declaration?: VariableDeclaration;
        variable?: Expression;
        expression: Expression;
    }
    interface BreakOrContinueStatement extends Statement {
        label?: Identifier;
    }
    interface ReturnStatement extends Statement {
        expression?: Expression;
    }
    interface WithStatement extends Statement {
        expression: Expression;
        statement: Statement;
    }
    interface SwitchStatement extends Statement {
        expression: Expression;
        clauses: NodeArray<CaseOrDefaultClause>;
    }
    interface CaseOrDefaultClause extends Node {
        expression?: Expression;
        statements: NodeArray<Statement>;
    }
    interface LabeledStatement extends Statement {
        label: Identifier;
        statement: Statement;
    }
    interface ThrowStatement extends Statement {
        expression: Expression;
    }
    interface TryStatement extends Statement {
        tryBlock: Block;
        catchBlock?: CatchBlock;
        finallyBlock?: Block;
    }
    interface CatchBlock extends Block {
        variable: Identifier;
    }
    interface ClassDeclaration extends Declaration {
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        baseType?: TypeReferenceNode;
        implementedTypes?: NodeArray<TypeReferenceNode>;
        members: NodeArray<Node>;
    }
    interface InterfaceDeclaration extends Declaration {
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        baseTypes?: NodeArray<TypeReferenceNode>;
        members: NodeArray<Node>;
    }
    interface TypeAliasDeclaration extends Declaration {
        name: Identifier;
        type: TypeNode;
    }
    interface EnumMember extends Declaration {
        name: Identifier | LiteralExpression;
        initializer?: Expression;
    }
    interface EnumDeclaration extends Declaration {
        name: Identifier;
        members: NodeArray<EnumMember>;
    }
    interface ModuleDeclaration extends Declaration {
        name: Identifier | LiteralExpression;
        body: Block | ModuleDeclaration;
    }
    interface ImportDeclaration extends Declaration {
        name: Identifier;
        entityName?: Identifier | QualifiedName;
        externalModuleName?: LiteralExpression;
    }
    interface ExportAssignment extends Statement {
        exportName: Identifier;
    }
    interface FileReference extends TextRange {
        filename: string;
    }
    interface CommentRange extends TextRange {
        hasTrailingNewLine?: boolean;
    }
    interface SourceFile extends Block {
        filename: string;
        text: string;
        getLineAndCharacterFromPosition(position: number): {
            line: number;
            character: number;
        };
        getPositionFromLineAndCharacter(line: number, character: number): number;
        amdDependencies: string[];
        referencedFiles: FileReference[];
        syntacticErrors: Diagnostic[];
        semanticErrors: Diagnostic[];
        hasNoDefaultLib: boolean;
        externalModuleIndicator: Node;
        nodeCount: number;
        identifierCount: number;
        symbolCount: number;
        isOpen: boolean;
        version: string;
        languageVersion: ScriptTarget;
        identifiers: Map<string>;
    }
    interface Program {
        getSourceFile(filename: string): SourceFile;
        getSourceFiles(): SourceFile[];
        getCompilerOptions(): CompilerOptions;
        getCompilerHost(): CompilerHost;
        getDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getTypeChecker(fullTypeCheckMode: boolean): TypeChecker;
        getCommonSourceDirectory(): string;
    }
    interface SourceMapSpan {
        emittedLine: number;
        emittedColumn: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
        sourceIndex: number;
    }
    interface SourceMapData {
        sourceMapFilePath: string;
        jsSourceMappingURL: string;
        sourceMapFile: string;
        sourceMapSourceRoot: string;
        sourceMapSources: string[];
        inputSourceFileNames: string[];
        sourceMapNames?: string[];
        sourceMapMappings: string;
        sourceMapDecodedMappings: SourceMapSpan[];
    }
    enum EmitReturnStatus {
        Succeeded = 0,
        AllOutputGenerationSkipped = 1,
        JSGeneratedWithSemanticErrors = 2,
        DeclarationGenerationSkipped = 3,
        EmitErrorsEncountered = 4,
        CompilerOptionsErrors = 5,
    }
    interface EmitResult {
        emitResultStatus: EmitReturnStatus;
        errors: Diagnostic[];
        sourceMaps: SourceMapData[];
    }
    interface TypeChecker {
        getProgram(): Program;
        getDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        checkProgram(): void;
        emitFiles(targetSourceFile?: SourceFile): EmitResult;
        getParentOfSymbol(symbol: Symbol): Symbol;
        getNarrowedTypeOfSymbol(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol;
        getSignaturesOfType(type: Type, kind: SignatureKind): Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolInfo(node: Node): Symbol;
        getTypeOfNode(node: Node): Type;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string;
        getSymbolDisplayBuilder(): SymbolDisplayBuilder;
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): Symbol[];
        getContextualType(node: Node): Type;
        getResolvedSignature(node: CallExpression, candidatesOutArray?: Signature[]): Signature;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        hasEarlyErrors(sourceFile?: SourceFile): boolean;
        getEnumMemberValue(node: EnumMember): number;
        isValidPropertyAccess(node: PropertyAccess, propertyName: string): boolean;
        getAliasedSymbol(symbol: Symbol): Symbol;
    }
    interface SymbolDisplayBuilder {
        buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): void;
        buildSignatureDisplay(signatures: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildParameterDisplay(parameter: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    }
    interface SymbolWriter {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
        trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): void;
    }
    const enum TypeFormatFlags {
        None = 0,
        WriteArrayAsGenericType = 1,
        UseTypeOfFunction = 2,
        NoTruncation = 4,
        WriteArrowStyleSignature = 8,
        WriteOwnNameForAnyLike = 16,
        WriteTypeArgumentsOfSignature = 32,
        InElementType = 64,
    }
    const enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
    }
    const enum SymbolAccessibility {
        Accessible = 0,
        NotAccessible = 1,
        CannotBeNamed = 2,
    }
    interface SymbolAccessiblityResult {
        accessibility: SymbolAccessibility;
        errorSymbolName?: string;
        errorModuleName?: string;
        aliasesToMakeVisible?: ImportDeclaration[];
    }
    interface EmitResolver {
        getProgram(): Program;
        getLocalNameOfContainer(container: EnumDeclaration | ModuleDeclaration): string;
        getExpressionNamePrefix(node: Identifier): string;
        getExportAssignmentName(node: SourceFile): string;
        isReferencedImportDeclaration(node: ImportDeclaration): boolean;
        isTopLevelValueImportWithEntityName(node: ImportDeclaration): boolean;
        getNodeCheckFlags(node: Node): NodeCheckFlags;
        getEnumMemberValue(node: EnumMember): number;
        hasSemanticErrors(): boolean;
        isDeclarationVisible(node: Declaration): boolean;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        writeTypeAtLocation(location: Node, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags): SymbolAccessiblityResult;
        isImportDeclarationEntityNameReferenceDeclarationVisibile(entityName: Identifier | QualifiedName): SymbolAccessiblityResult;
        getConstantValue(node: PropertyAccess | IndexedAccess): number;
        hasEarlyErrors(sourceFile?: SourceFile): boolean;
    }
    const enum SymbolFlags {
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        CallSignature = 131072,
        ConstructSignature = 262144,
        IndexSignature = 524288,
        TypeParameter = 1048576,
        TypeAlias = 2097152,
        ExportValue = 4194304,
        ExportType = 8388608,
        ExportNamespace = 16777216,
        Import = 33554432,
        Instantiated = 67108864,
        Merged = 134217728,
        Transient = 268435456,
        Prototype = 536870912,
        UnionProperty = 1073741824,
        Enum = 384,
        Variable = 3,
        Value = 107455,
        Type = 3152352,
        Namespace = 1536,
        Module = 1536,
        Accessor = 98304,
        Signature = 917504,
        FunctionScopedVariableExcludes = 107454,
        BlockScopedVariableExcludes = 107455,
        ParameterExcludes = 107455,
        PropertyExcludes = 107455,
        EnumMemberExcludes = 107455,
        FunctionExcludes = 106927,
        ClassExcludes = 3258879,
        InterfaceExcludes = 3152288,
        RegularEnumExcludes = 3258623,
        ConstEnumExcludes = 3259263,
        ValueModuleExcludes = 106639,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 99263,
        GetAccessorExcludes = 41919,
        SetAccessorExcludes = 74687,
        TypeParameterExcludes = 2103776,
        TypeAliasExcludes = 3152352,
        ImportExcludes = 33554432,
        ModuleMember = 35653619,
        ExportHasLocal = 944,
        HasLocals = 1041936,
        HasExports = 1952,
        HasMembers = 6240,
        IsContainer = 1048560,
        PropertyOrAccessor = 98308,
        Export = 29360128,
    }
    interface Symbol {
        flags: SymbolFlags;
        name: string;
        id?: number;
        mergeId?: number;
        declarations?: Declaration[];
        parent?: Symbol;
        members?: SymbolTable;
        exports?: SymbolTable;
        exportSymbol?: Symbol;
        valueDeclaration?: Declaration;
        constEnumOnlyModule?: boolean;
    }
    interface SymbolLinks {
        target?: Symbol;
        type?: Type;
        declaredType?: Type;
        mapper?: TypeMapper;
        referenced?: boolean;
        exportAssignSymbol?: Symbol;
        unionType?: UnionType;
    }
    interface TransientSymbol extends Symbol, SymbolLinks {
    }
    interface SymbolTable {
        [index: string]: Symbol;
    }
    const enum NodeCheckFlags {
        TypeChecked = 1,
        LexicalThis = 2,
        CaptureThis = 4,
        EmitExtends = 8,
        SuperInstance = 16,
        SuperStatic = 32,
        ContextChecked = 64,
        EnumValuesComputed = 128,
    }
    interface NodeLinks {
        resolvedType?: Type;
        resolvedSignature?: Signature;
        resolvedSymbol?: Symbol;
        flags?: NodeCheckFlags;
        enumMemberValue?: number;
        isIllegalTypeReferenceInConstraint?: boolean;
        isVisible?: boolean;
        localModuleName?: string;
        assignmentChecks?: Map<boolean>;
    }
    const enum TypeFlags {
        Any = 1,
        String = 2,
        Number = 4,
        Boolean = 8,
        Void = 16,
        Undefined = 32,
        Null = 64,
        Enum = 128,
        StringLiteral = 256,
        TypeParameter = 512,
        Class = 1024,
        Interface = 2048,
        Reference = 4096,
        Tuple = 8192,
        Union = 16384,
        Anonymous = 32768,
        FromSignature = 65536,
        Intrinsic = 127,
        StringLike = 258,
        NumberLike = 132,
        ObjectType = 48128,
        Structured = 65025,
    }
    interface Type {
        flags: TypeFlags;
        id: number;
        symbol?: Symbol;
    }
    interface IntrinsicType extends Type {
        intrinsicName: string;
    }
    interface StringLiteralType extends Type {
        text: string;
    }
    interface ObjectType extends Type {
    }
    interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[];
        baseTypes: ObjectType[];
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredStringIndexType: Type;
        declaredNumberIndexType: Type;
    }
    interface TypeReference extends ObjectType {
        target: GenericType;
        typeArguments: Type[];
    }
    interface GenericType extends InterfaceType, TypeReference {
        instantiations: Map<TypeReference>;
        openReferenceTargets: GenericType[];
        openReferenceChecks: Map<boolean>;
    }
    interface TupleType extends ObjectType {
        elementTypes: Type[];
        baseArrayType: TypeReference;
    }
    interface UnionType extends Type {
        types: Type[];
        resolvedProperties: SymbolTable;
    }
    interface ResolvedType extends ObjectType, UnionType {
        members: SymbolTable;
        properties: Symbol[];
        callSignatures: Signature[];
        constructSignatures: Signature[];
        stringIndexType: Type;
        numberIndexType: Type;
    }
    interface TypeParameter extends Type {
        constraint: Type;
        target?: TypeParameter;
        mapper?: TypeMapper;
    }
    const enum SignatureKind {
        Call = 0,
        Construct = 1,
    }
    interface Signature {
        declaration: SignatureDeclaration;
        typeParameters: TypeParameter[];
        parameters: Symbol[];
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasStringLiterals: boolean;
        target?: Signature;
        mapper?: TypeMapper;
        unionSignatures?: Signature[];
        erasedSignatureCache?: Signature;
        isolatedSignatureType?: ObjectType;
    }
    const enum IndexKind {
        String = 0,
        Number = 1,
    }
    interface TypeMapper {
        (t: Type): Type;
    }
    interface TypeInferences {
        primary: Type[];
        secondary: Type[];
    }
    interface InferenceContext {
        typeParameters: TypeParameter[];
        inferUnionTypes: boolean;
        inferences: TypeInferences[];
        inferredTypes: Type[];
        failedTypeParameterIndex?: number;
    }
    interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        isEarly?: boolean;
    }
    interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain;
    }
    interface Diagnostic {
        file: SourceFile;
        start: number;
        length: number;
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        isEarly?: boolean;
    }
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
    }
    interface CompilerOptions {
        charset?: string;
        codepage?: number;
        declaration?: boolean;
        diagnostics?: boolean;
        emitBOM?: boolean;
        help?: boolean;
        locale?: string;
        mapRoot?: string;
        module?: ModuleKind;
        noErrorTruncation?: boolean;
        noImplicitAny?: boolean;
        noLib?: boolean;
        noLibCheck?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        removeComments?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        target?: ScriptTarget;
        version?: boolean;
        watch?: boolean;
        preserveConstEnums?: boolean;
        [option: string]: string | number | boolean;
    }
    const enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
    }
    interface LineAndCharacter {
        line: number;
        character: number;
    }
    const enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES6 = 2,
        Latest = 2,
    }
    interface ParsedCommandLine {
        options: CompilerOptions;
        filenames: string[];
        errors: Diagnostic[];
    }
    interface CommandLineOption {
        name: string;
        type: string | Map<number>;
        shortName?: string;
        description?: DiagnosticMessage;
        paramName?: DiagnosticMessage;
        error?: DiagnosticMessage;
    }
    const enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        mathematicalSpace = 8287,
        ogham = 5760,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        backtick = 96,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
    interface CancellationToken {
        isCancellationRequested(): boolean;
    }
    interface CompilerHost {
        getSourceFile(filename: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
        getDefaultLibFilename(): string;
        getCancellationToken?(): CancellationToken;
        writeFile(filename: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void): void;
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
    }
}
declare module ts {
    const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1,
    }
    interface Map<T> {
        [index: string]: T;
    }
    const enum Comparison {
        LessThan = -1,
        EqualTo = 0,
        GreaterThan = 1,
    }
    interface StringSet extends Map<any> {
    }
    function forEach<T, U>(array: T[], callback: (element: T) => U): U;
    function contains<T>(array: T[], value: T): boolean;
    function indexOf<T>(array: T[], value: T): number;
    function countWhere<T>(array: T[], predicate: (x: T) => boolean): number;
    function filter<T>(array: T[], f: (x: T) => boolean): T[];
    function map<T, U>(array: T[], f: (x: T) => U): U[];
    function concatenate<T>(array1: T[], array2: T[]): T[];
    function deduplicate<T>(array: T[]): T[];
    function sum(array: any[], prop: string): number;
    function binarySearch(array: number[], value: number): number;
    function hasProperty<T>(map: Map<T>, key: string): boolean;
    function getProperty<T>(map: Map<T>, key: string): T;
    function isEmpty<T>(map: Map<T>): boolean;
    function clone<T>(object: T): T;
    function forEachValue<T, U>(map: Map<T>, callback: (value: T) => U): U;
    function forEachKey<T, U>(map: Map<T>, callback: (key: string) => U): U;
    function lookUp<T>(map: Map<T>, key: string): T;
    function mapToArray<T>(map: Map<T>): T[];
    function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T>;
    var localizedDiagnosticMessages: Map<string>;
    function getLocaleSpecificMessage(message: string): string;
    function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: any[]): Diagnostic;
    function createCompilerDiagnostic(message: DiagnosticMessage, ...args: any[]): Diagnostic;
    function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
    function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain;
    function flattenDiagnosticChain(file: SourceFile, start: number, length: number, diagnosticChain: DiagnosticMessageChain, newLine: string): Diagnostic;
    function compareValues<T>(a: T, b: T): Comparison;
    function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): number;
    function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[];
    function normalizeSlashes(path: string): string;
    function getRootLength(path: string): number;
    var directorySeparator: string;
    function normalizePath(path: string): string;
    function getDirectoryPath(path: string): string;
    function isUrl(path: string): boolean;
    function isRootedDiskPath(path: string): boolean;
    function getNormalizedPathComponents(path: string, currentDirectory: string): string[];
    function getNormalizedPathFromPathComponents(pathComponents: string[]): string;
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: (fileName: string) => string, isAbsolutePathAnUrl: boolean): string;
    function getBaseFilename(path: string): string;
    function combinePaths(path1: string, path2: string): string;
    function fileExtensionIs(path: string, extension: string): boolean;
    function removeFileExtension(path: string): string;
    function escapeString(s: string): string;
    interface ObjectAllocator {
        getNodeConstructor(kind: SyntaxKind): new () => Node;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
    }
    var objectAllocator: ObjectAllocator;
    const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }
    module Debug {
        function shouldAssert(level: AssertionLevel): boolean;
        function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void;
        function fail(message?: string): void;
    }
}
declare module ts {
    var Diagnostics: {
        Unterminated_string_literal: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Identifier_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_file_cannot_have_a_reference_to_itself: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Trailing_comma_not_allowed: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Asterisk_Slash_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unexpected_token: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Catch_clause_parameter_cannot_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_rest_parameter_must_be_last_in_a_parameter_list: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_cannot_have_question_mark_and_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_required_parameter_cannot_follow_an_optional_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_cannot_have_a_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_parameter_cannot_have_an_accessibility_modifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_parameter_cannot_have_a_question_mark: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_must_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_parameter_must_have_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_parameter_type_must_be_string_or_number: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_or_interface_declaration_can_only_have_one_extends_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_extends_clause_must_precede_an_implements_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_can_only_extend_a_single_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_declaration_can_only_have_one_implements_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Accessibility_modifier_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_must_precede_1_modifier: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_already_seen: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_cannot_appear_on_a_class_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_interface_declaration_cannot_have_an_implements_clause: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        super_must_be_followed_by_an_argument_list_or_member_access: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Only_ambient_modules_can_use_quoted_names: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Statements_are_not_allowed_in_ambient_contexts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_function_implementation_cannot_be_declared_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Initializers_are_not_allowed_in_ambient_contexts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_cannot_appear_on_a_module_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_declare_modifier_cannot_be_used_with_an_interface_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_rest_parameter_cannot_be_optional: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_rest_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_set_accessor_must_have_exactly_one_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_set_accessor_cannot_have_an_optional_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_set_accessor_parameter_cannot_have_an_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_set_accessor_cannot_have_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_get_accessor_cannot_have_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Enum_member_must_have_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_export_assignment_cannot_be_used_in_an_internal_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Ambient_enum_elements_can_only_have_integer_literal_initializers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unexpected_token_A_constructor_method_accessor_or_property_was_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_declare_modifier_cannot_be_used_with_an_import_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_reference_directive_syntax: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_accessor_cannot_be_declared_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_modifier_cannot_appear_on_a_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameters_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_annotation_cannot_appear_on_a_constructor_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_accessor_cannot_have_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_set_accessor_cannot_have_a_return_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_signature_must_have_exactly_one_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_argument_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_use_of_0_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        with_statements_are_not_allowed_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        delete_cannot_be_called_on_an_identifier_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Jump_target_cannot_cross_function_boundary: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_return_statement_can_only_be_used_within_a_function_body: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Expression_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_constructor_implementation_cannot_be_declared_in_an_ambient_context: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_member_cannot_be_declared_optional: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_default_clause_cannot_appear_more_than_once_in_a_switch_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_label_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_object_literal_cannot_have_property_and_accessor_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_export_assignment_cannot_have_modifiers: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Octal_literals_are_not_allowed_in_strict_mode: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_tuple_type_element_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Variable_declaration_list_cannot_be_empty: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Hexadecimal_digit_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unexpected_end_of_text: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_character: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Declaration_or_statement_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Statement_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        case_or_default_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_or_signature_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Enum_member_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_reference_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Variable_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Argument_expression_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_assignment_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Expression_or_comma_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_argument_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        String_literal_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Line_break_not_permitted_here: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        catch_or_finally_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Block_or_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Modifiers_not_permitted_on_index_signature_members: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Declaration_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Import_declarations_in_an_internal_module_cannot_reference_an_external_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_compile_external_modules_unless_the_module_flag_is_provided: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Filename_0_differs_from_already_included_filename_1_only_in_casing: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        var_let_or_const_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        const_declarations_must_be_initialized: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        const_declarations_can_only_be_declared_inside_a_block: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        let_declarations_can_only_be_declared_inside_a_block: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_template_literal_expected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Static_members_cannot_reference_class_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Circular_definition_of_import_alias_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_find_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Module_0_has_no_exported_member_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        File_0_is_not_an_external_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_find_external_module_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_module_cannot_have_more_than_one_export_assignment: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_0_recursively_references_itself_as_a_base_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_may_only_extend_another_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_interface_may_only_extend_a_class_or_another_interface: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Generic_type_0_requires_1_type_argument_s: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_0_is_not_generic: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Global_type_0_must_be_a_class_or_interface_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Global_type_0_must_have_1_type_parameter_s: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_find_global_type_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Named_properties_0_of_types_1_and_2_are_not_identical: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Interface_0_cannot_simultaneously_extend_types_1_and_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Excessive_stack_depth_comparing_types_0_and_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_0_is_not_assignable_to_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_missing_in_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_private_in_type_1_but_not_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Types_of_property_0_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_optional_in_type_1_but_required_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Types_of_parameters_0_and_1_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Index_signature_is_missing_in_type_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Index_signatures_are_incompatible: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        this_cannot_be_referenced_in_a_module_body: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        this_cannot_be_referenced_in_current_location: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        this_cannot_be_referenced_in_constructor_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        this_cannot_be_referenced_in_a_static_property_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        super_can_only_be_referenced_in_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        super_cannot_be_referenced_in_constructor_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_does_not_exist_on_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_private_and_only_accessible_within_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_index_expression_argument_must_be_of_type_string_number_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_0_does_not_satisfy_the_constraint_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Argument_of_type_0_is_not_assignable_to_parameter_of_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Supplied_parameters_do_not_match_any_signature_of_call_target: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Untyped_function_calls_may_not_accept_type_arguments: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Only_a_void_function_can_be_called_with_the_new_keyword: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Neither_type_0_nor_type_1_is_assignable_to_the_other: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        No_best_common_type_exists_among_return_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_left_hand_side_of_assignment_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Operator_0_cannot_be_applied_to_types_1_and_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_rest_parameter_must_be_of_an_array_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_cannot_be_referenced_in_its_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_string_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_number_index_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Constructors_for_derived_classes_must_contain_a_super_call: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Getter_and_setter_accessors_do_not_agree_in_visibility: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        get_and_set_accessor_must_have_the_same_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_signature_with_an_implementation_cannot_use_a_string_literal_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Overload_signatures_must_all_be_exported_or_not_exported: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Overload_signatures_must_all_be_ambient_or_non_ambient: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Overload_signatures_must_all_be_public_private_or_protected: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Overload_signatures_must_all_be_optional_or_required: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_overload_must_be_static: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_overload_must_not_be_static: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_implementation_name_must_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Constructor_implementation_is_missing: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_implementation_is_missing_or_not_immediately_following_the_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Multiple_constructor_implementations_are_not_allowed: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_function_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Overload_signature_is_not_compatible_with_function_implementation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Invalid_left_hand_side_in_for_in_statement: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Setters_cannot_return_a_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        All_symbols_within_a_with_block_will_be_resolved_to_any: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_of_type_1_is_not_assignable_to_string_index_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Numeric_index_type_0_is_not_assignable_to_string_index_type_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_incorrectly_extends_base_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_static_side_0_incorrectly_extends_base_class_static_side_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_incorrectly_implements_interface_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_class_may_only_implement_another_class_or_interface: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Interface_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        All_declarations_of_an_interface_must_have_identical_type_parameters: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Interface_0_incorrectly_extends_interface_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Enum_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Ambient_external_modules_cannot_be_nested_in_other_modules: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Ambient_external_module_declaration_cannot_specify_relative_module_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Module_0_is_hidden_by_a_local_declaration_with_the_same_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Import_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Import_declaration_conflicts_with_local_declaration_of_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Types_have_separate_declarations_of_a_private_property_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_protected_in_type_1_but_public_in_type_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Block_scoped_variable_0_used_before_its_declaration: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            isEarly: boolean;
        };
        The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            isEarly: boolean;
        };
        Left_hand_side_of_assignment_expression_cannot_be_a_constant: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            isEarly: boolean;
        };
        Cannot_redeclare_block_scoped_variable_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            isEarly: boolean;
        };
        An_enum_member_cannot_have_a_numeric_name: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_alias_0_circularly_references_itself: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_alias_name_cannot_be_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Import_declaration_0_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Type_parameter_0_of_exported_function_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Implements_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Extends_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Implements_clause_of_exported_class_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Extends_clause_of_exported_class_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Extends_clause_of_exported_interface_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_variable_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_variable_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_static_property_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Public_property_0_of_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_of_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Return_type_of_exported_function_has_or_is_using_private_name_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_of_exported_function_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_type_alias_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_type_alias_0_has_or_is_using_name_1_from_private_module_2: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Exported_type_alias_0_has_or_is_using_private_name_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Enum_declarations_must_all_be_const_or_non_const: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        In_const_enum_declarations_member_initializer_must_be_constant_expression: {
            code: number;
            category: DiagnosticCategory;
            key: string;
            isEarly: boolean;
        };
        const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Index_expression_arguments_in_const_enums_must_be_of_type_string: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        const_enum_member_initializer_was_evaluated_to_a_non_finite_value: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        The_current_host_does_not_support_the_0_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_find_the_common_subdirectory_path_for_the_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Cannot_read_file_0_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unsupported_file_encoding: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unknown_compiler_option_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Could_not_write_file_0_Colon_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Concatenate_and_emit_output_to_single_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Generates_corresponding_d_ts_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Watch_input_files: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Redirect_output_structure_to_the_directory: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Do_not_erase_const_enum_declarations_in_generated_code: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Do_not_emit_comments_to_output: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Specify_ECMAScript_target_version_Colon_ES3_default_ES5_or_ES6_experimental: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Specify_module_code_generation_Colon_commonjs_or_amd: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Print_this_message: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Print_the_compiler_s_version: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Syntax_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        options: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Examples_Colon_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Options_Colon: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Version_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Insert_command_line_options_and_files_from_a_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        File_change_detected_Compiling: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        KIND: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        FILE: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        VERSION: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        LOCATION: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        DIRECTORY: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Compilation_complete_Watching_for_file_changes: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Generates_corresponding_map_file: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Compiler_option_0_expects_an_argument: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unterminated_quoted_string_in_response_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Argument_for_module_option_must_be_commonjs_or_amd: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Argument_for_target_option_must_be_es3_es5_or_es6: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unsupported_locale_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Unable_to_open_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Corrupted_locale_file_0: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Warn_on_expressions_and_declarations_with_an_implied_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        File_0_not_found: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        File_0_must_have_extension_ts_or_d_ts: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Variable_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Parameter_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Member_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Index_signature_of_object_type_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Object_literal_s_property_0_implicitly_has_an_1_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Rest_parameter_0_implicitly_has_an_any_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        _0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
        You_cannot_rename_this_element: {
            code: number;
            category: DiagnosticCategory;
            key: string;
        };
    };
}
declare module ts {
    interface ErrorCallback {
        (message: DiagnosticMessage): void;
    }
    interface CommentCallback {
        (pos: number, end: number): void;
    }
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanTemplateToken(): SyntaxKind;
        scan(): SyntaxKind;
        setText(text: string): void;
        setTextPos(textPos: number): void;
        tryScan<T>(callback: () => T): T;
    }
    function tokenToString(t: SyntaxKind): string;
    function getLineStarts(text: string): number[];
    function getPositionFromLineAndCharacter(lineStarts: number[], line: number, character: number): number;
    function getLineAndCharacterOfPosition(lineStarts: number[], position: number): {
        line: number;
        character: number;
    };
    function positionToLineAndCharacter(text: string, pos: number): {
        line: number;
        character: number;
    };
    function isWhiteSpace(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function isOctalDigit(ch: number): boolean;
    function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean): number;
    function getLeadingCommentRanges(text: string, pos: number): CommentRange[];
    function getTrailingCommentRanges(text: string, pos: number): CommentRange[];
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, text?: string, onError?: ErrorCallback, onComment?: CommentCallback): Scanner;
}
declare module ts {
    function getNodeConstructor(kind: SyntaxKind): new () => Node;
    function getSourceFileOfNode(node: Node): SourceFile;
    function nodePosToString(node: Node): string;
    function getStartPosOfNode(node: Node): number;
    function getTokenPosOfNode(node: Node, sourceFile?: SourceFile): number;
    function getTextOfNodeFromSourceText(sourceText: string, node: Node): string;
    function getTextOfNode(node: Node): string;
    function escapeIdentifier(identifier: string): string;
    function unescapeIdentifier(identifier: string): string;
    function declarationNameToString(name: Identifier | LiteralExpression | ComputedPropertyName): string;
    function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): Diagnostic;
    function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain, newLine: string): Diagnostic;
    function getErrorSpanForNode(node: Node): Node;
    function isExternalModule(file: SourceFile): boolean;
    function isDeclarationFile(file: SourceFile): boolean;
    function isConstEnumDeclaration(node: EnumDeclaration): boolean;
    function isPrologueDirective(node: Node): boolean;
    function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode?: SourceFile): CommentRange[];
    function getJsDocComments(node: Declaration, sourceFileOfNode: SourceFile): CommentRange[];
    var fullTripleSlashReferencePathRegEx: RegExp;
    function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodes?: (nodes: Node[]) => T): T;
    function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T;
    function isAnyFunction(node: Node): boolean;
    function getContainingFunction(node: Node): SignatureDeclaration;
    function getThisContainer(node: Node, includeArrowFunctions: boolean): Node;
    function getSuperContainer(node: Node): Node;
    function isExpression(node: Node): boolean;
    function hasRestParameters(s: SignatureDeclaration): boolean;
    function isLiteralKind(kind: SyntaxKind): boolean;
    function isTextualLiteralKind(kind: SyntaxKind): boolean;
    function isTemplateLiteralKind(kind: SyntaxKind): boolean;
    function isInAmbientContext(node: Node): boolean;
    function isDeclaration(node: Node): boolean;
    function isStatement(n: Node): boolean;
    function isDeclarationOrFunctionExpressionOrCatchVariableName(name: Node): boolean;
    function getAncestor(node: Node, kind: SyntaxKind): Node;
    function isKeyword(token: SyntaxKind): boolean;
    function isTrivia(token: SyntaxKind): boolean;
    function isModifier(token: SyntaxKind): boolean;
    function createSourceFile(filename: string, sourceText: string, languageVersion: ScriptTarget, version: string, isOpen?: boolean): SourceFile;
    function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost): Program;
}
declare module ts {
    const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated = 1,
        ConstEnumOnly = 2,
    }
    function getModuleInstanceState(node: Node): ModuleInstanceState;
    function bindSourceFile(file: SourceFile): void;
}
declare module ts {
    function getIndentString(level: number): string;
    function shouldEmitToOwnFile(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean;
    function isExternalModuleOrDeclarationFile(sourceFile: SourceFile): boolean;
    function emitFiles(resolver: EmitResolver, targetSourceFile?: SourceFile): EmitResult;
}
declare module ts {
    function getDeclarationOfKind(symbol: Symbol, kind: SyntaxKind): Declaration;
    interface StringSymbolWriter extends SymbolWriter {
        string(): string;
    }
    function getSingleLineStringWriter(): StringSymbolWriter;
    function createTypeChecker(program: Program, fullTypeCheck: boolean): TypeChecker;
}
declare module TypeScript {
    var DiagnosticCode: {
        error_TS_0_1: string;
        warning_TS_0_1: string;
        Unrecognized_escape_sequence: string;
        Unexpected_character_0: string;
        Missing_close_quote_character: string;
        Identifier_expected: string;
        _0_keyword_expected: string;
        _0_expected: string;
        Identifier_expected_0_is_a_keyword: string;
        Automatic_semicolon_insertion_not_allowed: string;
        Unexpected_token_0_expected: string;
        Trailing_comma_not_allowed: string;
        public_or_private_modifier_must_precede_static: string;
        Unexpected_token: string;
        Catch_clause_parameter_cannot_have_a_type_annotation: string;
        A_rest_parameter_must_be_last_in_a_parameter_list: string;
        Parameter_cannot_have_question_mark_and_initializer: string;
        A_required_parameter_cannot_follow_an_optional_parameter: string;
        Index_signatures_cannot_have_rest_parameters: string;
        Index_signature_parameter_cannot_have_accessibility_modifiers: string;
        Index_signature_parameter_cannot_have_a_question_mark: string;
        Index_signature_parameter_cannot_have_an_initializer: string;
        Index_signature_must_have_a_type_annotation: string;
        Index_signature_parameter_must_have_a_type_annotation: string;
        Index_signature_parameter_type_must_be_string_or_number: string;
        extends_clause_already_seen: string;
        extends_clause_must_precede_implements_clause: string;
        Classes_can_only_extend_a_single_class: string;
        implements_clause_already_seen: string;
        Accessibility_modifier_already_seen: string;
        _0_modifier_must_precede_1_modifier: string;
        _0_modifier_already_seen: string;
        _0_modifier_cannot_appear_on_a_class_element: string;
        Interface_declaration_cannot_have_implements_clause: string;
        super_invocation_cannot_have_type_arguments: string;
        Only_ambient_modules_can_use_quoted_names: string;
        Statements_are_not_allowed_in_ambient_contexts: string;
        A_function_implementation_cannot_be_declared_in_an_ambient_context: string;
        A_declare_modifier_cannot_be_used_in_an_already_ambient_context: string;
        Initializers_are_not_allowed_in_ambient_contexts: string;
        _0_modifier_cannot_appear_on_a_module_element: string;
        A_declare_modifier_cannot_be_used_with_an_interface_declaration: string;
        A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file: string;
        A_rest_parameter_cannot_be_optional: string;
        A_rest_parameter_cannot_have_an_initializer: string;
        set_accessor_must_have_exactly_one_parameter: string;
        set_accessor_parameter_cannot_be_optional: string;
        set_accessor_parameter_cannot_have_an_initializer: string;
        set_accessor_cannot_have_rest_parameter: string;
        get_accessor_cannot_have_parameters: string;
        Modifiers_cannot_appear_here: string;
        Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher: string;
        Enum_member_must_have_initializer: string;
        Export_assignment_cannot_be_used_in_internal_modules: string;
        Ambient_enum_elements_can_only_have_integer_literal_initializers: string;
        module_class_interface_enum_import_or_statement: string;
        constructor_function_accessor_or_variable: string;
        statement: string;
        case_or_default_clause: string;
        identifier: string;
        call_construct_index_property_or_function_signature: string;
        expression: string;
        type_name: string;
        property_or_accessor: string;
        parameter: string;
        type: string;
        type_parameter: string;
        A_declare_modifier_cannot_be_used_with_an_import_declaration: string;
        Invalid_reference_directive_syntax: string;
        Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher: string;
        Accessors_are_not_allowed_in_ambient_contexts: string;
        _0_modifier_cannot_appear_on_a_constructor_declaration: string;
        _0_modifier_cannot_appear_on_a_parameter: string;
        Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement: string;
        Type_parameters_cannot_appear_on_a_constructor_declaration: string;
        Type_annotation_cannot_appear_on_a_constructor_declaration: string;
        Type_parameters_cannot_appear_on_an_accessor: string;
        Type_annotation_cannot_appear_on_a_set_accessor: string;
        Index_signature_must_have_exactly_one_parameter: string;
        _0_list_cannot_be_empty: string;
        variable_declaration: string;
        type_argument: string;
        Invalid_use_of_0_in_strict_mode: string;
        with_statements_are_not_allowed_in_strict_mode: string;
        delete_cannot_be_called_on_an_identifier_in_strict_mode: string;
        Invalid_left_hand_side_in_for_in_statement: string;
        continue_statement_can_only_be_used_within_an_enclosing_iteration_statement: string;
        break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement: string;
        Jump_target_not_found: string;
        Jump_target_cannot_cross_function_boundary: string;
        return_statement_must_be_contained_within_a_function_body: string;
        Expression_expected: string;
        Type_expected: string;
        Template_literal_cannot_be_used_as_an_element_name: string;
        Computed_property_names_cannot_be_used_here: string;
        Duplicate_identifier_0: string;
        The_name_0_does_not_exist_in_the_current_scope: string;
        The_name_0_does_not_refer_to_a_value: string;
        super_can_only_be_used_inside_a_class_instance_method: string;
        The_left_hand_side_of_an_assignment_expression_must_be_a_variable_property_or_indexer: string;
        Value_of_type_0_is_not_callable_Did_you_mean_to_include_new: string;
        Value_of_type_0_is_not_callable: string;
        Value_of_type_0_is_not_newable: string;
        An_index_expression_argument_must_be_string_number_or_any: string;
        Operator_0_cannot_be_applied_to_types_1_and_2: string;
        Type_0_is_not_assignable_to_type_1: string;
        Type_0_is_not_assignable_to_type_1_NL_2: string;
        Expected_var_class_interface_or_module: string;
        Getter_0_already_declared: string;
        Setter_0_already_declared: string;
        Exported_class_0_extends_private_class_1: string;
        Exported_class_0_implements_private_interface_1: string;
        Exported_interface_0_extends_private_interface_1: string;
        Exported_class_0_extends_class_from_inaccessible_module_1: string;
        Exported_class_0_implements_interface_from_inaccessible_module_1: string;
        Exported_interface_0_extends_interface_from_inaccessible_module_1: string;
        Public_static_property_0_of_exported_class_has_or_is_using_private_type_1: string;
        Public_property_0_of_exported_class_has_or_is_using_private_type_1: string;
        Property_0_of_exported_interface_has_or_is_using_private_type_1: string;
        Exported_variable_0_has_or_is_using_private_type_1: string;
        Public_static_property_0_of_exported_class_is_using_inaccessible_module_1: string;
        Public_property_0_of_exported_class_is_using_inaccessible_module_1: string;
        Property_0_of_exported_interface_is_using_inaccessible_module_1: string;
        Exported_variable_0_is_using_inaccessible_module_1: string;
        Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1: string;
        Parameter_0_of_method_from_exported_interface_has_or_is_using_private_type_1: string;
        Parameter_0_of_exported_function_has_or_is_using_private_type_1: string;
        Parameter_0_of_constructor_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_static_property_setter_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_property_setter_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_call_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_static_method_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_public_method_from_exported_class_is_using_inaccessible_module_1: string;
        Parameter_0_of_method_from_exported_interface_is_using_inaccessible_module_1: string;
        Parameter_0_of_exported_function_is_using_inaccessible_module_1: string;
        Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_public_method_from_exported_class_has_or_is_using_private_type_0: string;
        Return_type_of_method_from_exported_interface_has_or_is_using_private_type_0: string;
        Return_type_of_exported_function_has_or_is_using_private_type_0: string;
        Return_type_of_public_static_property_getter_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_public_property_getter_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_call_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_index_signature_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_public_static_method_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_public_method_from_exported_class_is_using_inaccessible_module_0: string;
        Return_type_of_method_from_exported_interface_is_using_inaccessible_module_0: string;
        Return_type_of_exported_function_is_using_inaccessible_module_0: string;
        new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead: string;
        A_parameter_list_must_follow_a_generic_type_argument_list_expected: string;
        Multiple_constructor_implementations_are_not_allowed: string;
        Cannot_find_external_module_0: string;
        Module_cannot_be_aliased_to_a_non_module_type: string;
        A_class_may_only_extend_another_class: string;
        A_class_may_only_implement_another_class_or_interface: string;
        An_interface_may_only_extend_a_class_or_another_interface: string;
        Unable_to_resolve_type: string;
        Unable_to_resolve_type_of_0: string;
        Unable_to_resolve_type_parameter_constraint: string;
        Type_parameter_constraint_cannot_be_a_primitive_type: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target: string;
        Supplied_parameters_do_not_match_any_signature_of_call_target_NL_0: string;
        Cannot_use_new_with_an_expression_whose_type_lacks_a_signature: string;
        Only_a_void_function_can_be_called_with_the_new_keyword: string;
        Could_not_select_overload_for_new_expression: string;
        Type_0_does_not_satisfy_the_constraint_1: string;
        Could_not_select_overload_for_call_expression: string;
        Cannot_invoke_an_expression_whose_type_lacks_a_call_signature: string;
        Calls_to_super_are_only_valid_inside_a_class: string;
        Generic_type_0_requires_1_type_argument_s: string;
        Type_of_array_literal_cannot_be_determined_Best_common_type_could_not_be_found_for_array_elements: string;
        Could_not_find_enclosing_symbol_for_dotted_name_0: string;
        Property_0_does_not_exist_on_value_of_type_1: string;
        Cannot_find_name_0: string;
        get_and_set_accessor_must_have_the_same_type: string;
        this_cannot_be_referenced_in_current_location: string;
        Static_members_cannot_reference_class_type_parameters: string;
        Type_0_recursively_references_itself_as_a_base_type: string;
        super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class: string;
        super_can_only_be_referenced_in_a_derived_class: string;
        A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties: string;
        Constructors_for_derived_classes_must_contain_a_super_call: string;
        Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors: string;
        _0_1_is_inaccessible: string;
        this_cannot_be_referenced_in_a_module_body: string;
        Invalid_expression_types_not_known_to_support_the_addition_operator: string;
        The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type: string;
        An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type: string;
        Variable_declarations_of_a_for_statement_cannot_use_a_type_annotation: string;
        Variable_declarations_of_a_for_statement_must_be_of_types_string_or_any: string;
        The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number: string;
        The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter: string;
        The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type: string;
        Setters_cannot_return_a_value: string;
        Tried_to_query_type_of_uninitialized_module_0: string;
        Tried_to_set_variable_type_to_uninitialized_module_type_0: string;
        Type_0_is_not_generic: string;
        Getters_must_return_a_value: string;
        Getter_and_setter_accessors_do_not_agree_in_visibility: string;
        Invalid_left_hand_side_of_assignment_expression: string;
        Function_declared_a_non_void_return_type_but_has_no_return_expression: string;
        Cannot_resolve_return_type_reference: string;
        Constructors_cannot_have_a_return_type_of_void: string;
        Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2: string;
        All_symbols_within_a_with_block_will_be_resolved_to_any: string;
        Import_declarations_in_an_internal_module_cannot_reference_an_external_module: string;
        Class_0_declares_interface_1_but_does_not_implement_it_NL_2: string;
        Class_0_declares_class_1_as_an_interface_but_does_not_implement_it_NL_2: string;
        The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer: string;
        this_cannot_be_referenced_in_a_static_property_initializer: string;
        Class_0_cannot_extend_class_1_NL_2: string;
        Interface_0_cannot_extend_class_1_NL_2: string;
        Interface_0_cannot_extend_interface_1_NL_2: string;
        Overload_signature_is_not_compatible_with_function_definition: string;
        Overload_signature_is_not_compatible_with_function_definition_NL_0: string;
        Overload_signatures_must_all_be_public_or_private: string;
        Overload_signatures_must_all_be_exported_or_not_exported: string;
        Overload_signatures_must_all_be_ambient_or_non_ambient: string;
        Overload_signatures_must_all_be_optional_or_required: string;
        Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature: string;
        this_cannot_be_referenced_in_constructor_arguments: string;
        Instance_member_cannot_be_accessed_off_a_class: string;
        Untyped_function_calls_may_not_accept_type_arguments: string;
        Non_generic_functions_may_not_accept_type_arguments: string;
        A_generic_type_may_not_reference_itself_with_a_wrapped_form_of_its_own_type_parameters: string;
        A_rest_parameter_must_be_of_an_array_type: string;
        Overload_signature_implementation_cannot_use_specialized_type: string;
        Export_assignments_may_only_be_used_at_the_top_level_of_external_modules: string;
        Export_assignments_may_only_be_made_with_variables_functions_classes_interfaces_enums_and_internal_modules: string;
        Only_public_methods_of_the_base_class_are_accessible_via_the_super_keyword: string;
        Numeric_indexer_type_0_must_be_assignable_to_string_indexer_type_1: string;
        Numeric_indexer_type_0_must_be_assignable_to_string_indexer_type_1_NL_2: string;
        All_numerically_named_properties_must_be_assignable_to_numeric_indexer_type_0: string;
        All_numerically_named_properties_must_be_assignable_to_numeric_indexer_type_0_NL_1: string;
        All_named_properties_must_be_assignable_to_string_indexer_type_0: string;
        All_named_properties_must_be_assignable_to_string_indexer_type_0_NL_1: string;
        A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation: string;
        Function_expression_declared_a_non_void_return_type_but_has_no_return_expression: string;
        Import_declaration_referencing_identifier_from_internal_module_can_only_be_made_with_variables_functions_classes_interfaces_enums_and_internal_modules: string;
        Module_0_has_no_exported_member_1: string;
        Unable_to_resolve_module_reference_0: string;
        Could_not_find_module_0_in_module_1: string;
        Exported_import_declaration_0_is_assigned_value_with_type_that_has_or_is_using_private_type_1: string;
        Exported_import_declaration_0_is_assigned_value_with_type_that_is_using_inaccessible_module_1: string;
        Exported_import_declaration_0_is_assigned_type_that_has_or_is_using_private_type_1: string;
        Exported_import_declaration_0_is_assigned_type_that_is_using_inaccessible_module_1: string;
        Exported_import_declaration_0_is_assigned_container_that_is_or_is_using_inaccessible_module_1: string;
        Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_1: string;
        Internal_module_reference_0_in_import_declaration_does_not_reference_module_instance_for_1: string;
        Module_0_cannot_merge_with_previous_declaration_of_1_in_a_different_file_2: string;
        Interface_0_cannot_simultaneously_extend_types_1_and_2_NL_3: string;
        Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it: string;
        Ambient_external_module_declaration_cannot_be_reopened: string;
        All_declarations_of_merged_declaration_0_must_be_exported_or_not_exported: string;
        super_cannot_be_referenced_in_constructor_arguments: string;
        Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class: string;
        Ambient_external_module_declaration_must_be_defined_in_global_context: string;
        Ambient_external_module_declaration_cannot_specify_relative_module_name: string;
        Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name: string;
        No_best_common_type_exists_among_return_expressions: string;
        Import_declaration_cannot_refer_to_external_module_reference_when_noResolve_option_is_set: string;
        Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference: string;
        Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference: string;
        Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference: string;
        Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference: string;
        TypeParameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_method_from_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_function_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_constructor_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_call_signature_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_public_static_method_from_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_public_method_from_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_method_from_exported_interface_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_function_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_class_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_interface_has_or_is_using_private_type_1: string;
        TypeParameter_0_of_exported_class_is_using_inaccessible_module_1: string;
        TypeParameter_0_of_exported_interface_is_using_inaccessible_module_1: string;
        Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter: string;
        Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters: string;
        No_best_common_type_exists_between_0_and_1: string;
        No_best_common_type_exists_between_0_1_and_2: string;
        Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module: string;
        Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list: string;
        Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor: string;
        Parameter_0_cannot_be_referenced_in_its_initializer: string;
        Duplicate_string_index_signature: string;
        Duplicate_number_index_signature: string;
        All_declarations_of_an_interface_must_have_identical_type_parameters: string;
        Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter: string;
        Neither_type_0_nor_type_1_is_assignable_to_the_other: string;
        Neither_type_0_nor_type_1_is_assignable_to_the_other_NL_2: string;
        Duplicate_function_implementation: string;
        Function_implementation_expected: string;
        Function_overload_name_must_be_0: string;
        Constructor_implementation_expected: string;
        Class_name_cannot_be_0: string;
        Interface_name_cannot_be_0: string;
        Enum_name_cannot_be_0: string;
        A_module_cannot_have_multiple_export_assignments: string;
        Export_assignment_not_allowed_in_module_with_exported_element: string;
        A_parameter_property_is_only_allowed_in_a_constructor_implementation: string;
        Function_overload_must_be_static: string;
        Function_overload_must_not_be_static: string;
        Type_0_is_missing_property_1_from_type_2: string;
        Types_of_property_0_of_types_1_and_2_are_incompatible: string;
        Types_of_property_0_of_types_1_and_2_are_incompatible_NL_3: string;
        Property_0_defined_as_private_in_type_1_is_defined_as_public_in_type_2: string;
        Property_0_defined_as_public_in_type_1_is_defined_as_private_in_type_2: string;
        Types_0_and_1_define_property_2_as_private: string;
        Call_signatures_of_types_0_and_1_are_incompatible: string;
        Call_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Type_0_requires_a_call_signature_but_type_1_lacks_one: string;
        Construct_signatures_of_types_0_and_1_are_incompatible: string;
        Construct_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Type_0_requires_a_construct_signature_but_type_1_lacks_one: string;
        Index_signatures_of_types_0_and_1_are_incompatible: string;
        Index_signatures_of_types_0_and_1_are_incompatible_NL_2: string;
        Call_signature_expects_0_or_fewer_parameters: string;
        Could_not_apply_type_0_to_argument_1_which_is_of_type_2: string;
        Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function: string;
        Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function: string;
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor: string;
        Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property: string;
        Types_of_static_property_0_of_class_1_and_class_2_are_incompatible: string;
        Types_of_static_property_0_of_class_1_and_class_2_are_incompatible_NL_3: string;
        Type_reference_cannot_refer_to_container_0: string;
        Type_reference_must_refer_to_type: string;
        In_enums_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_the_first_enum_element: string;
        _0_overload_s: string;
        Variable_declaration_cannot_have_the_same_name_as_an_import_declaration: string;
        Signature_expected_0_type_arguments_got_1_instead: string;
        Property_0_defined_as_optional_in_type_1_but_is_required_in_type_2: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_do_not_refer_to_same_named_type: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_have_incompatible_type_arguments: string;
        Types_0_and_1_originating_in_infinitely_expanding_type_reference_have_incompatible_type_arguments_NL_2: string;
        Named_properties_0_of_types_1_and_2_are_not_identical: string;
        Types_of_string_indexer_of_types_0_and_1_are_not_identical: string;
        Types_of_number_indexer_of_types_0_and_1_are_not_identical: string;
        Type_of_number_indexer_in_type_0_is_not_assignable_to_string_indexer_type_in_type_1_NL_2: string;
        Type_of_property_0_in_type_1_is_not_assignable_to_string_indexer_type_in_type_2_NL_3: string;
        Type_of_property_0_in_type_1_is_not_assignable_to_number_indexer_type_in_type_2_NL_3: string;
        Static_property_0_defined_as_private_in_type_1_is_defined_as_public_in_type_2: string;
        Static_property_0_defined_as_public_in_type_1_is_defined_as_private_in_type_2: string;
        Types_0_and_1_define_static_property_2_as_private: string;
        Current_host_does_not_support_0_option: string;
        ECMAScript_target_version_0_not_supported_Specify_a_valid_target_version_1_default_or_2: string;
        Argument_for_0_option_must_be_1_or_2: string;
        Could_not_find_file_0: string;
        A_file_cannot_have_a_reference_to_itself: string;
        Cannot_resolve_referenced_file_0: string;
        Cannot_find_the_common_subdirectory_path_for_the_input_files: string;
        Emit_Error_0: string;
        Cannot_read_file_0_1: string;
        Unsupported_file_encoding: string;
        Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1: string;
        Unsupported_locale_0: string;
        Execution_Failed_NL: string;
        Invalid_call_to_up: string;
        Invalid_call_to_down: string;
        Base64_value_0_finished_with_a_continuation_bit: string;
        Unknown_compiler_option_0: string;
        Expected_0_arguments_to_message_got_1_instead: string;
        Expected_the_message_0_to_have_1_arguments_but_it_had_2: string;
        Could_not_delete_file_0: string;
        Could_not_create_directory_0: string;
        Error_while_executing_file_0: string;
        Cannot_compile_external_modules_unless_the_module_flag_is_provided: string;
        Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Options_mapRoot_and_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option: string;
        Option_0_specified_without_1: string;
        codepage_option_not_supported_on_current_platform: string;
        Concatenate_and_emit_output_to_single_file: string;
        Generates_corresponding_0_file: string;
        Specifies_the_location_where_debugger_should_locate_map_files_instead_of_generated_locations: string;
        Specifies_the_location_where_debugger_should_locate_TypeScript_files_instead_of_source_locations: string;
        Watch_input_files: string;
        Redirect_output_structure_to_the_directory: string;
        Do_not_emit_comments_to_output: string;
        Skip_resolution_and_preprocessing: string;
        Specify_ECMAScript_target_version_0_default_or_1: string;
        Specify_module_code_generation_0_or_1: string;
        Print_this_message: string;
        Print_the_compiler_s_version_0: string;
        Allow_use_of_deprecated_0_keyword_when_referencing_an_external_module: string;
        Specify_locale_for_errors_and_messages_For_example_0_or_1: string;
        Syntax_0: string;
        options: string;
        file1: string;
        Examples: string;
        Options: string;
        Insert_command_line_options_and_files_from_a_file: string;
        Version_0: string;
        Use_the_0_flag_to_see_options: string;
        NL_Recompiling_0: string;
        STRING: string;
        KIND: string;
        file2: string;
        VERSION: string;
        LOCATION: string;
        DIRECTORY: string;
        NUMBER: string;
        Specify_the_codepage_to_use_when_opening_source_files: string;
        Additional_locations: string;
        This_version_of_the_Javascript_runtime_does_not_support_the_0_function: string;
        Unknown_rule: string;
        Invalid_line_number_0: string;
        Warn_on_expressions_and_declarations_with_an_implied_any_type: string;
        Variable_0_implicitly_has_an_any_type: string;
        Parameter_0_of_1_implicitly_has_an_any_type: string;
        Parameter_0_of_function_type_implicitly_has_an_any_type: string;
        Member_0_of_object_type_implicitly_has_an_any_type: string;
        new_expression_which_lacks_a_constructor_signature_implicitly_has_an_any_type: string;
        _0_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Function_expression_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Parameter_0_of_lambda_function_implicitly_has_an_any_type: string;
        Constructor_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Lambda_Function_which_lacks_return_type_annotation_implicitly_has_an_any_return_type: string;
        Array_Literal_implicitly_has_an_any_type_from_widening: string;
        _0_which_lacks_get_accessor_and_parameter_type_annotation_on_set_accessor_implicitly_has_an_any_type: string;
        Index_signature_of_object_type_implicitly_has_an_any_type: string;
        Object_literal_s_property_0_implicitly_has_an_any_type_from_widening: string;
    };
}
declare module TypeScript {
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
        NoPrefix = 3,
    }
}
declare module TypeScript {
    var diagnosticInformationMap: ts.Map<any>;
}
declare module TypeScript {
    class ArrayUtilities {
        static sequenceEquals<T>(array1: T[], array2: T[], equals: (v1: T, v2: T) => boolean): boolean;
        static contains<T>(array: T[], value: T): boolean;
        static distinct<T>(array: T[], equalsFn?: (a: T, b: T) => boolean): T[];
        static last<T>(array: T[]): T;
        static lastOrDefault<T>(array: T[], predicate: (v: T, index: number) => boolean): T;
        static firstOrDefault<T>(array: T[], func: (v: T, index: number) => boolean): T;
        static first<T>(array: T[], func?: (v: T, index: number) => boolean): T;
        static sum<T>(array: T[], func: (v: T) => number): number;
        static select<T, S>(values: T[], func: (v: T) => S): S[];
        static where<T>(values: T[], func: (v: T) => boolean): T[];
        static any<T>(array: T[], func: (v: T) => boolean): boolean;
        static all<T>(array: T[], func: (v: T) => boolean): boolean;
        static binarySearch(array: number[], value: number): number;
        static createArray<T>(length: number, defaultValue: any): T[];
        static grow<T>(array: T[], length: number, defaultValue: T): void;
        static copy<T>(sourceArray: T[], sourceIndex: number, destinationArray: T[], destinationIndex: number, length: number): void;
        static indexOf<T>(array: T[], predicate: (v: T) => boolean): number;
    }
}
declare module TypeScript {
    enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }
    class Debug {
        private static currentAssertionLevel;
        static shouldAssert(level: AssertionLevel): boolean;
        static assert(expression: any, message?: string, verboseDebugInfo?: () => string): void;
        static fail(message?: string): void;
    }
}
declare module TypeScript {
    class Location {
        private _fileName;
        private _lineMap;
        private _start;
        private _length;
        constructor(fileName: string, lineMap: LineMap, start: number, length: number);
        fileName(): string;
        lineMap(): LineMap;
        line(): number;
        character(): number;
        start(): number;
        length(): number;
        static equals(location1: Location, location2: Location): boolean;
    }
    class Diagnostic extends Location {
        private _diagnosticKey;
        private _arguments;
        private _additionalLocations;
        constructor(fileName: string, lineMap: LineMap, start: number, length: number, diagnosticKey: string, _arguments?: any[], additionalLocations?: Location[]);
        toJSON(key: any): any;
        diagnosticKey(): string;
        arguments(): any[];
        text(): string;
        message(): string;
        additionalLocations(): Location[];
        static equals(diagnostic1: Diagnostic, diagnostic2: Diagnostic): boolean;
        info(): DiagnosticInfo;
    }
    function newLine(): string;
    function getLocalizedText(diagnosticKey: string, args: any[]): string;
    function getDiagnosticMessage(diagnosticKey: string, args: any[]): string;
}
declare module TypeScript {
    interface DiagnosticInfo {
        category: DiagnosticCategory;
        message: string;
        code: number;
    }
}
declare module TypeScript {
    class Errors {
        static argument(argument: string, message?: string): Error;
        static argumentOutOfRange(argument: string): Error;
        static argumentNull(argument: string): Error;
        static abstract(): Error;
        static notYetImplemented(): Error;
        static invalidOperation(message?: string): Error;
    }
}
declare module TypeScript {
    module IntegerUtilities {
        function integerDivide(numerator: number, denominator: number): number;
        function integerMultiplyLow32Bits(n1: number, n2: number): number;
        function isInteger(text: string): boolean;
        function isHexInteger(text: string): boolean;
    }
}
declare module TypeScript {
    class LineMap {
        private _computeLineStarts;
        private length;
        static empty: LineMap;
        private _lineStarts;
        constructor(_computeLineStarts: () => number[], length: number);
        toJSON(key: any): {
            lineStarts: number[];
            length: number;
        };
        equals(other: LineMap): boolean;
        lineStarts(): number[];
        lineCount(): number;
        getPosition(line: number, character: number): number;
        getLineNumberFromPosition(position: number): number;
        getLineStartPosition(lineNumber: number): number;
        fillLineAndCharacterFromPosition(position: number, lineAndCharacter: ILineAndCharacter): void;
        getLineAndCharacterFromPosition(position: number): LineAndCharacter;
    }
}
declare module TypeScript {
    class LineAndCharacter {
        private _line;
        private _character;
        constructor(line: number, character: number);
        line(): number;
        character(): number;
    }
}
declare module TypeScript {
    class StringUtilities {
        static isString(value: any): boolean;
        static endsWith(string: string, value: string): boolean;
        static startsWith(string: string, value: string): boolean;
        static repeat(value: string, count: number): string;
    }
}
declare module TypeScript {
    enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        backtick = 96,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
}
declare module TypeScript {
    interface IScriptSnapshot {
        getText(start: number, end: number): string;
        getLength(): number;
        getLineStartPositions(): number[];
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }
    module ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
}
declare module TypeScript {
    interface ISimpleText {
        length(): number;
        substr(start: number, length: number): string;
        charCodeAt(index: number): number;
        lineMap(): LineMap;
    }
}
declare module TypeScript {
    module LineMap1 {
        function fromSimpleText(text: ISimpleText): LineMap;
        function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): LineMap;
        function fromString(text: string): LineMap;
    }
}
declare module TypeScript.SimpleText {
    function fromString(value: string): ISimpleText;
    function fromScriptSnapshot(scriptSnapshot: IScriptSnapshot): ISimpleText;
}
declare module TypeScript.TextUtilities {
    interface ICharacterSequence {
        charCodeAt(index: number): number;
        length: number;
    }
    function parseLineStarts(text: ICharacterSequence): number[];
    function getLengthOfLineBreakSlow(text: ICharacterSequence, index: number, c: number): number;
    function getLengthOfLineBreak(text: ICharacterSequence, index: number): number;
    function isAnyLineBreakCharacter(c: number): boolean;
}
declare module TypeScript {
    interface ISpan {
        start(): number;
        end(): number;
    }
    class TextSpan implements ISpan {
        private _start;
        private _length;
        constructor(start: number, length: number);
        toJSON(key: any): any;
        start(): number;
        length(): number;
        end(): number;
        isEmpty(): boolean;
        containsPosition(position: number): boolean;
        containsTextSpan(span: TextSpan): boolean;
        overlapsWith(span: TextSpan): boolean;
        overlap(span: TextSpan): TextSpan;
        intersectsWithTextSpan(span: TextSpan): boolean;
        intersectsWith(start: number, length: number): boolean;
        intersectsWithPosition(position: number): boolean;
        intersection(span: TextSpan): TextSpan;
        static fromBounds(start: number, end: number): TextSpan;
    }
}
declare module TypeScript {
    class TextChangeRange {
        static unchanged: TextChangeRange;
        private _span;
        private _newLength;
        constructor(span: TextSpan, newLength: number);
        span(): TextSpan;
        newLength(): number;
        newSpan(): TextSpan;
        isUnchanged(): boolean;
        static collapseChangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange;
    }
}
declare module TypeScript {
    module CharacterInfo {
        function isDecimalDigit(c: number): boolean;
        function isOctalDigit(c: number): boolean;
        function isHexDigit(c: number): boolean;
        function hexValue(c: number): number;
        function isWhitespace(ch: number): boolean;
        function isLineTerminator(ch: number): boolean;
    }
}
declare module TypeScript {
    enum SyntaxConstants {
        None = 0,
        NodeDataComputed = 1,
        NodeIncrementallyUnusableMask = 2,
        NodeParsedInStrictModeMask = 4,
        NodeFullWidthShift = 3,
    }
}
declare module TypeScript {
    class FormattingOptions {
        useTabs: boolean;
        spacesPerTab: number;
        indentSpaces: number;
        newLineCharacter: string;
        constructor(useTabs: boolean, spacesPerTab: number, indentSpaces: number, newLineCharacter: string);
        static defaultOptions: FormattingOptions;
    }
}
declare module TypeScript {
}
declare module TypeScript {
    enum SyntaxKind {
        None = 0,
        List = 1,
        WhitespaceTrivia = 2,
        NewLineTrivia = 3,
        MultiLineCommentTrivia = 4,
        SingleLineCommentTrivia = 5,
        SkippedTokenTrivia = 6,
        ErrorToken = 7,
        EndOfFileToken = 8,
        IdentifierName = 9,
        RegularExpressionLiteral = 10,
        NumericLiteral = 11,
        StringLiteral = 12,
        NoSubstitutionTemplateToken = 13,
        TemplateStartToken = 14,
        TemplateMiddleToken = 15,
        TemplateEndToken = 16,
        BreakKeyword = 17,
        CaseKeyword = 18,
        CatchKeyword = 19,
        ContinueKeyword = 20,
        DebuggerKeyword = 21,
        DefaultKeyword = 22,
        DeleteKeyword = 23,
        DoKeyword = 24,
        ElseKeyword = 25,
        FalseKeyword = 26,
        FinallyKeyword = 27,
        ForKeyword = 28,
        FunctionKeyword = 29,
        IfKeyword = 30,
        InKeyword = 31,
        InstanceOfKeyword = 32,
        NewKeyword = 33,
        NullKeyword = 34,
        ReturnKeyword = 35,
        SwitchKeyword = 36,
        ThisKeyword = 37,
        ThrowKeyword = 38,
        TrueKeyword = 39,
        TryKeyword = 40,
        TypeOfKeyword = 41,
        VarKeyword = 42,
        VoidKeyword = 43,
        WhileKeyword = 44,
        WithKeyword = 45,
        ClassKeyword = 46,
        ConstKeyword = 47,
        EnumKeyword = 48,
        ExportKeyword = 49,
        ExtendsKeyword = 50,
        ImportKeyword = 51,
        SuperKeyword = 52,
        ImplementsKeyword = 53,
        InterfaceKeyword = 54,
        LetKeyword = 55,
        PackageKeyword = 56,
        PrivateKeyword = 57,
        ProtectedKeyword = 58,
        PublicKeyword = 59,
        StaticKeyword = 60,
        YieldKeyword = 61,
        AnyKeyword = 62,
        BooleanKeyword = 63,
        ConstructorKeyword = 64,
        DeclareKeyword = 65,
        GetKeyword = 66,
        ModuleKeyword = 67,
        RequireKeyword = 68,
        NumberKeyword = 69,
        SetKeyword = 70,
        StringKeyword = 71,
        OpenBraceToken = 72,
        CloseBraceToken = 73,
        OpenParenToken = 74,
        CloseParenToken = 75,
        OpenBracketToken = 76,
        CloseBracketToken = 77,
        DotToken = 78,
        DotDotDotToken = 79,
        SemicolonToken = 80,
        CommaToken = 81,
        LessThanToken = 82,
        GreaterThanToken = 83,
        LessThanEqualsToken = 84,
        GreaterThanEqualsToken = 85,
        EqualsEqualsToken = 86,
        EqualsGreaterThanToken = 87,
        ExclamationEqualsToken = 88,
        EqualsEqualsEqualsToken = 89,
        ExclamationEqualsEqualsToken = 90,
        PlusToken = 91,
        MinusToken = 92,
        AsteriskToken = 93,
        PercentToken = 94,
        PlusPlusToken = 95,
        MinusMinusToken = 96,
        LessThanLessThanToken = 97,
        GreaterThanGreaterThanToken = 98,
        GreaterThanGreaterThanGreaterThanToken = 99,
        AmpersandToken = 100,
        BarToken = 101,
        CaretToken = 102,
        ExclamationToken = 103,
        TildeToken = 104,
        AmpersandAmpersandToken = 105,
        BarBarToken = 106,
        QuestionToken = 107,
        ColonToken = 108,
        EqualsToken = 109,
        PlusEqualsToken = 110,
        MinusEqualsToken = 111,
        AsteriskEqualsToken = 112,
        PercentEqualsToken = 113,
        LessThanLessThanEqualsToken = 114,
        GreaterThanGreaterThanEqualsToken = 115,
        GreaterThanGreaterThanGreaterThanEqualsToken = 116,
        AmpersandEqualsToken = 117,
        BarEqualsToken = 118,
        CaretEqualsToken = 119,
        SlashToken = 120,
        SlashEqualsToken = 121,
        SourceUnit = 122,
        QualifiedName = 123,
        ObjectType = 124,
        FunctionType = 125,
        ArrayType = 126,
        ConstructorType = 127,
        GenericType = 128,
        TypeQuery = 129,
        TupleType = 130,
        UnionType = 131,
        ParenthesizedType = 132,
        InterfaceDeclaration = 133,
        FunctionDeclaration = 134,
        ModuleDeclaration = 135,
        ClassDeclaration = 136,
        EnumDeclaration = 137,
        ImportDeclaration = 138,
        ExportAssignment = 139,
        MemberFunctionDeclaration = 140,
        MemberVariableDeclaration = 141,
        ConstructorDeclaration = 142,
        IndexMemberDeclaration = 143,
        GetAccessor = 144,
        SetAccessor = 145,
        PropertySignature = 146,
        CallSignature = 147,
        ConstructSignature = 148,
        IndexSignature = 149,
        MethodSignature = 150,
        Block = 151,
        IfStatement = 152,
        VariableStatement = 153,
        ExpressionStatement = 154,
        ReturnStatement = 155,
        SwitchStatement = 156,
        BreakStatement = 157,
        ContinueStatement = 158,
        ForStatement = 159,
        ForInStatement = 160,
        EmptyStatement = 161,
        ThrowStatement = 162,
        WhileStatement = 163,
        TryStatement = 164,
        LabeledStatement = 165,
        DoStatement = 166,
        DebuggerStatement = 167,
        WithStatement = 168,
        PrefixUnaryExpression = 169,
        DeleteExpression = 170,
        TypeOfExpression = 171,
        VoidExpression = 172,
        ConditionalExpression = 173,
        BinaryExpression = 174,
        PostfixUnaryExpression = 175,
        MemberAccessExpression = 176,
        InvocationExpression = 177,
        ArrayLiteralExpression = 178,
        ObjectLiteralExpression = 179,
        ObjectCreationExpression = 180,
        ParenthesizedExpression = 181,
        ParenthesizedArrowFunctionExpression = 182,
        SimpleArrowFunctionExpression = 183,
        CastExpression = 184,
        ElementAccessExpression = 185,
        FunctionExpression = 186,
        OmittedExpression = 187,
        TemplateExpression = 188,
        TemplateAccessExpression = 189,
        VariableDeclaration = 190,
        VariableDeclarator = 191,
        ArgumentList = 192,
        ParameterList = 193,
        TypeArgumentList = 194,
        TypeParameterList = 195,
        HeritageClause = 196,
        EqualsValueClause = 197,
        CaseSwitchClause = 198,
        DefaultSwitchClause = 199,
        ElseClause = 200,
        CatchClause = 201,
        FinallyClause = 202,
        TemplateClause = 203,
        TypeParameter = 204,
        Constraint = 205,
        SimplePropertyAssignment = 206,
        FunctionPropertyAssignment = 207,
        Parameter = 208,
        EnumElement = 209,
        TypeAnnotation = 210,
        ComputedPropertyName = 211,
        ExternalModuleReference = 212,
        ModuleNameModuleReference = 213,
        FirstStandardKeyword,
        LastStandardKeyword,
        FirstFutureReservedKeyword,
        LastFutureReservedKeyword,
        FirstFutureReservedStrictKeyword,
        LastFutureReservedStrictKeyword,
        FirstTypeScriptKeyword,
        LastTypeScriptKeyword,
        FirstKeyword,
        LastKeyword,
        FirstToken,
        LastToken,
        FirstPunctuation,
        LastPunctuation,
        FirstFixedWidth,
        LastFixedWidth,
        FirstTrivia,
        LastTrivia,
        FirstNode,
        LastNode,
    }
}
declare module TypeScript.SyntaxFacts {
    function getTokenKind(text: string): SyntaxKind;
    function getText(kind: SyntaxKind): string;
    function isAnyKeyword(kind: SyntaxKind): boolean;
    function isAnyPunctuation(kind: SyntaxKind): boolean;
    function isPrefixUnaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function isBinaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean;
    function isAssignmentOperatorToken(tokenKind: SyntaxKind): boolean;
    function isType(kind: SyntaxKind): boolean;
}
declare module TypeScript.Scanner {
    function isContextualToken(token: ISyntaxToken): boolean;
    interface DiagnosticCallback {
        (position: number, width: number, key: string, arguments: any[]): void;
    }
    interface IScanner {
        setIndex(index: number): void;
        scan(allowContextualToken: boolean): ISyntaxToken;
    }
    function createScanner(languageVersion: ts.ScriptTarget, text: ISimpleText, reportDiagnostic: DiagnosticCallback): IScanner;
    function isValidIdentifier(text: ISimpleText, languageVersion: ts.ScriptTarget): boolean;
    interface IScannerParserSource extends Parser.IParserSource {
        absolutePosition(): number;
        resetToPosition(absolutePosition: number): void;
    }
    function createParserSource(fileName: string, text: ISimpleText, languageVersion: ts.ScriptTarget): IScannerParserSource;
}
declare module TypeScript {
    module ScannerUtilities {
        function identifierKind(str: string, start: number, length: number): SyntaxKind;
    }
}
declare module TypeScript {
    interface ISlidingWindowSource {
        (argument: any): any;
    }
    class SlidingWindow {
        private fetchNextItem;
        window: any[];
        private defaultValue;
        private sourceLength;
        windowCount: number;
        windowAbsoluteStartIndex: number;
        currentRelativeItemIndex: number;
        private _pinCount;
        private firstPinnedAbsoluteIndex;
        constructor(fetchNextItem: ISlidingWindowSource, window: any[], defaultValue: any, sourceLength?: number);
        private addMoreItemsToWindow(argument);
        private tryShiftOrGrowWindow();
        absoluteIndex(): number;
        isAtEndOfSource(): boolean;
        getAndPinAbsoluteIndex(): number;
        releaseAndUnpinAbsoluteIndex(absoluteIndex: number): void;
        rewindToPinnedIndex(absoluteIndex: number): void;
        currentItem(argument: any): any;
        peekItemN(n: number): any;
        moveToNextItem(): void;
        disgardAllItemsFromCurrentIndexOnwards(): void;
    }
}
declare module TypeScript.Syntax {
    var _nextSyntaxID: number;
    function nodeHasSkippedOrMissingTokens(node: ISyntaxNode): boolean;
    function isUnterminatedStringLiteral(token: ISyntaxToken): boolean;
    function isUnterminatedMultilineCommentTrivia(trivia: ISyntaxTrivia): boolean;
    function isEntirelyInsideCommentTrivia(trivia: ISyntaxTrivia, fullStart: number, position: number): boolean;
    function isEntirelyInsideComment(sourceUnit: SourceUnitSyntax, position: number): boolean;
    function isEntirelyInStringOrRegularExpressionLiteral(sourceUnit: SourceUnitSyntax, position: number): boolean;
    function getAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): ISyntaxElement;
    function hasAncestorOfKind(positionedToken: ISyntaxElement, kind: SyntaxKind): boolean;
    function isIntegerLiteral(expression: IExpressionSyntax): boolean;
    function containingNode(element: ISyntaxElement): ISyntaxNode;
    function findTokenOnLeft(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken;
    function findCompleteTokenOnLeft(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken;
    function firstTokenInLineContainingPosition(syntaxTree: SyntaxTree, position: number): ISyntaxToken;
}
declare module TypeScript {
    function syntaxTree(element: ISyntaxElement): SyntaxTree;
    function parsedInStrictMode(node: ISyntaxNode): boolean;
    function previousToken(token: ISyntaxToken): ISyntaxToken;
    function findToken(sourceUnit: SourceUnitSyntax, position: number): ISyntaxToken;
    function findSkippedTokenInPositionedToken(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function findSkippedTokenInLeadingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function findSkippedTokenInTrailingTriviaList(positionedToken: ISyntaxToken, position: number): ISyntaxToken;
    function nextToken(token: ISyntaxToken, text?: ISimpleText): ISyntaxToken;
    function isNode(element: ISyntaxElement): boolean;
    function isToken(element: ISyntaxElement): boolean;
    function isList(element: ISyntaxElement): boolean;
    function syntaxID(element: ISyntaxElement): number;
    function fullText(element: ISyntaxElement, text?: ISimpleText): string;
    function leadingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number;
    function trailingTriviaWidth(element: ISyntaxElement, text?: ISimpleText): number;
    function firstToken(element: ISyntaxElement): ISyntaxToken;
    function lastToken(element: ISyntaxElement): ISyntaxToken;
    function fullStart(element: ISyntaxElement): number;
    function fullWidth(element: ISyntaxElement): number;
    function isIncrementallyUnusable(element: ISyntaxElement): boolean;
    function start(element: ISyntaxElement, text?: ISimpleText): number;
    function end(element: ISyntaxElement, text?: ISimpleText): number;
    function width(element: ISyntaxElement, text?: ISimpleText): number;
    function fullEnd(element: ISyntaxElement): number;
    function existsNewLineBetweenTokens(token1: ISyntaxToken, token2: ISyntaxToken, text: ISimpleText): boolean;
    interface ISyntaxElement {
        kind: SyntaxKind;
        parent: ISyntaxElement;
    }
    interface ISyntaxNode extends ISyntaxNodeOrToken {
        __data: number;
        __cachedTokens: ISyntaxToken[];
    }
    interface IModuleReferenceSyntax extends ISyntaxNode {
        _moduleReferenceBrand: any;
    }
    interface IModuleElementSyntax extends ISyntaxNode {
        _moduleElementBrand: any;
    }
    interface IStatementSyntax extends IModuleElementSyntax {
        _statementBrand: any;
    }
    interface ITypeMemberSyntax extends ISyntaxNode {
        _typeMemberBrand: any;
    }
    interface IClassElementSyntax extends ISyntaxNode {
        _classElementBrand: any;
    }
    interface IMemberDeclarationSyntax extends IClassElementSyntax {
        _memberDeclarationBrand: any;
    }
    interface IPropertyAssignmentSyntax extends ISyntaxNodeOrToken {
        _propertyAssignmentBrand: any;
    }
    interface IAccessorSyntax extends IPropertyAssignmentSyntax, IMemberDeclarationSyntax {
        _accessorBrand: any;
        modifiers: ISyntaxToken[];
        propertyName: IPropertyNameSyntax;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface ISwitchClauseSyntax extends ISyntaxNode {
        _switchClauseBrand: any;
        statements: IStatementSyntax[];
    }
    interface IExpressionSyntax extends ISyntaxNodeOrToken {
        _expressionBrand: any;
    }
    interface IUnaryExpressionSyntax extends IExpressionSyntax {
        _unaryExpressionBrand: any;
    }
    interface IPostfixExpressionSyntax extends IUnaryExpressionSyntax {
        _postfixExpressionBrand: any;
    }
    interface ILeftHandSideExpressionSyntax extends IPostfixExpressionSyntax {
        _leftHandSideExpressionBrand: any;
    }
    interface IMemberExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _memberExpressionBrand: any;
    }
    interface ICallExpressionSyntax extends ILeftHandSideExpressionSyntax {
        _callExpressionBrand: any;
        expression: IExpressionSyntax;
    }
    interface IPrimaryExpressionSyntax extends IMemberExpressionSyntax {
        _primaryExpressionBrand: any;
    }
    interface ITypeSyntax extends ISyntaxNodeOrToken {
        _typeBrand: any;
    }
    interface INameSyntax extends ITypeSyntax {
        _nameBrand: any;
    }
    interface IPropertyNameSyntax extends ISyntaxNodeOrToken {
        _propertyNameBrand: any;
    }
}
declare module TypeScript.SyntaxFacts {
    function isDirectivePrologueElement(node: ISyntaxNodeOrToken): boolean;
    function isUseStrictDirective(node: ISyntaxNodeOrToken): boolean;
    function isIdentifierNameOrAnyKeyword(token: ISyntaxToken): boolean;
    function isAccessibilityModifier(kind: SyntaxKind): boolean;
}
interface Array<T> {
    __data: number;
    kind: TypeScript.SyntaxKind;
    parent: TypeScript.ISyntaxElement;
}
declare module TypeScript {
    interface ISeparatedSyntaxList<T extends ISyntaxNodeOrToken> extends Array<ISyntaxNodeOrToken> {
    }
}
declare module TypeScript {
    function separatorCount(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>): number;
    function nonSeparatorCount(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>): number;
    function separatorAt(list: ISeparatedSyntaxList<ISyntaxNodeOrToken>, index: number): ISyntaxToken;
    function nonSeparatorAt<T extends ISyntaxNodeOrToken>(list: ISeparatedSyntaxList<T>, index: number): T;
}
declare module TypeScript.Syntax {
    function list<T extends ISyntaxNodeOrToken>(nodes: T[]): T[];
    function separatedList<T extends ISyntaxNodeOrToken>(nodesAndTokens: ISyntaxNodeOrToken[]): ISeparatedSyntaxList<T>;
}
declare module TypeScript {
    interface ISyntaxNodeOrToken extends ISyntaxElement {
        childCount: number;
        childAt(index: number): ISyntaxElement;
    }
}
declare module TypeScript {
    interface ISyntaxToken extends ISyntaxNodeOrToken, INameSyntax, IPrimaryExpressionSyntax, IPropertyAssignmentSyntax, IPropertyNameSyntax {
        setFullStart(fullStart: number): void;
        fullStart(): number;
        fullWidth(): number;
        text(): string;
        fullText(text?: ISimpleText): string;
        hasLeadingTrivia(): boolean;
        hasTrailingTrivia(): boolean;
        hasLeadingComment(): boolean;
        hasTrailingComment(): boolean;
        hasSkippedToken(): boolean;
        leadingTrivia(text?: ISimpleText): ISyntaxTriviaList;
        trailingTrivia(text?: ISimpleText): ISyntaxTriviaList;
        leadingTriviaWidth(text?: ISimpleText): number;
        trailingTriviaWidth(text?: ISimpleText): number;
        isKeywordConvertedToIdentifier(): boolean;
        isIncrementallyUnusable(): boolean;
        clone(): ISyntaxToken;
    }
}
declare module TypeScript {
    function tokenValue(token: ISyntaxToken): any;
    function tokenValueText(token: ISyntaxToken): string;
    function massageEscapes(text: string): string;
}
declare module TypeScript.Syntax {
    function realizeToken(token: ISyntaxToken, text: ISimpleText): ISyntaxToken;
    function convertKeywordToIdentifier(token: ISyntaxToken): ISyntaxToken;
    function withLeadingTrivia(token: ISyntaxToken, leadingTrivia: ISyntaxTriviaList, text: ISimpleText): ISyntaxToken;
    function withTrailingTrivia(token: ISyntaxToken, trailingTrivia: ISyntaxTriviaList, text: ISimpleText): ISyntaxToken;
    function emptyToken(kind: SyntaxKind): ISyntaxToken;
}
declare module TypeScript {
    interface ISyntaxTrivia {
        parent?: ISyntaxTriviaList;
        kind(): SyntaxKind;
        isWhitespace(): boolean;
        isComment(): boolean;
        isNewLine(): boolean;
        isSkippedToken(): boolean;
        fullStart(): number;
        fullWidth(): number;
        fullText(): string;
        skippedToken(): ISyntaxToken;
        clone(): ISyntaxTrivia;
    }
}
declare module TypeScript.Syntax {
    function deferredTrivia(kind: SyntaxKind, text: ISimpleText, fullStart: number, fullWidth: number): ISyntaxTrivia;
    function skippedTokenTrivia(token: ISyntaxToken, text: ISimpleText): ISyntaxTrivia;
    function splitMultiLineCommentTriviaIntoMultipleLines(trivia: ISyntaxTrivia): string[];
}
declare module TypeScript {
    interface ISyntaxTriviaList {
        parent?: ISyntaxToken;
        isShared(): boolean;
        count(): number;
        syntaxTriviaAt(index: number): ISyntaxTrivia;
        fullWidth(): number;
        fullText(): string;
        hasComment(): boolean;
        hasNewLine(): boolean;
        hasSkippedToken(): boolean;
        last(): ISyntaxTrivia;
        toArray(): ISyntaxTrivia[];
        clone(): ISyntaxTriviaList;
    }
}
declare module TypeScript.Syntax {
    var emptyTriviaList: ISyntaxTriviaList;
    function triviaList(trivia: ISyntaxTrivia[]): ISyntaxTriviaList;
}
declare module TypeScript {
    function childCount(element: ISyntaxElement): number;
    function childAt(element: ISyntaxElement, index: number): ISyntaxElement;
    module SyntaxUtilities {
        function isAnyFunctionExpressionOrDeclaration(ast: ISyntaxElement): boolean;
        function isLastTokenOnLine(token: ISyntaxToken, text: ISimpleText): boolean;
        function isLeftHandSizeExpression(element: ISyntaxElement): boolean;
        function isSwitchClause(element: ISyntaxElement): boolean;
        function isTypeMember(element: ISyntaxElement): boolean;
        function isClassElement(element: ISyntaxElement): boolean;
        function isModuleElement(element: ISyntaxElement): boolean;
        function isStatement(element: ISyntaxElement): boolean;
        function isAngleBracket(positionedElement: ISyntaxElement): boolean;
        function getToken(list: ISyntaxToken[], kind: SyntaxKind): ISyntaxToken;
        function containsToken(list: ISyntaxToken[], kind: SyntaxKind): boolean;
        function hasExportKeyword(moduleElement: IModuleElementSyntax): boolean;
        function getExportKeyword(moduleElement: IModuleElementSyntax): ISyntaxToken;
        function isAmbientDeclarationSyntax(positionNode: ISyntaxNode): boolean;
    }
}
declare module TypeScript {
    function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any;
    interface ISyntaxVisitor {
        visitToken(token: ISyntaxToken): any;
        visitSourceUnit(node: SourceUnitSyntax): any;
        visitQualifiedName(node: QualifiedNameSyntax): any;
        visitObjectType(node: ObjectTypeSyntax): any;
        visitFunctionType(node: FunctionTypeSyntax): any;
        visitArrayType(node: ArrayTypeSyntax): any;
        visitConstructorType(node: ConstructorTypeSyntax): any;
        visitGenericType(node: GenericTypeSyntax): any;
        visitTypeQuery(node: TypeQuerySyntax): any;
        visitTupleType(node: TupleTypeSyntax): any;
        visitUnionType(node: UnionTypeSyntax): any;
        visitParenthesizedType(node: ParenthesizedTypeSyntax): any;
        visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any;
        visitFunctionDeclaration(node: FunctionDeclarationSyntax): any;
        visitModuleDeclaration(node: ModuleDeclarationSyntax): any;
        visitClassDeclaration(node: ClassDeclarationSyntax): any;
        visitEnumDeclaration(node: EnumDeclarationSyntax): any;
        visitImportDeclaration(node: ImportDeclarationSyntax): any;
        visitExportAssignment(node: ExportAssignmentSyntax): any;
        visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): any;
        visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): any;
        visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any;
        visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): any;
        visitGetAccessor(node: GetAccessorSyntax): any;
        visitSetAccessor(node: SetAccessorSyntax): any;
        visitPropertySignature(node: PropertySignatureSyntax): any;
        visitCallSignature(node: CallSignatureSyntax): any;
        visitConstructSignature(node: ConstructSignatureSyntax): any;
        visitIndexSignature(node: IndexSignatureSyntax): any;
        visitMethodSignature(node: MethodSignatureSyntax): any;
        visitBlock(node: BlockSyntax): any;
        visitIfStatement(node: IfStatementSyntax): any;
        visitVariableStatement(node: VariableStatementSyntax): any;
        visitExpressionStatement(node: ExpressionStatementSyntax): any;
        visitReturnStatement(node: ReturnStatementSyntax): any;
        visitSwitchStatement(node: SwitchStatementSyntax): any;
        visitBreakStatement(node: BreakStatementSyntax): any;
        visitContinueStatement(node: ContinueStatementSyntax): any;
        visitForStatement(node: ForStatementSyntax): any;
        visitForInStatement(node: ForInStatementSyntax): any;
        visitEmptyStatement(node: EmptyStatementSyntax): any;
        visitThrowStatement(node: ThrowStatementSyntax): any;
        visitWhileStatement(node: WhileStatementSyntax): any;
        visitTryStatement(node: TryStatementSyntax): any;
        visitLabeledStatement(node: LabeledStatementSyntax): any;
        visitDoStatement(node: DoStatementSyntax): any;
        visitDebuggerStatement(node: DebuggerStatementSyntax): any;
        visitWithStatement(node: WithStatementSyntax): any;
        visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any;
        visitDeleteExpression(node: DeleteExpressionSyntax): any;
        visitTypeOfExpression(node: TypeOfExpressionSyntax): any;
        visitVoidExpression(node: VoidExpressionSyntax): any;
        visitConditionalExpression(node: ConditionalExpressionSyntax): any;
        visitBinaryExpression(node: BinaryExpressionSyntax): any;
        visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any;
        visitMemberAccessExpression(node: MemberAccessExpressionSyntax): any;
        visitInvocationExpression(node: InvocationExpressionSyntax): any;
        visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any;
        visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any;
        visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any;
        visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any;
        visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any;
        visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any;
        visitCastExpression(node: CastExpressionSyntax): any;
        visitElementAccessExpression(node: ElementAccessExpressionSyntax): any;
        visitFunctionExpression(node: FunctionExpressionSyntax): any;
        visitOmittedExpression(node: OmittedExpressionSyntax): any;
        visitTemplateExpression(node: TemplateExpressionSyntax): any;
        visitTemplateAccessExpression(node: TemplateAccessExpressionSyntax): any;
        visitVariableDeclaration(node: VariableDeclarationSyntax): any;
        visitVariableDeclarator(node: VariableDeclaratorSyntax): any;
        visitArgumentList(node: ArgumentListSyntax): any;
        visitParameterList(node: ParameterListSyntax): any;
        visitTypeArgumentList(node: TypeArgumentListSyntax): any;
        visitTypeParameterList(node: TypeParameterListSyntax): any;
        visitHeritageClause(node: HeritageClauseSyntax): any;
        visitEqualsValueClause(node: EqualsValueClauseSyntax): any;
        visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any;
        visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any;
        visitElseClause(node: ElseClauseSyntax): any;
        visitCatchClause(node: CatchClauseSyntax): any;
        visitFinallyClause(node: FinallyClauseSyntax): any;
        visitTemplateClause(node: TemplateClauseSyntax): any;
        visitTypeParameter(node: TypeParameterSyntax): any;
        visitConstraint(node: ConstraintSyntax): any;
        visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): any;
        visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): any;
        visitParameter(node: ParameterSyntax): any;
        visitEnumElement(node: EnumElementSyntax): any;
        visitTypeAnnotation(node: TypeAnnotationSyntax): any;
        visitComputedPropertyName(node: ComputedPropertyNameSyntax): any;
        visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any;
        visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any;
    }
}
declare module TypeScript {
    class SyntaxWalker implements ISyntaxVisitor {
        visitToken(token: ISyntaxToken): void;
        private visitOptionalToken(token);
        visitList(list: ISyntaxNodeOrToken[]): void;
        visitSourceUnit(node: SourceUnitSyntax): void;
        visitQualifiedName(node: QualifiedNameSyntax): void;
        visitObjectType(node: ObjectTypeSyntax): void;
        visitFunctionType(node: FunctionTypeSyntax): void;
        visitArrayType(node: ArrayTypeSyntax): void;
        visitConstructorType(node: ConstructorTypeSyntax): void;
        visitGenericType(node: GenericTypeSyntax): void;
        visitTypeQuery(node: TypeQuerySyntax): void;
        visitTupleType(node: TupleTypeSyntax): void;
        visitUnionType(node: UnionTypeSyntax): void;
        visitParenthesizedType(node: ParenthesizedTypeSyntax): void;
        visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void;
        visitFunctionDeclaration(node: FunctionDeclarationSyntax): void;
        visitModuleDeclaration(node: ModuleDeclarationSyntax): void;
        visitClassDeclaration(node: ClassDeclarationSyntax): void;
        visitEnumDeclaration(node: EnumDeclarationSyntax): void;
        visitImportDeclaration(node: ImportDeclarationSyntax): void;
        visitExportAssignment(node: ExportAssignmentSyntax): void;
        visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void;
        visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void;
        visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void;
        visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void;
        visitGetAccessor(node: GetAccessorSyntax): void;
        visitSetAccessor(node: SetAccessorSyntax): void;
        visitPropertySignature(node: PropertySignatureSyntax): void;
        visitCallSignature(node: CallSignatureSyntax): void;
        visitConstructSignature(node: ConstructSignatureSyntax): void;
        visitIndexSignature(node: IndexSignatureSyntax): void;
        visitMethodSignature(node: MethodSignatureSyntax): void;
        visitBlock(node: BlockSyntax): void;
        visitIfStatement(node: IfStatementSyntax): void;
        visitVariableStatement(node: VariableStatementSyntax): void;
        visitExpressionStatement(node: ExpressionStatementSyntax): void;
        visitReturnStatement(node: ReturnStatementSyntax): void;
        visitSwitchStatement(node: SwitchStatementSyntax): void;
        visitBreakStatement(node: BreakStatementSyntax): void;
        visitContinueStatement(node: ContinueStatementSyntax): void;
        visitForStatement(node: ForStatementSyntax): void;
        visitForInStatement(node: ForInStatementSyntax): void;
        visitEmptyStatement(node: EmptyStatementSyntax): void;
        visitThrowStatement(node: ThrowStatementSyntax): void;
        visitWhileStatement(node: WhileStatementSyntax): void;
        visitTryStatement(node: TryStatementSyntax): void;
        visitLabeledStatement(node: LabeledStatementSyntax): void;
        visitDoStatement(node: DoStatementSyntax): void;
        visitDebuggerStatement(node: DebuggerStatementSyntax): void;
        visitWithStatement(node: WithStatementSyntax): void;
        visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void;
        visitDeleteExpression(node: DeleteExpressionSyntax): void;
        visitTypeOfExpression(node: TypeOfExpressionSyntax): void;
        visitVoidExpression(node: VoidExpressionSyntax): void;
        visitConditionalExpression(node: ConditionalExpressionSyntax): void;
        visitBinaryExpression(node: BinaryExpressionSyntax): void;
        visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void;
        visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void;
        visitInvocationExpression(node: InvocationExpressionSyntax): void;
        visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void;
        visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void;
        visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void;
        visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void;
        visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void;
        visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void;
        visitCastExpression(node: CastExpressionSyntax): void;
        visitElementAccessExpression(node: ElementAccessExpressionSyntax): void;
        visitFunctionExpression(node: FunctionExpressionSyntax): void;
        visitOmittedExpression(node: OmittedExpressionSyntax): void;
        visitTemplateExpression(node: TemplateExpressionSyntax): void;
        visitTemplateAccessExpression(node: TemplateAccessExpressionSyntax): void;
        visitVariableDeclaration(node: VariableDeclarationSyntax): void;
        visitVariableDeclarator(node: VariableDeclaratorSyntax): void;
        visitArgumentList(node: ArgumentListSyntax): void;
        visitParameterList(node: ParameterListSyntax): void;
        visitTypeArgumentList(node: TypeArgumentListSyntax): void;
        visitTypeParameterList(node: TypeParameterListSyntax): void;
        visitHeritageClause(node: HeritageClauseSyntax): void;
        visitEqualsValueClause(node: EqualsValueClauseSyntax): void;
        visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void;
        visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void;
        visitElseClause(node: ElseClauseSyntax): void;
        visitCatchClause(node: CatchClauseSyntax): void;
        visitFinallyClause(node: FinallyClauseSyntax): void;
        visitTemplateClause(node: TemplateClauseSyntax): void;
        visitTypeParameter(node: TypeParameterSyntax): void;
        visitConstraint(node: ConstraintSyntax): void;
        visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void;
        visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void;
        visitParameter(node: ParameterSyntax): void;
        visitEnumElement(node: EnumElementSyntax): void;
        visitTypeAnnotation(node: TypeAnnotationSyntax): void;
        visitComputedPropertyName(node: ComputedPropertyNameSyntax): void;
        visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void;
        visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void;
    }
}
declare module TypeScript.Parser {
    interface IParserSource {
        text: ISimpleText;
        fileName: string;
        languageVersion: ts.ScriptTarget;
        currentNode(): ISyntaxNode;
        currentToken(): ISyntaxToken;
        currentContextualToken(): ISyntaxToken;
        peekToken(n: number): ISyntaxToken;
        consumeNode(node: ISyntaxNode): void;
        consumeToken(token: ISyntaxToken): void;
        getRewindPoint(): IRewindPoint;
        rewind(rewindPoint: IRewindPoint): void;
        releaseRewindPoint(rewindPoint: IRewindPoint): void;
        tokenDiagnostics(): Diagnostic[];
        release(): void;
    }
    interface IRewindPoint {
    }
    function parse(fileName: string, text: ISimpleText, languageVersion: ts.ScriptTarget, isDeclaration: boolean): SyntaxTree;
    function parseSource(source: IParserSource, isDeclaration: boolean): SyntaxTree;
}
declare module TypeScript {
    interface SourceUnitSyntax extends ISyntaxNode {
        syntaxTree: SyntaxTree;
        moduleElements: IModuleElementSyntax[];
        endOfFileToken: ISyntaxToken;
    }
    interface SourceUnitConstructor {
        new (data: number, moduleElements: IModuleElementSyntax[], endOfFileToken: ISyntaxToken): SourceUnitSyntax;
    }
    interface QualifiedNameSyntax extends ISyntaxNode, INameSyntax {
        left: INameSyntax;
        dotToken: ISyntaxToken;
        right: ISyntaxToken;
    }
    interface QualifiedNameConstructor {
        new (data: number, left: INameSyntax, dotToken: ISyntaxToken, right: ISyntaxToken): QualifiedNameSyntax;
    }
    interface ObjectTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openBraceToken: ISyntaxToken;
        typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>;
        closeBraceToken: ISyntaxToken;
    }
    interface ObjectTypeConstructor {
        new (data: number, openBraceToken: ISyntaxToken, typeMembers: ISeparatedSyntaxList<ITypeMemberSyntax>, closeBraceToken: ISyntaxToken): ObjectTypeSyntax;
    }
    interface FunctionTypeSyntax extends ISyntaxNode, ITypeSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface FunctionTypeConstructor {
        new (data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax): FunctionTypeSyntax;
    }
    interface ArrayTypeSyntax extends ISyntaxNode, ITypeSyntax {
        type: ITypeSyntax;
        openBracketToken: ISyntaxToken;
        closeBracketToken: ISyntaxToken;
    }
    interface ArrayTypeConstructor {
        new (data: number, type: ITypeSyntax, openBracketToken: ISyntaxToken, closeBracketToken: ISyntaxToken): ArrayTypeSyntax;
    }
    interface ConstructorTypeSyntax extends ISyntaxNode, ITypeSyntax {
        newKeyword: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface ConstructorTypeConstructor {
        new (data: number, newKeyword: ISyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, equalsGreaterThanToken: ISyntaxToken, type: ITypeSyntax): ConstructorTypeSyntax;
    }
    interface GenericTypeSyntax extends ISyntaxNode, ITypeSyntax {
        name: INameSyntax;
        typeArgumentList: TypeArgumentListSyntax;
    }
    interface GenericTypeConstructor {
        new (data: number, name: INameSyntax, typeArgumentList: TypeArgumentListSyntax): GenericTypeSyntax;
    }
    interface TypeQuerySyntax extends ISyntaxNode, ITypeSyntax {
        typeOfKeyword: ISyntaxToken;
        name: INameSyntax;
    }
    interface TypeQueryConstructor {
        new (data: number, typeOfKeyword: ISyntaxToken, name: INameSyntax): TypeQuerySyntax;
    }
    interface TupleTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openBracketToken: ISyntaxToken;
        types: ISeparatedSyntaxList<ITypeSyntax>;
        closeBracketToken: ISyntaxToken;
    }
    interface TupleTypeConstructor {
        new (data: number, openBracketToken: ISyntaxToken, types: ISeparatedSyntaxList<ITypeSyntax>, closeBracketToken: ISyntaxToken): TupleTypeSyntax;
    }
    interface UnionTypeSyntax extends ISyntaxNode, ITypeSyntax {
        left: ITypeSyntax;
        barToken: ISyntaxToken;
        right: ITypeSyntax;
    }
    interface UnionTypeConstructor {
        new (data: number, left: ITypeSyntax, barToken: ISyntaxToken, right: ITypeSyntax): UnionTypeSyntax;
    }
    interface ParenthesizedTypeSyntax extends ISyntaxNode, ITypeSyntax {
        openParenToken: ISyntaxToken;
        type: ITypeSyntax;
        closeParenToken: ISyntaxToken;
    }
    interface ParenthesizedTypeConstructor {
        new (data: number, openParenToken: ISyntaxToken, type: ITypeSyntax, closeParenToken: ISyntaxToken): ParenthesizedTypeSyntax;
    }
    interface InterfaceDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        interfaceKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        body: ObjectTypeSyntax;
    }
    interface InterfaceDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], interfaceKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], body: ObjectTypeSyntax): InterfaceDeclarationSyntax;
    }
    interface FunctionDeclarationSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface FunctionDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): FunctionDeclarationSyntax;
    }
    interface ModuleDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        moduleKeyword: ISyntaxToken;
        name: INameSyntax;
        stringLiteral: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        moduleElements: IModuleElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface ModuleDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], moduleKeyword: ISyntaxToken, name: INameSyntax, stringLiteral: ISyntaxToken, openBraceToken: ISyntaxToken, moduleElements: IModuleElementSyntax[], closeBraceToken: ISyntaxToken): ModuleDeclarationSyntax;
    }
    interface ClassDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        classKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        typeParameterList: TypeParameterListSyntax;
        heritageClauses: HeritageClauseSyntax[];
        openBraceToken: ISyntaxToken;
        classElements: IClassElementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface ClassDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], classKeyword: ISyntaxToken, identifier: ISyntaxToken, typeParameterList: TypeParameterListSyntax, heritageClauses: HeritageClauseSyntax[], openBraceToken: ISyntaxToken, classElements: IClassElementSyntax[], closeBraceToken: ISyntaxToken): ClassDeclarationSyntax;
    }
    interface EnumDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        enumKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        enumElements: ISeparatedSyntaxList<EnumElementSyntax>;
        closeBraceToken: ISyntaxToken;
    }
    interface EnumDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], enumKeyword: ISyntaxToken, identifier: ISyntaxToken, openBraceToken: ISyntaxToken, enumElements: ISeparatedSyntaxList<EnumElementSyntax>, closeBraceToken: ISyntaxToken): EnumDeclarationSyntax;
    }
    interface ImportDeclarationSyntax extends ISyntaxNode, IModuleElementSyntax {
        modifiers: ISyntaxToken[];
        importKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        equalsToken: ISyntaxToken;
        moduleReference: IModuleReferenceSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ImportDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], importKeyword: ISyntaxToken, identifier: ISyntaxToken, equalsToken: ISyntaxToken, moduleReference: IModuleReferenceSyntax, semicolonToken: ISyntaxToken): ImportDeclarationSyntax;
    }
    interface ExportAssignmentSyntax extends ISyntaxNode, IModuleElementSyntax {
        exportKeyword: ISyntaxToken;
        equalsToken: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface ExportAssignmentConstructor {
        new (data: number, exportKeyword: ISyntaxToken, equalsToken: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): ExportAssignmentSyntax;
    }
    interface MemberFunctionDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        propertyName: IPropertyNameSyntax;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface MemberFunctionDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): MemberFunctionDeclarationSyntax;
    }
    interface MemberVariableDeclarationSyntax extends ISyntaxNode, IMemberDeclarationSyntax {
        modifiers: ISyntaxToken[];
        variableDeclarator: VariableDeclaratorSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface MemberVariableDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], variableDeclarator: VariableDeclaratorSyntax, semicolonToken: ISyntaxToken): MemberVariableDeclarationSyntax;
    }
    interface ConstructorDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        constructorKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ConstructorDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], constructorKeyword: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax, semicolonToken: ISyntaxToken): ConstructorDeclarationSyntax;
    }
    interface IndexMemberDeclarationSyntax extends ISyntaxNode, IClassElementSyntax {
        modifiers: ISyntaxToken[];
        indexSignature: IndexSignatureSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface IndexMemberDeclarationConstructor {
        new (data: number, modifiers: ISyntaxToken[], indexSignature: IndexSignatureSyntax, semicolonToken: ISyntaxToken): IndexMemberDeclarationSyntax;
    }
    interface GetAccessorSyntax extends ISyntaxNode, IAccessorSyntax {
        modifiers: ISyntaxToken[];
        getKeyword: ISyntaxToken;
        propertyName: IPropertyNameSyntax;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface GetAccessorConstructor {
        new (data: number, modifiers: ISyntaxToken[], getKeyword: ISyntaxToken, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, block: BlockSyntax): GetAccessorSyntax;
    }
    interface SetAccessorSyntax extends ISyntaxNode, IAccessorSyntax {
        modifiers: ISyntaxToken[];
        setKeyword: ISyntaxToken;
        propertyName: IPropertyNameSyntax;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface SetAccessorConstructor {
        new (data: number, modifiers: ISyntaxToken[], setKeyword: ISyntaxToken, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, block: BlockSyntax): SetAccessorSyntax;
    }
    interface PropertySignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: IPropertyNameSyntax;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface PropertySignatureConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax): PropertySignatureSyntax;
    }
    interface CallSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        typeParameterList: TypeParameterListSyntax;
        parameterList: ParameterListSyntax;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface CallSignatureConstructor {
        new (data: number, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, typeAnnotation: TypeAnnotationSyntax): CallSignatureSyntax;
    }
    interface ConstructSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        newKeyword: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    interface ConstructSignatureConstructor {
        new (data: number, newKeyword: ISyntaxToken, callSignature: CallSignatureSyntax): ConstructSignatureSyntax;
    }
    interface IndexSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        openBracketToken: ISyntaxToken;
        parameters: ISeparatedSyntaxList<ParameterSyntax>;
        closeBracketToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
    }
    interface IndexSignatureConstructor {
        new (data: number, openBracketToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeBracketToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax): IndexSignatureSyntax;
    }
    interface MethodSignatureSyntax extends ISyntaxNode, ITypeMemberSyntax {
        propertyName: IPropertyNameSyntax;
        questionToken: ISyntaxToken;
        callSignature: CallSignatureSyntax;
    }
    interface MethodSignatureConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, questionToken: ISyntaxToken, callSignature: CallSignatureSyntax): MethodSignatureSyntax;
    }
    interface BlockSyntax extends ISyntaxNode, IStatementSyntax {
        openBraceToken: ISyntaxToken;
        statements: IStatementSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface BlockConstructor {
        new (data: number, openBraceToken: ISyntaxToken, statements: IStatementSyntax[], closeBraceToken: ISyntaxToken): BlockSyntax;
    }
    interface IfStatementSyntax extends ISyntaxNode, IStatementSyntax {
        ifKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
        elseClause: ElseClauseSyntax;
    }
    interface IfStatementConstructor {
        new (data: number, ifKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax, elseClause: ElseClauseSyntax): IfStatementSyntax;
    }
    interface VariableStatementSyntax extends ISyntaxNode, IStatementSyntax {
        modifiers: ISyntaxToken[];
        variableDeclaration: VariableDeclarationSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface VariableStatementConstructor {
        new (data: number, modifiers: ISyntaxToken[], variableDeclaration: VariableDeclarationSyntax, semicolonToken: ISyntaxToken): VariableStatementSyntax;
    }
    interface ExpressionStatementSyntax extends ISyntaxNode, IStatementSyntax {
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ExpressionStatementConstructor {
        new (data: number, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ExpressionStatementSyntax;
    }
    interface ReturnStatementSyntax extends ISyntaxNode, IStatementSyntax {
        returnKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ReturnStatementConstructor {
        new (data: number, returnKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ReturnStatementSyntax;
    }
    interface SwitchStatementSyntax extends ISyntaxNode, IStatementSyntax {
        switchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        openBraceToken: ISyntaxToken;
        switchClauses: ISwitchClauseSyntax[];
        closeBraceToken: ISyntaxToken;
    }
    interface SwitchStatementConstructor {
        new (data: number, switchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, openBraceToken: ISyntaxToken, switchClauses: ISwitchClauseSyntax[], closeBraceToken: ISyntaxToken): SwitchStatementSyntax;
    }
    interface BreakStatementSyntax extends ISyntaxNode, IStatementSyntax {
        breakKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface BreakStatementConstructor {
        new (data: number, breakKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): BreakStatementSyntax;
    }
    interface ContinueStatementSyntax extends ISyntaxNode, IStatementSyntax {
        continueKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface ContinueStatementConstructor {
        new (data: number, continueKeyword: ISyntaxToken, identifier: ISyntaxToken, semicolonToken: ISyntaxToken): ContinueStatementSyntax;
    }
    interface ForStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        initializer: IExpressionSyntax;
        firstSemicolonToken: ISyntaxToken;
        condition: IExpressionSyntax;
        secondSemicolonToken: ISyntaxToken;
        incrementor: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface ForStatementConstructor {
        new (data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, initializer: IExpressionSyntax, firstSemicolonToken: ISyntaxToken, condition: IExpressionSyntax, secondSemicolonToken: ISyntaxToken, incrementor: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): ForStatementSyntax;
    }
    interface ForInStatementSyntax extends ISyntaxNode, IStatementSyntax {
        forKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        variableDeclaration: VariableDeclarationSyntax;
        left: IExpressionSyntax;
        inKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface ForInStatementConstructor {
        new (data: number, forKeyword: ISyntaxToken, openParenToken: ISyntaxToken, variableDeclaration: VariableDeclarationSyntax, left: IExpressionSyntax, inKeyword: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): ForInStatementSyntax;
    }
    interface EmptyStatementSyntax extends ISyntaxNode, IStatementSyntax {
        semicolonToken: ISyntaxToken;
    }
    interface EmptyStatementConstructor {
        new (data: number, semicolonToken: ISyntaxToken): EmptyStatementSyntax;
    }
    interface ThrowStatementSyntax extends ISyntaxNode, IStatementSyntax {
        throwKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        semicolonToken: ISyntaxToken;
    }
    interface ThrowStatementConstructor {
        new (data: number, throwKeyword: ISyntaxToken, expression: IExpressionSyntax, semicolonToken: ISyntaxToken): ThrowStatementSyntax;
    }
    interface WhileStatementSyntax extends ISyntaxNode, IStatementSyntax {
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface WhileStatementConstructor {
        new (data: number, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): WhileStatementSyntax;
    }
    interface TryStatementSyntax extends ISyntaxNode, IStatementSyntax {
        tryKeyword: ISyntaxToken;
        block: BlockSyntax;
        catchClause: CatchClauseSyntax;
        finallyClause: FinallyClauseSyntax;
    }
    interface TryStatementConstructor {
        new (data: number, tryKeyword: ISyntaxToken, block: BlockSyntax, catchClause: CatchClauseSyntax, finallyClause: FinallyClauseSyntax): TryStatementSyntax;
    }
    interface LabeledStatementSyntax extends ISyntaxNode, IStatementSyntax {
        identifier: ISyntaxToken;
        colonToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface LabeledStatementConstructor {
        new (data: number, identifier: ISyntaxToken, colonToken: ISyntaxToken, statement: IStatementSyntax): LabeledStatementSyntax;
    }
    interface DoStatementSyntax extends ISyntaxNode, IStatementSyntax {
        doKeyword: ISyntaxToken;
        statement: IStatementSyntax;
        whileKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface DoStatementConstructor {
        new (data: number, doKeyword: ISyntaxToken, statement: IStatementSyntax, whileKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, semicolonToken: ISyntaxToken): DoStatementSyntax;
    }
    interface DebuggerStatementSyntax extends ISyntaxNode, IStatementSyntax {
        debuggerKeyword: ISyntaxToken;
        semicolonToken: ISyntaxToken;
    }
    interface DebuggerStatementConstructor {
        new (data: number, debuggerKeyword: ISyntaxToken, semicolonToken: ISyntaxToken): DebuggerStatementSyntax;
    }
    interface WithStatementSyntax extends ISyntaxNode, IStatementSyntax {
        withKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        condition: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface WithStatementConstructor {
        new (data: number, withKeyword: ISyntaxToken, openParenToken: ISyntaxToken, condition: IExpressionSyntax, closeParenToken: ISyntaxToken, statement: IStatementSyntax): WithStatementSyntax;
    }
    interface PrefixUnaryExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        operatorToken: ISyntaxToken;
        operand: IUnaryExpressionSyntax;
    }
    interface PrefixUnaryExpressionConstructor {
        new (data: number, operatorToken: ISyntaxToken, operand: IUnaryExpressionSyntax): PrefixUnaryExpressionSyntax;
    }
    interface DeleteExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        deleteKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface DeleteExpressionConstructor {
        new (data: number, deleteKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): DeleteExpressionSyntax;
    }
    interface TypeOfExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        typeOfKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface TypeOfExpressionConstructor {
        new (data: number, typeOfKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): TypeOfExpressionSyntax;
    }
    interface VoidExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        voidKeyword: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface VoidExpressionConstructor {
        new (data: number, voidKeyword: ISyntaxToken, expression: IUnaryExpressionSyntax): VoidExpressionSyntax;
    }
    interface ConditionalExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        condition: IExpressionSyntax;
        questionToken: ISyntaxToken;
        whenTrue: IExpressionSyntax;
        colonToken: ISyntaxToken;
        whenFalse: IExpressionSyntax;
    }
    interface ConditionalExpressionConstructor {
        new (data: number, condition: IExpressionSyntax, questionToken: ISyntaxToken, whenTrue: IExpressionSyntax, colonToken: ISyntaxToken, whenFalse: IExpressionSyntax): ConditionalExpressionSyntax;
    }
    interface BinaryExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
        left: IExpressionSyntax;
        operatorToken: ISyntaxToken;
        right: IExpressionSyntax;
    }
    interface BinaryExpressionConstructor {
        new (data: number, left: IExpressionSyntax, operatorToken: ISyntaxToken, right: IExpressionSyntax): BinaryExpressionSyntax;
    }
    interface PostfixUnaryExpressionSyntax extends ISyntaxNode, IPostfixExpressionSyntax {
        operand: ILeftHandSideExpressionSyntax;
        operatorToken: ISyntaxToken;
    }
    interface PostfixUnaryExpressionConstructor {
        new (data: number, operand: ILeftHandSideExpressionSyntax, operatorToken: ISyntaxToken): PostfixUnaryExpressionSyntax;
    }
    interface MemberAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        dotToken: ISyntaxToken;
        name: ISyntaxToken;
    }
    interface MemberAccessExpressionConstructor {
        new (data: number, expression: ILeftHandSideExpressionSyntax, dotToken: ISyntaxToken, name: ISyntaxToken): MemberAccessExpressionSyntax;
    }
    interface InvocationExpressionSyntax extends ISyntaxNode, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    interface InvocationExpressionConstructor {
        new (data: number, expression: ILeftHandSideExpressionSyntax, argumentList: ArgumentListSyntax): InvocationExpressionSyntax;
    }
    interface ArrayLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBracketToken: ISyntaxToken;
        expressions: ISeparatedSyntaxList<IExpressionSyntax>;
        closeBracketToken: ISyntaxToken;
    }
    interface ArrayLiteralExpressionConstructor {
        new (data: number, openBracketToken: ISyntaxToken, expressions: ISeparatedSyntaxList<IExpressionSyntax>, closeBracketToken: ISyntaxToken): ArrayLiteralExpressionSyntax;
    }
    interface ObjectLiteralExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openBraceToken: ISyntaxToken;
        propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>;
        closeBraceToken: ISyntaxToken;
    }
    interface ObjectLiteralExpressionConstructor {
        new (data: number, openBraceToken: ISyntaxToken, propertyAssignments: ISeparatedSyntaxList<IPropertyAssignmentSyntax>, closeBraceToken: ISyntaxToken): ObjectLiteralExpressionSyntax;
    }
    interface ObjectCreationExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        newKeyword: ISyntaxToken;
        expression: IMemberExpressionSyntax;
        argumentList: ArgumentListSyntax;
    }
    interface ObjectCreationExpressionConstructor {
        new (data: number, newKeyword: ISyntaxToken, expression: IMemberExpressionSyntax, argumentList: ArgumentListSyntax): ObjectCreationExpressionSyntax;
    }
    interface ParenthesizedExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        openParenToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeParenToken: ISyntaxToken;
    }
    interface ParenthesizedExpressionConstructor {
        new (data: number, openParenToken: ISyntaxToken, expression: IExpressionSyntax, closeParenToken: ISyntaxToken): ParenthesizedExpressionSyntax;
    }
    interface ParenthesizedArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        callSignature: CallSignatureSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    interface ParenthesizedArrowFunctionExpressionConstructor {
        new (data: number, callSignature: CallSignatureSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax): ParenthesizedArrowFunctionExpressionSyntax;
    }
    interface SimpleArrowFunctionExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        parameter: ParameterSyntax;
        equalsGreaterThanToken: ISyntaxToken;
        block: BlockSyntax;
        expression: IExpressionSyntax;
    }
    interface SimpleArrowFunctionExpressionConstructor {
        new (data: number, parameter: ParameterSyntax, equalsGreaterThanToken: ISyntaxToken, block: BlockSyntax, expression: IExpressionSyntax): SimpleArrowFunctionExpressionSyntax;
    }
    interface CastExpressionSyntax extends ISyntaxNode, IUnaryExpressionSyntax {
        lessThanToken: ISyntaxToken;
        type: ITypeSyntax;
        greaterThanToken: ISyntaxToken;
        expression: IUnaryExpressionSyntax;
    }
    interface CastExpressionConstructor {
        new (data: number, lessThanToken: ISyntaxToken, type: ITypeSyntax, greaterThanToken: ISyntaxToken, expression: IUnaryExpressionSyntax): CastExpressionSyntax;
    }
    interface ElementAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        openBracketToken: ISyntaxToken;
        argumentExpression: IExpressionSyntax;
        closeBracketToken: ISyntaxToken;
    }
    interface ElementAccessExpressionConstructor {
        new (data: number, expression: ILeftHandSideExpressionSyntax, openBracketToken: ISyntaxToken, argumentExpression: IExpressionSyntax, closeBracketToken: ISyntaxToken): ElementAccessExpressionSyntax;
    }
    interface FunctionExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        functionKeyword: ISyntaxToken;
        identifier: ISyntaxToken;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface FunctionExpressionConstructor {
        new (data: number, functionKeyword: ISyntaxToken, identifier: ISyntaxToken, callSignature: CallSignatureSyntax, block: BlockSyntax): FunctionExpressionSyntax;
    }
    interface OmittedExpressionSyntax extends ISyntaxNode, IExpressionSyntax {
    }
    interface OmittedExpressionConstructor {
        new (data: number): OmittedExpressionSyntax;
    }
    interface TemplateExpressionSyntax extends ISyntaxNode, IPrimaryExpressionSyntax {
        templateStartToken: ISyntaxToken;
        templateClauses: TemplateClauseSyntax[];
    }
    interface TemplateExpressionConstructor {
        new (data: number, templateStartToken: ISyntaxToken, templateClauses: TemplateClauseSyntax[]): TemplateExpressionSyntax;
    }
    interface TemplateAccessExpressionSyntax extends ISyntaxNode, IMemberExpressionSyntax, ICallExpressionSyntax {
        expression: ILeftHandSideExpressionSyntax;
        templateExpression: IPrimaryExpressionSyntax;
    }
    interface TemplateAccessExpressionConstructor {
        new (data: number, expression: ILeftHandSideExpressionSyntax, templateExpression: IPrimaryExpressionSyntax): TemplateAccessExpressionSyntax;
    }
    interface VariableDeclarationSyntax extends ISyntaxNode {
        varKeyword: ISyntaxToken;
        variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>;
    }
    interface VariableDeclarationConstructor {
        new (data: number, varKeyword: ISyntaxToken, variableDeclarators: ISeparatedSyntaxList<VariableDeclaratorSyntax>): VariableDeclarationSyntax;
    }
    interface VariableDeclaratorSyntax extends ISyntaxNode {
        propertyName: IPropertyNameSyntax;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface VariableDeclaratorConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax): VariableDeclaratorSyntax;
    }
    interface ArgumentListSyntax extends ISyntaxNode {
        typeArgumentList: TypeArgumentListSyntax;
        openParenToken: ISyntaxToken;
        arguments: ISeparatedSyntaxList<IExpressionSyntax>;
        closeParenToken: ISyntaxToken;
    }
    interface ArgumentListConstructor {
        new (data: number, typeArgumentList: TypeArgumentListSyntax, openParenToken: ISyntaxToken, _arguments: ISeparatedSyntaxList<IExpressionSyntax>, closeParenToken: ISyntaxToken): ArgumentListSyntax;
    }
    interface ParameterListSyntax extends ISyntaxNode {
        openParenToken: ISyntaxToken;
        parameters: ISeparatedSyntaxList<ParameterSyntax>;
        closeParenToken: ISyntaxToken;
    }
    interface ParameterListConstructor {
        new (data: number, openParenToken: ISyntaxToken, parameters: ISeparatedSyntaxList<ParameterSyntax>, closeParenToken: ISyntaxToken): ParameterListSyntax;
    }
    interface TypeArgumentListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeArguments: ISeparatedSyntaxList<ITypeSyntax>;
        greaterThanToken: ISyntaxToken;
    }
    interface TypeArgumentListConstructor {
        new (data: number, lessThanToken: ISyntaxToken, typeArguments: ISeparatedSyntaxList<ITypeSyntax>, greaterThanToken: ISyntaxToken): TypeArgumentListSyntax;
    }
    interface TypeParameterListSyntax extends ISyntaxNode {
        lessThanToken: ISyntaxToken;
        typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>;
        greaterThanToken: ISyntaxToken;
    }
    interface TypeParameterListConstructor {
        new (data: number, lessThanToken: ISyntaxToken, typeParameters: ISeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: ISyntaxToken): TypeParameterListSyntax;
    }
    interface HeritageClauseSyntax extends ISyntaxNode {
        extendsOrImplementsKeyword: ISyntaxToken;
        typeNames: ISeparatedSyntaxList<INameSyntax>;
    }
    interface HeritageClauseConstructor {
        new (data: number, extendsOrImplementsKeyword: ISyntaxToken, typeNames: ISeparatedSyntaxList<INameSyntax>): HeritageClauseSyntax;
    }
    interface EqualsValueClauseSyntax extends ISyntaxNode {
        equalsToken: ISyntaxToken;
        value: IExpressionSyntax;
    }
    interface EqualsValueClauseConstructor {
        new (data: number, equalsToken: ISyntaxToken, value: IExpressionSyntax): EqualsValueClauseSyntax;
    }
    interface CaseSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        caseKeyword: ISyntaxToken;
        expression: IExpressionSyntax;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    interface CaseSwitchClauseConstructor {
        new (data: number, caseKeyword: ISyntaxToken, expression: IExpressionSyntax, colonToken: ISyntaxToken, statements: IStatementSyntax[]): CaseSwitchClauseSyntax;
    }
    interface DefaultSwitchClauseSyntax extends ISyntaxNode, ISwitchClauseSyntax {
        defaultKeyword: ISyntaxToken;
        colonToken: ISyntaxToken;
        statements: IStatementSyntax[];
    }
    interface DefaultSwitchClauseConstructor {
        new (data: number, defaultKeyword: ISyntaxToken, colonToken: ISyntaxToken, statements: IStatementSyntax[]): DefaultSwitchClauseSyntax;
    }
    interface ElseClauseSyntax extends ISyntaxNode {
        elseKeyword: ISyntaxToken;
        statement: IStatementSyntax;
    }
    interface ElseClauseConstructor {
        new (data: number, elseKeyword: ISyntaxToken, statement: IStatementSyntax): ElseClauseSyntax;
    }
    interface CatchClauseSyntax extends ISyntaxNode {
        catchKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        identifier: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        closeParenToken: ISyntaxToken;
        block: BlockSyntax;
    }
    interface CatchClauseConstructor {
        new (data: number, catchKeyword: ISyntaxToken, openParenToken: ISyntaxToken, identifier: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, closeParenToken: ISyntaxToken, block: BlockSyntax): CatchClauseSyntax;
    }
    interface FinallyClauseSyntax extends ISyntaxNode {
        finallyKeyword: ISyntaxToken;
        block: BlockSyntax;
    }
    interface FinallyClauseConstructor {
        new (data: number, finallyKeyword: ISyntaxToken, block: BlockSyntax): FinallyClauseSyntax;
    }
    interface TemplateClauseSyntax extends ISyntaxNode {
        expression: IExpressionSyntax;
        templateMiddleOrEndToken: ISyntaxToken;
    }
    interface TemplateClauseConstructor {
        new (data: number, expression: IExpressionSyntax, templateMiddleOrEndToken: ISyntaxToken): TemplateClauseSyntax;
    }
    interface TypeParameterSyntax extends ISyntaxNode {
        identifier: ISyntaxToken;
        constraint: ConstraintSyntax;
    }
    interface TypeParameterConstructor {
        new (data: number, identifier: ISyntaxToken, constraint: ConstraintSyntax): TypeParameterSyntax;
    }
    interface ConstraintSyntax extends ISyntaxNode {
        extendsKeyword: ISyntaxToken;
        typeOrExpression: ISyntaxNodeOrToken;
    }
    interface ConstraintConstructor {
        new (data: number, extendsKeyword: ISyntaxToken, typeOrExpression: ISyntaxNodeOrToken): ConstraintSyntax;
    }
    interface SimplePropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: IPropertyNameSyntax;
        colonToken: ISyntaxToken;
        expression: IExpressionSyntax;
    }
    interface SimplePropertyAssignmentConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, colonToken: ISyntaxToken, expression: IExpressionSyntax): SimplePropertyAssignmentSyntax;
    }
    interface FunctionPropertyAssignmentSyntax extends ISyntaxNode, IPropertyAssignmentSyntax {
        propertyName: IPropertyNameSyntax;
        callSignature: CallSignatureSyntax;
        block: BlockSyntax;
    }
    interface FunctionPropertyAssignmentConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, callSignature: CallSignatureSyntax, block: BlockSyntax): FunctionPropertyAssignmentSyntax;
    }
    interface ParameterSyntax extends ISyntaxNode {
        dotDotDotToken: ISyntaxToken;
        modifiers: ISyntaxToken[];
        identifier: ISyntaxToken;
        questionToken: ISyntaxToken;
        typeAnnotation: TypeAnnotationSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface ParameterConstructor {
        new (data: number, dotDotDotToken: ISyntaxToken, modifiers: ISyntaxToken[], identifier: ISyntaxToken, questionToken: ISyntaxToken, typeAnnotation: TypeAnnotationSyntax, equalsValueClause: EqualsValueClauseSyntax): ParameterSyntax;
    }
    interface EnumElementSyntax extends ISyntaxNode {
        propertyName: IPropertyNameSyntax;
        equalsValueClause: EqualsValueClauseSyntax;
    }
    interface EnumElementConstructor {
        new (data: number, propertyName: IPropertyNameSyntax, equalsValueClause: EqualsValueClauseSyntax): EnumElementSyntax;
    }
    interface TypeAnnotationSyntax extends ISyntaxNode {
        colonToken: ISyntaxToken;
        type: ITypeSyntax;
    }
    interface TypeAnnotationConstructor {
        new (data: number, colonToken: ISyntaxToken, type: ITypeSyntax): TypeAnnotationSyntax;
    }
    interface ComputedPropertyNameSyntax extends ISyntaxNode, IPropertyNameSyntax {
        openBracketToken: ISyntaxToken;
        expression: IExpressionSyntax;
        closeBracketToken: ISyntaxToken;
    }
    interface ComputedPropertyNameConstructor {
        new (data: number, openBracketToken: ISyntaxToken, expression: IExpressionSyntax, closeBracketToken: ISyntaxToken): ComputedPropertyNameSyntax;
    }
    interface ExternalModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        requireKeyword: ISyntaxToken;
        openParenToken: ISyntaxToken;
        stringLiteral: ISyntaxToken;
        closeParenToken: ISyntaxToken;
    }
    interface ExternalModuleReferenceConstructor {
        new (data: number, requireKeyword: ISyntaxToken, openParenToken: ISyntaxToken, stringLiteral: ISyntaxToken, closeParenToken: ISyntaxToken): ExternalModuleReferenceSyntax;
    }
    interface ModuleNameModuleReferenceSyntax extends ISyntaxNode, IModuleReferenceSyntax {
        moduleName: INameSyntax;
    }
    interface ModuleNameModuleReferenceConstructor {
        new (data: number, moduleName: INameSyntax): ModuleNameModuleReferenceSyntax;
    }
}
declare module TypeScript {
    var SourceUnitSyntax: SourceUnitConstructor;
    var QualifiedNameSyntax: QualifiedNameConstructor;
    var ObjectTypeSyntax: ObjectTypeConstructor;
    var FunctionTypeSyntax: FunctionTypeConstructor;
    var ArrayTypeSyntax: ArrayTypeConstructor;
    var ConstructorTypeSyntax: ConstructorTypeConstructor;
    var GenericTypeSyntax: GenericTypeConstructor;
    var TypeQuerySyntax: TypeQueryConstructor;
    var TupleTypeSyntax: TupleTypeConstructor;
    var UnionTypeSyntax: UnionTypeConstructor;
    var ParenthesizedTypeSyntax: ParenthesizedTypeConstructor;
    var InterfaceDeclarationSyntax: InterfaceDeclarationConstructor;
    var FunctionDeclarationSyntax: FunctionDeclarationConstructor;
    var ModuleDeclarationSyntax: ModuleDeclarationConstructor;
    var ClassDeclarationSyntax: ClassDeclarationConstructor;
    var EnumDeclarationSyntax: EnumDeclarationConstructor;
    var ImportDeclarationSyntax: ImportDeclarationConstructor;
    var ExportAssignmentSyntax: ExportAssignmentConstructor;
    var MemberFunctionDeclarationSyntax: MemberFunctionDeclarationConstructor;
    var MemberVariableDeclarationSyntax: MemberVariableDeclarationConstructor;
    var ConstructorDeclarationSyntax: ConstructorDeclarationConstructor;
    var IndexMemberDeclarationSyntax: IndexMemberDeclarationConstructor;
    var GetAccessorSyntax: GetAccessorConstructor;
    var SetAccessorSyntax: SetAccessorConstructor;
    var PropertySignatureSyntax: PropertySignatureConstructor;
    var CallSignatureSyntax: CallSignatureConstructor;
    var ConstructSignatureSyntax: ConstructSignatureConstructor;
    var IndexSignatureSyntax: IndexSignatureConstructor;
    var MethodSignatureSyntax: MethodSignatureConstructor;
    var BlockSyntax: BlockConstructor;
    var IfStatementSyntax: IfStatementConstructor;
    var VariableStatementSyntax: VariableStatementConstructor;
    var ExpressionStatementSyntax: ExpressionStatementConstructor;
    var ReturnStatementSyntax: ReturnStatementConstructor;
    var SwitchStatementSyntax: SwitchStatementConstructor;
    var BreakStatementSyntax: BreakStatementConstructor;
    var ContinueStatementSyntax: ContinueStatementConstructor;
    var ForStatementSyntax: ForStatementConstructor;
    var ForInStatementSyntax: ForInStatementConstructor;
    var EmptyStatementSyntax: EmptyStatementConstructor;
    var ThrowStatementSyntax: ThrowStatementConstructor;
    var WhileStatementSyntax: WhileStatementConstructor;
    var TryStatementSyntax: TryStatementConstructor;
    var LabeledStatementSyntax: LabeledStatementConstructor;
    var DoStatementSyntax: DoStatementConstructor;
    var DebuggerStatementSyntax: DebuggerStatementConstructor;
    var WithStatementSyntax: WithStatementConstructor;
    var PrefixUnaryExpressionSyntax: PrefixUnaryExpressionConstructor;
    var DeleteExpressionSyntax: DeleteExpressionConstructor;
    var TypeOfExpressionSyntax: TypeOfExpressionConstructor;
    var VoidExpressionSyntax: VoidExpressionConstructor;
    var ConditionalExpressionSyntax: ConditionalExpressionConstructor;
    var BinaryExpressionSyntax: BinaryExpressionConstructor;
    var PostfixUnaryExpressionSyntax: PostfixUnaryExpressionConstructor;
    var MemberAccessExpressionSyntax: MemberAccessExpressionConstructor;
    var InvocationExpressionSyntax: InvocationExpressionConstructor;
    var ArrayLiteralExpressionSyntax: ArrayLiteralExpressionConstructor;
    var ObjectLiteralExpressionSyntax: ObjectLiteralExpressionConstructor;
    var ObjectCreationExpressionSyntax: ObjectCreationExpressionConstructor;
    var ParenthesizedExpressionSyntax: ParenthesizedExpressionConstructor;
    var ParenthesizedArrowFunctionExpressionSyntax: ParenthesizedArrowFunctionExpressionConstructor;
    var SimpleArrowFunctionExpressionSyntax: SimpleArrowFunctionExpressionConstructor;
    var CastExpressionSyntax: CastExpressionConstructor;
    var ElementAccessExpressionSyntax: ElementAccessExpressionConstructor;
    var FunctionExpressionSyntax: FunctionExpressionConstructor;
    var OmittedExpressionSyntax: OmittedExpressionConstructor;
    var TemplateExpressionSyntax: TemplateExpressionConstructor;
    var TemplateAccessExpressionSyntax: TemplateAccessExpressionConstructor;
    var VariableDeclarationSyntax: VariableDeclarationConstructor;
    var VariableDeclaratorSyntax: VariableDeclaratorConstructor;
    var ArgumentListSyntax: ArgumentListConstructor;
    var ParameterListSyntax: ParameterListConstructor;
    var TypeArgumentListSyntax: TypeArgumentListConstructor;
    var TypeParameterListSyntax: TypeParameterListConstructor;
    var HeritageClauseSyntax: HeritageClauseConstructor;
    var EqualsValueClauseSyntax: EqualsValueClauseConstructor;
    var CaseSwitchClauseSyntax: CaseSwitchClauseConstructor;
    var DefaultSwitchClauseSyntax: DefaultSwitchClauseConstructor;
    var ElseClauseSyntax: ElseClauseConstructor;
    var CatchClauseSyntax: CatchClauseConstructor;
    var FinallyClauseSyntax: FinallyClauseConstructor;
    var TemplateClauseSyntax: TemplateClauseConstructor;
    var TypeParameterSyntax: TypeParameterConstructor;
    var ConstraintSyntax: ConstraintConstructor;
    var SimplePropertyAssignmentSyntax: SimplePropertyAssignmentConstructor;
    var FunctionPropertyAssignmentSyntax: FunctionPropertyAssignmentConstructor;
    var ParameterSyntax: ParameterConstructor;
    var EnumElementSyntax: EnumElementConstructor;
    var TypeAnnotationSyntax: TypeAnnotationConstructor;
    var ComputedPropertyNameSyntax: ComputedPropertyNameConstructor;
    var ExternalModuleReferenceSyntax: ExternalModuleReferenceConstructor;
    var ModuleNameModuleReferenceSyntax: ModuleNameModuleReferenceConstructor;
}
declare module TypeScript {
    var syntaxDiagnosticsTime: number;
    class SyntaxTree {
        text: ISimpleText;
        private _sourceUnit;
        private _isDeclaration;
        private _parserDiagnostics;
        private _allDiagnostics;
        private _fileName;
        private _lineMap;
        private _languageVersion;
        private _amdDependencies;
        private _isExternalModule;
        constructor(sourceUnit: SourceUnitSyntax, isDeclaration: boolean, diagnostics: Diagnostic[], fileName: string, text: ISimpleText, languageVersion: ts.ScriptTarget);
        sourceUnit(): SourceUnitSyntax;
        isDeclaration(): boolean;
        private computeDiagnostics();
        diagnostics(): Diagnostic[];
        fileName(): string;
        lineMap(): LineMap;
        languageVersion(): ts.ScriptTarget;
        private cacheSyntaxTreeInfo();
        private getAmdDependency(comment);
        isExternalModule(): boolean;
        amdDependencies(): string[];
    }
    function externalModuleIndicatorSpan(syntaxTree: SyntaxTree): TextSpan;
    function externalModuleIndicatorSpanWorker(syntaxTree: SyntaxTree, firstToken: ISyntaxToken): TextSpan;
}
declare module TypeScript {
    class Unicode {
        static unicodeES3IdentifierStart: number[];
        static unicodeES3IdentifierPart: number[];
        static unicodeES5IdentifierStart: number[];
        static unicodeES5IdentifierPart: number[];
        static lookupInUnicodeMap(code: number, map: number[]): boolean;
        static isIdentifierStart(code: number, languageVersion: ts.ScriptTarget): boolean;
        static isIdentifierPart(code: number, languageVersion: ts.ScriptTarget): boolean;
    }
}
declare module TypeScript.IncrementalParser {
    function parse(oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree;
}
declare module ts {
    interface OutliningSpan {
        textSpan: TypeScript.TextSpan;
        hintSpan: TypeScript.TextSpan;
        bannerText: string;
        autoCollapse: boolean;
    }
    module OutliningElementsCollector {
        function collectElements(sourceFile: SourceFile): OutliningSpan[];
    }
}
declare module ts.NavigationBar {
    function getNavigationBarItems(sourceFile: SourceFile): NavigationBarItem[];
}
declare module TypeScript.Indentation {
    function columnForEndOfTokenAtPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForStartOfTokenAtPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForStartOfFirstTokenInLineContainingPosition(syntaxTree: SyntaxTree, position: number, options: FormattingOptions): number;
    function columnForPositionInString(input: string, position: number, options: FormattingOptions): number;
    function indentationString(column: number, options: FormattingOptions): string;
    function firstNonWhitespacePosition(value: string): number;
}
declare module ts.SignatureHelp {
    function getSignatureHelpItems(sourceFile: SourceFile, position: number, typeInfoResolver: TypeChecker, cancellationToken: CancellationTokenObject): SignatureHelpItems;
}
declare module ts {
    interface ListItemInfo {
        listItemIndex: number;
        list: Node;
    }
    function findListItemInfo(node: Node): ListItemInfo;
    function findChildOfKind(n: Node, kind: SyntaxKind, sourceFile?: SourceFile): Node;
    function findContainingList(node: Node): Node;
    function findListItemIndexContainingPosition(list: Node, position: number): number;
    function getTouchingWord(sourceFile: SourceFile, position: number): Node;
    function getTouchingPropertyName(sourceFile: SourceFile, position: number): Node;
    function getTouchingToken(sourceFile: SourceFile, position: number, includeItemAtEndPosition?: (n: Node) => boolean): Node;
    function getTokenAtPosition(sourceFile: SourceFile, position: number): Node;
    function findTokenOnLeftOfPosition(file: SourceFile, position: number): Node;
    function findNextToken(previousToken: Node, parent: Node): Node;
    function findPrecedingToken(position: number, sourceFile: SourceFile, startNode?: Node): Node;
    function getTypeArgumentOrTypeParameterList(node: Node): NodeArray<Node>;
    function isToken(n: Node): boolean;
    function isComment(n: Node): boolean;
    function isPunctuation(n: Node): boolean;
}
declare module TypeScript.Services.Formatting {
    interface ITextSnapshot {
        getLength(): number;
        getText(span: TextSpan): string;
        getLineNumberFromPosition(position: number): number;
        getLineFromPosition(position: number): ITextSnapshotLine;
        getLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
    }
    class TextSnapshot implements ITextSnapshot {
        private snapshot;
        private lines;
        constructor(snapshot: ISimpleText);
        getLength(): number;
        getText(span: TextSpan): string;
        getLineNumberFromPosition(position: number): number;
        getLineFromPosition(position: number): ITextSnapshotLine;
        getLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
        private getLineFromLineNumberWorker(lineNumber);
    }
}
declare module TypeScript.Services.Formatting {
    interface ITextSnapshotLine {
        snapshot(): ITextSnapshot;
        start(): SnapshotPoint;
        startPosition(): number;
        end(): SnapshotPoint;
        endPosition(): number;
        endIncludingLineBreak(): SnapshotPoint;
        endIncludingLineBreakPosition(): number;
        length(): number;
        lineNumber(): number;
        getText(): string;
    }
    class TextSnapshotLine implements ITextSnapshotLine {
        private _snapshot;
        private _lineNumber;
        private _start;
        private _end;
        private _lineBreak;
        constructor(_snapshot: ITextSnapshot, _lineNumber: number, _start: number, _end: number, _lineBreak: string);
        snapshot(): ITextSnapshot;
        start(): SnapshotPoint;
        startPosition(): number;
        end(): SnapshotPoint;
        endPosition(): number;
        endIncludingLineBreak(): SnapshotPoint;
        endIncludingLineBreakPosition(): number;
        length(): number;
        lineNumber(): number;
        getText(): string;
    }
}
declare module TypeScript.Services.Formatting {
    class SnapshotPoint {
        snapshot: ITextSnapshot;
        position: number;
        constructor(snapshot: ITextSnapshot, position: number);
        getContainingLine(): ITextSnapshotLine;
        add(offset: number): SnapshotPoint;
    }
}
declare module TypeScript.Services.Formatting {
    class FormattingContext {
        private snapshot;
        formattingRequestKind: FormattingRequestKind;
        currentTokenSpan: TokenSpan;
        nextTokenSpan: TokenSpan;
        contextNode: IndentationNodeContext;
        currentTokenParent: IndentationNodeContext;
        nextTokenParent: IndentationNodeContext;
        private contextNodeAllOnSameLine;
        private nextNodeAllOnSameLine;
        private tokensAreOnSameLine;
        private contextNodeBlockIsOnOneLine;
        private nextNodeBlockIsOnOneLine;
        constructor(snapshot: ITextSnapshot, formattingRequestKind: FormattingRequestKind);
        updateContext(currentTokenSpan: TokenSpan, currentTokenParent: IndentationNodeContext, nextTokenSpan: TokenSpan, nextTokenParent: IndentationNodeContext, commonParent: IndentationNodeContext): void;
        ContextNodeAllOnSameLine(): boolean;
        NextNodeAllOnSameLine(): boolean;
        TokensAreOnSameLine(): boolean;
        ContextNodeBlockIsOnOneLine(): boolean;
        NextNodeBlockIsOnOneLine(): boolean;
        NodeIsOnOneLine(node: IndentationNodeContext): boolean;
        BlockIsOnOneLine(node: IndentationNodeContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class FormattingManager {
        private syntaxTree;
        private snapshot;
        private rulesProvider;
        private options;
        constructor(syntaxTree: SyntaxTree, snapshot: ITextSnapshot, rulesProvider: RulesProvider, editorOptions: ts.EditorOptions);
        formatSelection(minChar: number, limChar: number): ts.TextChange[];
        formatDocument(): ts.TextChange[];
        formatOnSemicolon(caretPosition: number): ts.TextChange[];
        formatOnClosingCurlyBrace(caretPosition: number): ts.TextChange[];
        formatOnEnter(caretPosition: number): ts.TextChange[];
        private formatSpan(span, formattingRequestKind);
    }
}
declare module TypeScript.Services.Formatting {
    enum FormattingRequestKind {
        FormatDocument = 0,
        FormatSelection = 1,
        FormatOnEnter = 2,
        FormatOnSemicolon = 3,
        FormatOnClosingCurlyBrace = 4,
        FormatOnPaste = 5,
    }
}
declare module TypeScript.Services.Formatting {
    class Rule {
        Descriptor: RuleDescriptor;
        Operation: RuleOperation;
        Flag: RuleFlags;
        constructor(Descriptor: RuleDescriptor, Operation: RuleOperation, Flag?: RuleFlags);
        toString(): string;
    }
}
declare module TypeScript.Services.Formatting {
    enum RuleAction {
        Ignore = 0,
        Space = 1,
        NewLine = 2,
        Delete = 3,
    }
}
declare module TypeScript.Services.Formatting {
    class RuleDescriptor {
        LeftTokenRange: Shared.TokenRange;
        RightTokenRange: Shared.TokenRange;
        constructor(LeftTokenRange: Shared.TokenRange, RightTokenRange: Shared.TokenRange);
        toString(): string;
        static create1(left: SyntaxKind, right: SyntaxKind): RuleDescriptor;
        static create2(left: Shared.TokenRange, right: SyntaxKind): RuleDescriptor;
        static create3(left: SyntaxKind, right: Shared.TokenRange): RuleDescriptor;
        static create4(left: Shared.TokenRange, right: Shared.TokenRange): RuleDescriptor;
    }
}
declare module TypeScript.Services.Formatting {
    enum RuleFlags {
        None = 0,
        CanDeleteNewLines = 1,
    }
}
declare module TypeScript.Services.Formatting {
    class RuleOperation {
        Context: RuleOperationContext;
        Action: RuleAction;
        constructor();
        toString(): string;
        static create1(action: RuleAction): RuleOperation;
        static create2(context: RuleOperationContext, action: RuleAction): RuleOperation;
    }
}
declare module TypeScript.Services.Formatting {
    class RuleOperationContext {
        private customContextChecks;
        constructor(...funcs: ((context: FormattingContext) => boolean)[]);
        static Any: RuleOperationContext;
        IsAny(): boolean;
        InContext(context: FormattingContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class Rules {
        getRuleName(rule: Rule): any;
        [name: string]: any;
        IgnoreBeforeComment: Rule;
        IgnoreAfterLineComment: Rule;
        NoSpaceBeforeSemicolon: Rule;
        NoSpaceBeforeColon: Rule;
        NoSpaceBeforeQMark: Rule;
        SpaceAfterColon: Rule;
        SpaceAfterQMark: Rule;
        SpaceAfterSemicolon: Rule;
        SpaceAfterCloseBrace: Rule;
        SpaceBetweenCloseBraceAndElse: Rule;
        SpaceBetweenCloseBraceAndWhile: Rule;
        NoSpaceAfterCloseBrace: Rule;
        NoSpaceBeforeDot: Rule;
        NoSpaceAfterDot: Rule;
        NoSpaceBeforeOpenBracket: Rule;
        NoSpaceAfterOpenBracket: Rule;
        NoSpaceBeforeCloseBracket: Rule;
        NoSpaceAfterCloseBracket: Rule;
        SpaceAfterOpenBrace: Rule;
        SpaceBeforeCloseBrace: Rule;
        NoSpaceBetweenEmptyBraceBrackets: Rule;
        NewLineAfterOpenBraceInBlockContext: Rule;
        NewLineBeforeCloseBraceInBlockContext: Rule;
        NoSpaceAfterUnaryPrefixOperator: Rule;
        NoSpaceAfterUnaryPreincrementOperator: Rule;
        NoSpaceAfterUnaryPredecrementOperator: Rule;
        NoSpaceBeforeUnaryPostincrementOperator: Rule;
        NoSpaceBeforeUnaryPostdecrementOperator: Rule;
        SpaceAfterPostincrementWhenFollowedByAdd: Rule;
        SpaceAfterAddWhenFollowedByUnaryPlus: Rule;
        SpaceAfterAddWhenFollowedByPreincrement: Rule;
        SpaceAfterPostdecrementWhenFollowedBySubtract: Rule;
        SpaceAfterSubtractWhenFollowedByUnaryMinus: Rule;
        SpaceAfterSubtractWhenFollowedByPredecrement: Rule;
        NoSpaceBeforeComma: Rule;
        SpaceAfterCertainKeywords: Rule;
        NoSpaceBeforeOpenParenInFuncCall: Rule;
        SpaceAfterFunctionInFuncDecl: Rule;
        NoSpaceBeforeOpenParenInFuncDecl: Rule;
        SpaceAfterVoidOperator: Rule;
        NoSpaceBetweenReturnAndSemicolon: Rule;
        SpaceBetweenStatements: Rule;
        SpaceAfterTryFinally: Rule;
        SpaceAfterGetSetInMember: Rule;
        SpaceBeforeBinaryKeywordOperator: Rule;
        SpaceAfterBinaryKeywordOperator: Rule;
        NoSpaceAfterConstructor: Rule;
        NoSpaceAfterModuleImport: Rule;
        SpaceAfterCertainTypeScriptKeywords: Rule;
        SpaceBeforeCertainTypeScriptKeywords: Rule;
        SpaceAfterModuleName: Rule;
        SpaceAfterArrow: Rule;
        NoSpaceAfterEllipsis: Rule;
        NoSpaceAfterOptionalParameters: Rule;
        NoSpaceBeforeOpenAngularBracket: Rule;
        NoSpaceBetweenCloseParenAndAngularBracket: Rule;
        NoSpaceAfterOpenAngularBracket: Rule;
        NoSpaceBeforeCloseAngularBracket: Rule;
        NoSpaceAfterCloseAngularBracket: Rule;
        NoSpaceBetweenEmptyInterfaceBraceBrackets: Rule;
        HighPriorityCommonRules: Rule[];
        LowPriorityCommonRules: Rule[];
        SpaceAfterComma: Rule;
        NoSpaceAfterComma: Rule;
        SpaceBeforeBinaryOperator: Rule;
        SpaceAfterBinaryOperator: Rule;
        NoSpaceBeforeBinaryOperator: Rule;
        NoSpaceAfterBinaryOperator: Rule;
        SpaceAfterKeywordInControl: Rule;
        NoSpaceAfterKeywordInControl: Rule;
        FunctionOpenBraceLeftTokenRange: Shared.TokenRange;
        SpaceBeforeOpenBraceInFunction: Rule;
        NewLineBeforeOpenBraceInFunction: Rule;
        TypeScriptOpenBraceLeftTokenRange: Shared.TokenRange;
        SpaceBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        NewLineBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        ControlOpenBraceLeftTokenRange: Shared.TokenRange;
        SpaceBeforeOpenBraceInControl: Rule;
        NewLineBeforeOpenBraceInControl: Rule;
        SpaceAfterSemicolonInFor: Rule;
        NoSpaceAfterSemicolonInFor: Rule;
        SpaceAfterOpenParen: Rule;
        SpaceBeforeCloseParen: Rule;
        NoSpaceBetweenParens: Rule;
        NoSpaceAfterOpenParen: Rule;
        NoSpaceBeforeCloseParen: Rule;
        SpaceAfterAnonymousFunctionKeyword: Rule;
        NoSpaceAfterAnonymousFunctionKeyword: Rule;
        constructor();
        static IsForContext(context: FormattingContext): boolean;
        static IsNotForContext(context: FormattingContext): boolean;
        static IsBinaryOpContext(context: FormattingContext): boolean;
        static IsNotBinaryOpContext(context: FormattingContext): boolean;
        static IsSameLineTokenOrBeforeMultilineBlockContext(context: FormattingContext): boolean;
        static IsBeforeMultilineBlockContext(context: FormattingContext): boolean;
        static IsMultilineBlockContext(context: FormattingContext): boolean;
        static IsSingleLineBlockContext(context: FormattingContext): boolean;
        static IsBlockContext(context: FormattingContext): boolean;
        static IsBeforeBlockContext(context: FormattingContext): boolean;
        static NodeIsBlockContext(node: IndentationNodeContext): boolean;
        static IsFunctionDeclContext(context: FormattingContext): boolean;
        static IsTypeScriptDeclWithBlockContext(context: FormattingContext): boolean;
        static NodeIsTypeScriptDeclWithBlockContext(node: IndentationNodeContext): boolean;
        static IsAfterCodeBlockContext(context: FormattingContext): boolean;
        static IsControlDeclContext(context: FormattingContext): boolean;
        static IsObjectContext(context: FormattingContext): boolean;
        static IsFunctionCallContext(context: FormattingContext): boolean;
        static IsNewContext(context: FormattingContext): boolean;
        static IsFunctionCallOrNewContext(context: FormattingContext): boolean;
        static IsSameLineTokenContext(context: FormattingContext): boolean;
        static IsNotFormatOnEnter(context: FormattingContext): boolean;
        static IsModuleDeclContext(context: FormattingContext): boolean;
        static IsObjectTypeContext(context: FormattingContext): boolean;
        static IsTypeArgumentOrParameter(tokenKind: SyntaxKind, parentKind: SyntaxKind): boolean;
        static IsTypeArgumentOrParameterContext(context: FormattingContext): boolean;
        static IsVoidOpContext(context: FormattingContext): boolean;
    }
}
declare module TypeScript.Services.Formatting {
    class RulesMap {
        map: RulesBucket[];
        mapRowLength: number;
        constructor();
        static create(rules: Rule[]): RulesMap;
        Initialize(rules: Rule[]): RulesBucket[];
        FillRules(rules: Rule[], rulesBucketConstructionStateList: RulesBucketConstructionState[]): void;
        private GetRuleBucketIndex(row, column);
        private FillRule(rule, rulesBucketConstructionStateList);
        GetRule(context: FormattingContext): Rule;
    }
    enum RulesPosition {
        IgnoreRulesSpecific = 0,
        IgnoreRulesAny,
        ContextRulesSpecific,
        ContextRulesAny,
        NoContextRulesSpecific,
        NoContextRulesAny,
    }
    class RulesBucketConstructionState {
        private rulesInsertionIndexBitmap;
        constructor();
        GetInsertionIndex(maskPosition: RulesPosition): number;
        IncreaseInsertionIndex(maskPosition: RulesPosition): void;
    }
    class RulesBucket {
        private rules;
        constructor();
        Rules(): Rule[];
        AddRule(rule: Rule, specificTokens: boolean, constructionState: RulesBucketConstructionState[], rulesBucketIndex: number): void;
    }
}
declare module TypeScript.Services.Formatting {
    class RulesProvider {
        private logger;
        private globalRules;
        private options;
        private activeRules;
        private rulesMap;
        constructor(logger: Logger);
        getRuleName(rule: Rule): string;
        getRuleByName(name: string): Rule;
        getRulesMap(): RulesMap;
        ensureUpToDate(options: ts.FormatCodeOptions): void;
        private createActiveRules(options);
    }
}
declare module TypeScript.Services.Formatting {
    class TextEditInfo {
        position: number;
        length: number;
        replaceWith: string;
        constructor(position: number, length: number, replaceWith: string);
        toString(): string;
    }
}
declare module TypeScript.Services.Formatting {
    module Shared {
        interface ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
        }
        class TokenRangeAccess implements ITokenAccess {
            private tokens;
            constructor(from: SyntaxKind, to: SyntaxKind, except: SyntaxKind[]);
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
            toString(): string;
        }
        class TokenValuesAccess implements ITokenAccess {
            private tokens;
            constructor(tks: SyntaxKind[]);
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
        }
        class TokenSingleValueAccess implements ITokenAccess {
            token: SyntaxKind;
            constructor(token: SyntaxKind);
            GetTokens(): SyntaxKind[];
            Contains(tokenValue: SyntaxKind): boolean;
            toString(): string;
        }
        class TokenAllAccess implements ITokenAccess {
            GetTokens(): SyntaxKind[];
            Contains(tokenValue: SyntaxKind): boolean;
            toString(): string;
        }
        class TokenRange {
            tokenAccess: ITokenAccess;
            constructor(tokenAccess: ITokenAccess);
            static FromToken(token: SyntaxKind): TokenRange;
            static FromTokens(tokens: SyntaxKind[]): TokenRange;
            static FromRange(f: SyntaxKind, to: SyntaxKind, except?: SyntaxKind[]): TokenRange;
            static AllTokens(): TokenRange;
            GetTokens(): SyntaxKind[];
            Contains(token: SyntaxKind): boolean;
            toString(): string;
            static Any: TokenRange;
            static AnyIncludingMultilineComments: TokenRange;
            static Keywords: TokenRange;
            static Operators: TokenRange;
            static BinaryOperators: TokenRange;
            static BinaryKeywordOperators: TokenRange;
            static ReservedKeywords: TokenRange;
            static UnaryPrefixOperators: TokenRange;
            static UnaryPrefixExpressions: TokenRange;
            static UnaryPreincrementExpressions: TokenRange;
            static UnaryPostincrementExpressions: TokenRange;
            static UnaryPredecrementExpressions: TokenRange;
            static UnaryPostdecrementExpressions: TokenRange;
            static Comments: TokenRange;
            static TypeNames: TokenRange;
        }
    }
}
declare module TypeScript.Services.Formatting {
    class TokenSpan extends TextSpan {
        kind: SyntaxKind;
        constructor(kind: SyntaxKind, start: number, length: number);
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationNodeContext {
        private _node;
        private _parent;
        private _fullStart;
        private _indentationAmount;
        private _childIndentationAmountDelta;
        private _depth;
        private _hasSkippedOrMissingTokenChild;
        constructor(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number);
        parent(): IndentationNodeContext;
        node(): ISyntaxNode;
        fullStart(): number;
        fullWidth(): number;
        start(): number;
        end(): number;
        indentationAmount(): number;
        childIndentationAmountDelta(): number;
        depth(): number;
        kind(): SyntaxKind;
        hasSkippedOrMissingTokenChild(): boolean;
        clone(pool: IndentationNodeContextPool): IndentationNodeContext;
        update(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationAmount: number, childIndentationAmountDelta: number): void;
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationNodeContextPool {
        private nodes;
        getNode(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationLevel: number, childIndentationLevelDelta: number): IndentationNodeContext;
        releaseNode(node: IndentationNodeContext, recursive?: boolean): void;
    }
}
declare module TypeScript.Services.Formatting {
    class IndentationTrackingWalker {
        options: FormattingOptions;
        private _position;
        private _parent;
        private _textSpan;
        private _snapshot;
        private _lastTriviaWasNewLine;
        private _indentationNodeContextPool;
        private _text;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions);
        position(): number;
        parent(): IndentationNodeContext;
        textSpan(): TextSpan;
        snapshot(): ITextSnapshot;
        indentationNodeContextPool(): IndentationNodeContextPool;
        forceIndentNextToken(tokenStart: number): void;
        forceSkipIndentingNextToken(tokenStart: number): void;
        indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void;
        visitTokenInSpan(token: ISyntaxToken): void;
        visitToken(token: ISyntaxToken): void;
        walk(element: ISyntaxElement): void;
        private visitNode(node);
        private getTokenIndentationAmount(token);
        private getCommentIndentationAmount(token);
        private getNodeIndentation(node, newLineInsertedByFormatting?);
        private shouldIndentBlockInParent(parent);
        private forceRecomputeIndentationOfParent(tokenStart, newLineAdded);
    }
}
declare module TypeScript.Services.Formatting {
    class MultipleTokenIndenter extends IndentationTrackingWalker {
        private _edits;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, snapshot: ITextSnapshot, indentFirstToken: boolean, options: FormattingOptions);
        indentToken(token: ISyntaxToken, indentationAmount: number, commentIndentationAmount: number): void;
        edits(): TextEditInfo[];
        recordEdit(position: number, length: number, replaceWith: string): void;
        private recordIndentationEditsForToken(token, indentationString, commentIndentationString);
        private recordIndentationEditsForSingleLineOrSkippedText(trivia, fullStart, indentationString);
        private recordIndentationEditsForWhitespace(trivia, fullStart, indentationString);
        private recordIndentationEditsForMultiLineComment(trivia, fullStart, indentationString, leadingWhiteSpace, firstLineAlreadyIndented);
        private recordIndentationEditsForSegment(segment, fullStart, indentationColumns, whiteSpaceColumnsInFirstSegment);
    }
}
declare module TypeScript.Services.Formatting {
    class Formatter extends MultipleTokenIndenter {
        private previousTokenSpan;
        private previousTokenParent;
        private scriptHasErrors;
        private rulesProvider;
        private formattingRequestKind;
        private formattingContext;
        constructor(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, indentFirstToken: boolean, options: FormattingOptions, snapshot: ITextSnapshot, rulesProvider: RulesProvider, formattingRequestKind: FormattingRequestKind);
        static getEdits(textSpan: TextSpan, sourceUnit: SourceUnitSyntax, options: FormattingOptions, indentFirstToken: boolean, snapshot: ITextSnapshot, rulesProvider: RulesProvider, formattingRequestKind: FormattingRequestKind): TextEditInfo[];
        visitTokenInSpan(token: ISyntaxToken): void;
        private processToken(token);
        private processTrivia(triviaList, fullStart);
        private findCommonParents(parent1, parent2);
        private formatPair(t1, t1Parent, t2, t2Parent);
        private getLineNumber(span);
        private trimWhitespaceInLineRange(startLine, endLine, token?);
        private trimWhitespace(line, token?);
        private RecordRuleEdits(rule, t1, t2);
    }
}
declare module ts.formatting {
    module SmartIndenter {
        function getIndentation(position: number, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number;
    }
}
declare module TypeScript {
    interface Logger {
        log(s: string): void;
    }
    class NullLogger implements Logger {
        log(s: string): void;
    }
}
declare module TypeScript {
    function createIntrinsicsObject<T>(): ts.Map<T>;
}
declare module TypeScript {
    function stripStartAndEndQuotes(str: string): string;
    function switchToForwardSlashes(path: string): string;
    function isDTSFile(fname: string): boolean;
    function getPathComponents(path: string): string[];
    function normalizePath(path: string): string;
}
declare module ts {
    interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFile): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node;
        getLastToken(sourceFile?: SourceFile): Node;
    }
    interface Symbol {
        getFlags(): SymbolFlags;
        getName(): string;
        getDeclarations(): Declaration[];
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol;
        getApparentProperties(): Symbol[];
        getCallSignatures(): Signature[];
        getConstructSignatures(): Signature[];
        getStringIndexType(): Type;
        getNumberIndexType(): Type;
    }
    interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): Type[];
        getParameters(): Symbol[];
        getReturnType(): Type;
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface SourceFile {
        getScriptSnapshot(): TypeScript.IScriptSnapshot;
        getNamedDeclarations(): Declaration[];
        update(scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile;
    }
    interface Logger {
        log(s: string): void;
    }
    interface LanguageServiceHost extends Logger {
        getCompilationSettings(): CompilerOptions;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(): string;
    }
    interface LanguageService {
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): Diagnostic[];
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getSyntacticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TypeScript.TextSpan): ClassifiedSpan[];
        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TypeScript.TextSpan;
        getBreakpointStatementAtPosition(fileName: string, position: number): TypeScript.TextSpan;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getSignatureAtPosition(fileName: string, position: number): SignatureInfo;
        getRenameInfo(fileName: string, position: number): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getImplementorsAtPosition(fileName: string, position: number): ReferenceEntry[];
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];
        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TypeScript.TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[];
        getEmitOutput(fileName: string): EmitOutput;
        dispose(): void;
    }
    interface SignatureInfo {
        actual: ActualSignatureInfo;
        formal: FormalSignatureItemInfo[];
        activeFormal: number;
    }
    interface FormalSignatureItemInfo {
        signatureInfo: string;
        typeParameters: FormalTypeParameterInfo[];
        parameters: FormalParameterInfo[];
        docComment: string;
    }
    interface FormalTypeParameterInfo {
        name: string;
        docComment: string;
        minChar: number;
        limChar: number;
    }
    interface FormalParameterInfo {
        name: string;
        isVariable: boolean;
        docComment: string;
        minChar: number;
        limChar: number;
    }
    interface ActualSignatureInfo {
        parameterMinChar: number;
        parameterLimChar: number;
        currentParameterIsTypeParameter: boolean;
        currentParameter: number;
    }
    interface ClassifiedSpan {
        textSpan: TypeScript.TextSpan;
        classificationType: string;
    }
    interface NavigationBarItem {
        text: string;
        kind: string;
        kindModifiers: string;
        spans: TypeScript.TextSpan[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }
    interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }
    interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }
    class TextChange {
        span: TypeScript.TextSpan;
        newText: string;
    }
    interface RenameLocation {
        textSpan: TypeScript.TextSpan;
        fileName: string;
    }
    interface ReferenceEntry {
        textSpan: TypeScript.TextSpan;
        fileName: string;
        isWriteAccess: boolean;
    }
    interface NavigateToItem {
        name: string;
        kind: string;
        kindModifiers: string;
        matchKind: string;
        fileName: string;
        textSpan: TypeScript.TextSpan;
        containerName: string;
        containerKind: string;
    }
    interface EditorOptions {
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
    }
    interface DefinitionInfo {
        fileName: string;
        textSpan: TypeScript.TextSpan;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }
    enum SymbolDisplayPartKind {
        aliasName = 0,
        className = 1,
        enumName = 2,
        fieldName = 3,
        interfaceName = 4,
        keyword = 5,
        lineBreak = 6,
        numericLiteral = 7,
        stringLiteral = 8,
        localName = 9,
        methodName = 10,
        moduleName = 11,
        operator = 12,
        parameterName = 13,
        propertyName = 14,
        punctuation = 15,
        space = 16,
        text = 17,
        typeParameterName = 18,
        enumMemberName = 19,
        functionName = 20,
        regularExpressionLiteral = 21,
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface QuickInfo {
        kind: string;
        kindModifiers: string;
        textSpan: TypeScript.TextSpan;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface RenameInfo {
        canRename: boolean;
        localizedErrorMessage: string;
        displayName: string;
        fullDisplayName: string;
        kind: string;
        kindModifiers: string;
        triggerSpan: TypeScript.TextSpan;
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
    }
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
    }
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TypeScript.TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    interface CompletionInfo {
        isMemberCompletion: boolean;
        entries: CompletionEntry[];
    }
    interface CompletionEntry {
        name: string;
        kind: string;
        kindModifiers: string;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: string;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputStatus: EmitReturnStatus;
    }
    const enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2,
    }
    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
    const enum EndOfLineState {
        Start = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        StringLiteral = 7,
        RegExpLiteral = 8,
    }
    interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }
    interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }
    interface Classifier {
        getClassificationsForLine(text: string, lexState: EndOfLineState): ClassificationResult;
    }
    interface DocumentRegistry {
        acquireDocument(filename: string, compilationSettings: CompilerOptions, scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean): SourceFile;
        updateDocument(sourceFile: SourceFile, filename: string, compilationSettings: CompilerOptions, scriptSnapshot: TypeScript.IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TypeScript.TextChangeRange): SourceFile;
        releaseDocument(filename: string, compilationSettings: CompilerOptions): void;
    }
    class ScriptElementKind {
        static unknown: string;
        static keyword: string;
        static scriptElement: string;
        static moduleElement: string;
        static classElement: string;
        static interfaceElement: string;
        static typeElement: string;
        static enumElement: string;
        static variableElement: string;
        static localVariableElement: string;
        static functionElement: string;
        static localFunctionElement: string;
        static memberFunctionElement: string;
        static memberGetAccessorElement: string;
        static memberSetAccessorElement: string;
        static memberVariableElement: string;
        static constructorImplementationElement: string;
        static callSignatureElement: string;
        static indexSignatureElement: string;
        static constructSignatureElement: string;
        static parameterElement: string;
        static typeParameterElement: string;
        static primitiveType: string;
        static label: string;
        static alias: string;
        static constantElement: string;
    }
    class ScriptElementKindModifier {
        static none: string;
        static publicMemberModifier: string;
        static privateMemberModifier: string;
        static protectedMemberModifier: string;
        static exportedModifier: string;
        static ambientModifier: string;
        static staticModifier: string;
    }
    class ClassificationTypeNames {
        static comment: string;
        static identifier: string;
        static keyword: string;
        static numericLiteral: string;
        static operator: string;
        static stringLiteral: string;
        static whiteSpace: string;
        static text: string;
        static punctuation: string;
        static className: string;
        static enumName: string;
        static interfaceName: string;
        static moduleName: string;
        static typeParameterName: string;
    }
    function displayPartsToString(displayParts: SymbolDisplayPart[]): string;
    interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }
    function spacePart(): SymbolDisplayPart;
    function keywordPart(kind: SyntaxKind): SymbolDisplayPart;
    function punctuationPart(kind: SyntaxKind): SymbolDisplayPart;
    function operatorPart(kind: SyntaxKind): SymbolDisplayPart;
    function textPart(text: string): SymbolDisplayPart;
    function lineBreakPart(): SymbolDisplayPart;
    function symbolPart(text: string, symbol: Symbol): SymbolDisplayPart;
    function mapToDisplayParts(writeDisplayParts: (writer: DisplayPartsSymbolWriter) => void): SymbolDisplayPart[];
    function typeToDisplayParts(typechecker: TypeChecker, type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): SymbolDisplayPart[];
    function symbolToDisplayParts(typeChecker: TypeChecker, symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): SymbolDisplayPart[];
    function getDefaultCompilerOptions(): CompilerOptions;
    function compareDataObjects(dst: any, src: any): boolean;
    class OperationCanceledException {
    }
    class CancellationTokenObject {
        private cancellationToken;
        static None: CancellationTokenObject;
        constructor(cancellationToken: CancellationToken);
        isCancellationRequested(): boolean;
        throwIfCancellationRequested(): void;
    }
    function createDocumentRegistry(): DocumentRegistry;
    function getNodeModifiers(node: Node): string;
    function createLanguageService(host: LanguageServiceHost, documentRegistry: DocumentRegistry): LanguageService;
    function createClassifier(host: Logger): Classifier;
}
declare module ts.BreakpointResolver {
    function spanInSourceFileAtLocation(sourceFile: SourceFile, position: number): TypeScript.TextSpan;
}
declare module TypeScript {
    interface ILineAndCharacter {
        line: number;
        character: number;
    }
    interface IFileReference extends ILineAndCharacter {
        path: string;
        isResident: boolean;
        position: number;
        length: number;
    }
    interface IPreProcessedFileInfo {
        referencedFiles: IFileReference[];
        importedFiles: IFileReference[];
        diagnostics: Diagnostic[];
        isLibFile: boolean;
    }
    var tripleSlashReferenceRegExp: RegExp;
    function preProcessFile(fileName: string, sourceText: IScriptSnapshot, readImportFiles?: boolean): IPreProcessedFileInfo;
    function getReferencedFiles(fileName: string, sourceText: IScriptSnapshot): IFileReference[];
}
declare var debugObjectHost: any;
declare module ts {
    interface ScriptSnapshotShim {
        getText(start: number, end: number): string;
        getLength(): number;
        getLineStartPositions(): string;
        getChangeRange(oldSnapshot: ScriptSnapshotShim): string;
    }
    interface LanguageServiceShimHost extends Logger {
        getCompilationSettings(): string;
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): ScriptSnapshotShim;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(): string;
    }
    interface ShimFactory {
        registerShim(shim: Shim): void;
        unregisterShim(shim: Shim): void;
    }
    interface Shim {
        dispose(dummy: any): void;
    }
    interface LanguageServiceShim extends Shim {
        languageService: LanguageService;
        dispose(dummy: any): void;
        refresh(throwOnError: boolean): void;
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): string;
        getSemanticDiagnostics(fileName: string): string;
        getCompilerOptionsDiagnostics(): string;
        getSyntacticClassifications(fileName: string, start: number, length: number): string;
        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): string;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): string;
        getQuickInfoAtPosition(fileName: string, position: number): string;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        getBreakpointStatementAtPosition(fileName: string, position: number): string;
        getSignatureHelpItems(fileName: string, position: number): string;
        getSignatureAtPosition(fileName: string, position: number): string;
        getRenameInfo(fileName: string, position: number): string;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): string;
        getDefinitionAtPosition(fileName: string, position: number): string;
        getReferencesAtPosition(fileName: string, position: number): string;
        getOccurrencesAtPosition(fileName: string, position: number): string;
        getImplementorsAtPosition(fileName: string, position: number): string;
        getNavigateToItems(searchValue: string): string;
        getNavigationBarItems(fileName: string): string;
        getOutliningSpans(fileName: string): string;
        getTodoComments(fileName: string, todoCommentDescriptors: string): string;
        getBraceMatchingAtPosition(fileName: string, position: number): string;
        getIndentationAtPosition(fileName: string, position: number, options: string): string;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: string): string;
        getFormattingEditsForDocument(fileName: string, options: string): string;
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string): string;
        getEmitOutput(fileName: string): string;
    }
    interface ClassifierShim extends Shim {
        getClassificationsForLine(text: string, lexState: EndOfLineState): string;
    }
    interface CoreServicesShim extends Shim {
        getPreProcessedFileInfo(fileName: string, sourceText: TypeScript.IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
    }
    const enum LanguageVersion {
        EcmaScript3 = 0,
        EcmaScript5 = 1,
        EcmaScript6 = 2,
    }
    const enum ModuleGenTarget {
        Unspecified = 0,
        Synchronous = 1,
        Asynchronous = 2,
    }
    interface CompilationSettings {
        propagateEnumConstants?: boolean;
        removeComments?: boolean;
        watch?: boolean;
        noResolve?: boolean;
        allowAutomaticSemicolonInsertion?: boolean;
        noImplicitAny?: boolean;
        noLib?: boolean;
        codeGenTarget?: LanguageVersion;
        moduleGenTarget?: ModuleGenTarget;
        outFileOption?: string;
        outDirOption?: string;
        mapSourceFiles?: boolean;
        mapRoot?: string;
        sourceRoot?: string;
        generateDeclarationFiles?: boolean;
        useCaseSensitiveFileResolution?: boolean;
        gatherDiagnostics?: boolean;
        codepage?: number;
        emitBOM?: boolean;
        [index: string]: any;
    }
    class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        private shimHost;
        constructor(shimHost: LanguageServiceShimHost);
        log(s: string): void;
        getCompilationSettings(): CompilerOptions;
        getScriptFileNames(): string[];
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot;
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getLocalizedDiagnosticMessages(): any;
        getCancellationToken(): CancellationToken;
        getDefaultLibFilename(): string;
        getCurrentDirectory(): string;
    }
    class TypeScriptServicesFactory implements ShimFactory {
        private _shims;
        private documentRegistry;
        createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim;
        createClassifierShim(logger: Logger): ClassifierShim;
        createCoreServicesShim(logger: Logger): CoreServicesShim;
        close(): void;
        registerShim(shim: Shim): void;
        unregisterShim(shim: Shim): void;
    }
}
declare module TypeScript.Services {
    var TypeScriptServicesFactory: typeof ts.TypeScriptServicesFactory;
}
