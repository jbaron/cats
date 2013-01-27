module Cats {


declare interface Position {
    row: number;
    column: number;
}

declare interface Range {
    start: Position;
    end: Position;
}

declare class TypeInfo extends Services.TypeInfo {
    description: string;
}

declare interface FileRange {
    unitName: string;
    range: Range;
    message?:string;
    context?:string;
}

declare interface CompileResults {
    source:any;
    errors:FileRange[];
}

declare class NavigateToItem extends Services.NavigateToItem {
    range:Range;
    unitName:string;
}



}