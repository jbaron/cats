Introduction
============
CATS is an editor for the TypeScript developer. It stands for Code Assistant for TypeScript. Previously it was called tsEdit, but it turns out there is already an editor with that same name. And to avoid any confusion, I decided to rename my editor to CATS.

Right now it is more a proof of concept than a full-blown editor. But at least it supports:

- Basic code completion: 
	  - When you type a "." member bsaed code completion will be triggered.
	  - Anywhere else you can type <Ctrl><Space> 

- Syntax highlighting

- Background compiling

For simple playing around it should so. There is no save functionality yet, but that is on the todo list.
One nice thing is that CATS is actually build in TypeScript (with the use of some plain JavaScript libraries).


Installation & Running it
=========================
To install CATS, just follow these simple steps:

1. Download the CATS from Github: git clone https://github.com/jbaron/cats.git

2. Download and install node-webkit. In case you don't have node-webkit yet, you can download a binary for Windows, Linux or Mac at:
     
     			https://github.com/rogerwang/node-webkit


3. Go to the CATS directory and type: /path_to_node_webkit/nw ./
   

Configuration
=============
Right now the editor looks for a file called build in the project home directory. This file contains a list of TypeScript files to include in the project relative to the project directory. One way to create such a file from a existing project on Linux, execute the following steps:

1. cd <project_home_dir>
2. find ./ -name "*.ts" > build



Couldn't have done it wihout ....
==========================================
Some of the main components that are used:

- Codemirror editor 3.0 release candidate 1 (a great Web based editor)
- Typescipt 0.8.1 (of course)
- Node-webkit. This is a great initiative of Intel to allow Node libraries to be used within a web page.


ToDo
====
See the TODO.md

