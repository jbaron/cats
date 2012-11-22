///<reference path='../../lib/typescript-hint.d.ts'/>
///<reference path='./codemirror.d.ts'/>

var tsh = new TypeScriptHint();

// Lets add some declaration files that should always be included.
tsh.addFile("./src/typescript/typings/lib.d.ts");
var autoComplete = tsh.autoComplete.bind(tsh);

CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.simpleHint(cm, autoComplete);
};

var editor = CodeMirror.fromTextArea(<HTMLTextAreaElement>document.getElementById("code"), {
    lineNumbers: true,
    extraKeys: {"Ctrl-Space": "autocomplete"},
    matchBrackets: true,
    mode: "text/typescript"
});

var root:Element = <any>document.getElementsByClassName("CodeMirror")[0];

var mytime;
root.addEventListener("mousemove", function (e:MouseEvent) {
    clearTimeout(mytime);
    mytime = setTimeout(() => {
        var coord = editor.coordsChar({left: e.pageX, top: e.pageY});
        console.log(coord.line + ":" + coord.ch);
    }, 200);
});

