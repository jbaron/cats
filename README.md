Introduction
============
CATS is an IDE for the TypeScript developer. It stands for Code Assistant for TypeScript. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. CATS itself is written in TypeScript and even being developed with CATS.

Although not yet feature complete, it is getting there. Right now CATS already has built-in support for the following features:

- TypeScript code completion (just type a dot or Ctrl-Space to invoke it).

- TypeScript compilation to JavaScript.

- Syntax highlighting for many languages including TypeScript.

- Validation of the TypeScript source code while you are typing.

- JavaScript JSHint support.

- The normal editing features you expect of a mature editor, like folding, indentation (see also help => keyboard shortcuts to see a list).

- Running your application from within IDE and using the WebKit debugger.

- Theme support:

<img src="https://raw.github.com/jbaron/cats/master/artifacts/themes.png" height="220px" width="850px" />

It is recommended to first make a backup before using CATS on your project since the software is still considered to be of alpha quality. 

Installation & Running it
=========================
To install CATS, just follow these steps:

1. Download the CATS from Github: 

        git clone https://github.com/jbaron/cats.git

2. Download and install node-webkit. In case you don't have node-webkit yet, you can download a binary for Windows, Linux or Mac at: [Node-Webkit](https://github.com/rogerwang/node-webkit)


3. Go to the cats directory and type: /path_to_node_webkit/nw ./

By default the "greeter" project will be loaded. In the samples directory there are several other projects you can try out. Of course when you open a new project, you can also open a directory that contains your own project.
   

Configuration
=============
CATS will look for a file in the project directory called: ".settings/config.json". If found, CATS will use the values configured in this file, otherwise it will use sensible default values.

You can edit this file (or the default values if you don't have this file yet) from the main menu.


Bugs and Issues
===============
In case you encounter an issue, you can open a ticket on Github. Also feature requests can be entered here: [Github issue tracker](https://github.com/jbaron/cats/issues)


Building from source
=====================
There is normally no need to compile CATS yourself, since all the compiled files are already included. But if you want to play around with it, here are the steps:

1. Make sure you have installed TypeScript 0.8.1 or later

2. Go to the cats directory

3. The following will compile the required tsworker.js file:

        tsc @build

4. Now the only thing left is to compile the main.js file: 

        tsc @build2
   
That is all there is to it. The lib file should now have an updated main.js and tsworker.js file and you are ready to run CATS editor.


Couldn't have done it without ....
==================================
Some of the main 3rd party components that we have used within CATS and couldn't have done without:

- TypeScript (of course), developed by Microsoft.

- ACE, an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.

- Node-webkit. This is a great initiative from Intel to allow Node libraries to be used within a web page. We use this to read and write local files without the need for a server-side component.


Todo
====
The todo list items are tracked as enhancement request on GitHub. You can check them out at:

[ToDo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)


