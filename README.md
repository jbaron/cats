Introduction
============
CATS is an editor for the TypeScript developer. It stands for Code Assistant for TypeScript. Previously it was called tsEdit, but it turns out there is already an editor with that same name. And to avoid any confusion, I decided to rename my editor to CATS.

CATS is not yet a full-blown editor, but it is slowly getting there. Right now it has already support for:

- Basic code completion:

    a) When you type a "." member based code completion will be triggered.

    b) Anywhere else you can type control-space to get code completion. 
                       
- Syntax highlighting.

- Validation of the source code (running in the background) informing you of any compiler warnings.

- Various basic coding assistance like indentation (see help => keyboard shortcuts to see the list).

- Theme support:

<img src="https://raw.github.com/jbaron/cats/master/artifacts/screenshot.jpg" height="250px" width="250px" />
<img src="https://raw.github.com/jbaron/cats/master/artifacts/screenshot2.jpg" height="250px" width="250px" />
<img src="https://raw.github.com/jbaron/cats/master/artifacts/screenshot3.jpg" height="250px" width="250px" />

With this version you can now also save changed file. It is however strongly advised to make a backup first before using CATS on your project since the software is still considered to be alpha quality.


Installation & Running it
=========================
To install CATS, just follow these steps:

1. Download the CATS from Github: 

                git clone https://github.com/jbaron/cats.git

2. Download and install node-webkit. In case you don't have node-webkit yet, you can download a binary for Windows, Linux or Mac at:
     
     			https://github.com/rogerwang/node-webkit


3. Go to the cats directory and type: /path_to_node_webkit/nw ./
   

Configuration
=============
The editor scans a project directory and finds automatically all the TypeScript files in there. You can also open and edit other text files within that directory. Just don't open binary files yet.


Compiling from source
=====================
There is no need to compile CATS yourself, since all the compiled files are already included. But if you want to try it, here are the simple steps:

1. Make sure you have installed TypeScript 0.8.1 or later

2. Go to the cats directory

3. type> tsc @build
   This will compile the worker.js file

4. type> tsc @build2
   This will compile the main.js file 

That is all there is to it. 


Couldn't have done it without ....
=================================
Some of the main components that are being used by CATS:

- ACE is an embeddable code editor written in JavaScript.
- Typescipt 0.8.1 (of course).
- Node-webkit. This is a great initiative of Intel to allow Node libraries to be used within a web page. We use this to read and write local files without the need for a server component.


Todo
=====
See the TODO.md file.
