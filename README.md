Introduction
============
tsedit is an editor for the TypeScript developer. Right now it is more a proof of concept than a full-blown editor. But at least it supports:

- Basic code completion: Just type <Ctrl><Space> after you typed a variable and the dot to see what methods are available on that variable. So for example: 

            document.body.<Ctrl><Space> 

- Syntax highlighting


One nice thing is that it is actually build in TypeScript (with the use of some plain JavaScript libraries).


Installation
============
To install, just follow these steps:

1. Download the jsedit source: git clone https://github.com/jbaron/tsedit.git

2. Download and install both the standalone tsc and node-webkit (binaries will do) in case you don't have them yet:
     - For tsc, you can just run: npm -g install tsc
     - For node-webkit, you can get a binary from:https://github.com/rogerwang/node-webkit


3. Compile jsedit from within the jsedit directory:
      - tsc @build

4. Start the editor: /path_to_node_webkit/nw ./
   

Couldn't have done it wihout ....
==========================================
Some of the main components that are used:

- Codemirror editor 3.0 beta (great Web based editor)
- Typescipt 0.8.1 (of course)
- Node-webkit. This is a great initiative of Intel to allow Node libraries to be used within a web page.


