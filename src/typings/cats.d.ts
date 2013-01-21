module Cats {


declare interface Position {
    row: number;
    column: number;
}

declare interface Range {
    start: Position;
    end: Position;
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




}