module Cats {


declare interface Range {
    startRow: number;
    startColumn: number;
    endRow: number;
    endColumn: number;
}

declare interface ErrorEntry {
    unitName: string;
    range: Range;
    message:string;
    context?:string;
}

declare interface CompileResults {
    source:any;
    error:ErrorEntry[];
}




}