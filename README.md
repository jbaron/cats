Introduction
============
CATS is an IDE for the TypeScript developer. It stands for Code Assistant for TypeScript. CATS is opensource software and runs on Linux, Windows and OSX. CATS itself is written in TypeScript.

Although not yet feature complete, it is getting there. Right now CATS already has built-in support for the following features:

- Code completion (just type a dot or Ctrl-Space to invoke it).
                       
- Syntax highlighting (and not only for TypeScript).

- Validation of the source code (running in the background) informing you of compiler warnings and errors.

- Various editing features like folding, indentation (see also help => keyboard shortcuts to see a list).

- Compilation, both to a single file or to multiple files.

- Running the code from within IDE.

- Theme support:

<img src="https://raw.github.com/jbaron/cats/master/artifacts/themes.jpg" height="250px" width="850px" />

It is strongly encouraged to first make a backup before using CATS on your project since the software is still considered to be of alpha quality. 


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
There is normally no need to compile CATS yourself, since all the compiled files are already included. But if you want to play aorund with it, here are the steps:

1. Make sure you have installed TypeScript 0.8.1 or later

2. Go to the cats directory

3. The following will compile the required worker.js file:

         tsc @build

4. Now the only thing left is to compile the main.js file: 

		tsc @build2
   

That is all there is to it. The lib file should now have an updated main.js and worker.js file and you are ready to run CATS editor.


Couldn't have done it without ....
==================================
Some of the main components that are being used by CATS:

- Typescipt (of course), developed by Microsoft.
- ACE, an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.
- Node-webkit. This is a great initiative of Intel to allow Node libraries to be used within a web page. We use this to read and write local files without the need for a server component.


Todo
=====
See the TODO.md file for details.
