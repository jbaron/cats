Introduction
============
CATS is an IDE for the TypeScript developer. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. CATS itself is written in TypeScript and even being developed with CATS as its main IDE. 

Although not yet feature complete, it is getting there. Right now CATS already has built-in support for the following features:

- Intelligent code editor with support for syntax highlighting and code completion.

<img src="https://raw.github.com/jbaron/cats/master/artifacts/autocomplete.png" />

- Support for refactoring and smart navigation.
- TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- JavaScript JSHint support.
- Editing features like folding and indentation.
- Running your application from within IDE and using the WebKit debugger to debug.
- Theming:

<img src="https://raw.github.com/jbaron/cats/master/artifacts/themes.png" height="220px" width="850px" />

It is recommended to first make a backup before using CATS on your project since the software is still considered to be of alpha quality. 

Installation & Running it
=========================
To install CATS, just follow these steps:

1. Download the CATS from Github: 

        git clone https://github.com/jbaron/cats.git

2. Download and install node-webkit. In case you don't have node-webkit yet, you can download a binary for Windows, Linux or Mac at: [Node-Webkit](https://github.com/rogerwang/node-webkit).
   Make sure you have at least version 0.5.0 installed.

3. Go to the cats directory and type: 

        /path_to_node_webkit/nw ./

By default the "greeter" project will be loaded. In the samples directory there are several other projects you can try out. Of course when you open a new project, you can also open a directory that contains your own project. When you want to start CATS with a specific project, you can pass the project directory as a command line parameter:

		/path_to_node_webkit/nw ./ <full_path_to_project>
   

Configuration
=============
CATS will look for a file in the project directory called: ".settings/config.json". If found, CATS will use the values configured in this file, otherwise it will use sensible default values.
You can edit this file (or the default values if you don't have this file yet) from the main menu.


Goals
=====
One of the main goals of CATS is to make the developer that is used to IDE's like Eclipse, NetBeans, Visual Studio or IntelliJ, feel right at home. So the same support you got from your IDE when you developed in Java or C#, is now available for TypeScript/JavaScript.
And in order to be productive, it is also very important that an IDE is responsive. So while designing and developing CATS, performance is one of the key aspects.
In fact, CATS runs fine on older hardware.

Bugs and Issues
===============
In case you encounter an issue, you can open a ticket on Github. Also enhancement requests can be entered here: [Github issue tracker](https://github.com/jbaron/cats/issues)


Building from source
=====================
There is normally no need to compile CATS yourself, since all the compiled files are already included. But if you want to play around with it, here are the steps:

1. Make sure you have installed TypeScript 0.9.0 or later

2. Go to the cats directory

3. The following will compile the required files:

        tsc "@build"
        tsc "@build2"
        tsc "@build3"

That is all there is to it. The lib directory should now have an updated main.js, tsworker.js and uml.js files and you are ready to run CATS editor.


Couldn't have done it without ....
==================================
Some of the main 3rd party components that we have used within CATS and couldn't have done without:

- [TypeScript](http://www.typescriptlang.org) (of course), developed by Microsoft.

- [ACE](http://ace.ajax.org), an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.

- [Node-webkit](https://github.com/rogerwang/node-webkit). This is a great initiative from Intel to allow Node libraries to be used within a web page. CATS use this to read and write local files without the need for a server-side component.

- [jsUML2](http://www.jrromero.net/tools/jsUML2). This is library for creating UML diagrams done in pure JavaScript.

Todo
====
The todo list items are tracked as enhancement requests on GitHub. You can check them out at:

[ToDo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)


