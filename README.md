## CATS

CATS is an IDE for the TypeScript developer. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. 
CATS itself is written in TypeScript and even being developed using CATS as the IDE. 

Right now CATS already has built-in support for the following features:

- Intelligent code editor and code completion for TypeScript sources.
 
<img src="https://raw.github.com/jbaron/cats/master/artifacts/autocomplete.png" />

- Syntax highlighting for over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported)
- Support for refactoring and smart navigation.
- TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- JavaScript JSHint support.
- Editing features like folding and indentation.
- Running your application from within IDE and using the WebKit debugger to debug.
- Support for external build systems like Grunt and Jake.

## Building

In order to build the TypeScript compiler, ensure that you have 
[Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the CATS repo:

```
git clone https://github.com/jbaron/cats.git
```

Change to the cats directory:

```
cd cats
```

Install Jake tools and the dependencies:

```
npm install -g jake
npm install
```

Use one of the following to build and test:

```
jake local           # Build the compiler into built/local 
jake clean           # Delete the built compiler 
jake LKG             # Replace the last known good with the built one.
                     # Bootstrapping step to be executed when the built compiler reaches a stable state.
jake tests           # Build the test infrastructure using the built compiler. 
jake runtests        # Run tests using the built compiler and test infrastructure. 
                     # You can override the host or specify a test for this command. 
                     # Use host=<hostName> or tests=<testPath>. 
jake baseline-accept # This replaces the baseline test results with the results obtained from jake runtests. 
jake -T              # List the above commands. 
```


## Usage

```shell
node-webkit </path/CATSInstallationDirectory>
```


## Building

To install CATS, just follow these steps:

1. Download the CATS from Github: 

        git clone https://github.com/jbaron/cats.git

2. Download and install node-webkit. In case you don't have node-webkit yet, you can download a binary for Windows, Linux or Mac at: [Node-Webkit](https://github.com/rogerwang/node-webkit).
   Make sure you have at least version 0.8.0 installed.

3. Go to the cats directory and type: 

        node-webkit </path/CATSInstallationDirectory> 
        

There are some option you can use. For example to open CATS with a specific project, use:
        
        node-webkit </path/CATSInstallationDirectory> --project </path/projectDirectory>

Or to open CATS with the same project as last time use the --restore option:

        node-webkit </path/CATSInstallationDirectory> --restore


With CATS you also get a samples directory with some small projects you can try out. Of course you can also open a directory that contains your own project. 
When you want to start CATS with a specific project, you have to pass the project directory as a command line parameter:


Windows example:

		nw.exe C:\cats --project C:\cats\samples\greeter
   
OSX and Linux example: 

        nw /Users/peter/Development/cats --project /Users/peter/Development/cats/samples/greeter 

I'm using the nw alias in my ~/.bash_profile as explained on the node-webkit page:

        alias nw="/Applications/node-webkit.app/Contents/MacOS/node-webkit"


Configuration
=============
CATS will look for a file in the project directory called: ".settings/config.json". If found, CATS will use the values configured in this file, otherwise it will use some sensible default values.
You can edit this file (or the default values if you don't have this file yet) from the main menu.


Goals
=====
One of the main goals of CATS is to make the developer that is used to IDE's like Eclipse, NetBeans, Visual Studio or IntelliJ, feel right at home. So the same support you got from your IDE when you developed in Java or C#, is now available for TypeScript projects.
And in order to be productive, it is also very important that an IDE is responsive. So while designing and developing CATS, performance is one of the key aspects.
In fact, CATS runs fine on older hardware.


Bugs and Issues
===============
In case you encounter an issue, you can open a ticket on Github. Also enhancement requests can be entered here: [Github issue tracker](https://github.com/jbaron/cats/issues)


Building from source
=====================
There is normally no need to compile CATS yourself, since all the compiled files are already included. But if you want to play around with it, here are the steps:

1. Make sure you have installed TypeScript 1.0.1 or later

2. Also make sure you have Nodejs and Jake installed. You can get node from nodejs.org and after that install Jake:
 
        npm install -g jake

2. Go to the cats directory

3. The following will compile the required files:

        jake

That is all there is to it. The lib directory should now have an updated main.js, tsworker.js and uml.js files and you are ready to run CATS editor.

TIP: you can add the --debug flag to the commandline to get more info on what is going on internally within CATS.


Couldn't have done it without ....
==================================
There is not a lot of documentation yet explaining the structure of CATS and how the different parts relate to eachother. 
So the more surprised we were when we received some pull request that added functionality or fixed some bugs. So thanks to everyone who
contributed some code to this project.

And of course some of the main 3rd party components that we have used within CATS and couldn't have done without:

- [TypeScript](http://www.typescriptlang.org) (of course), developed by Microsoft.

- [Qooxdoo](http://www.qooxdoo.org), excellent JavaScript library with many great UI widgets.  

- [ACE](http://ace.ajax.org), an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.

- [Node-webkit](https://github.com/rogerwang/node-webkit). This is a great initiative from Intel to allow Node libraries to be used within a web page. CATS use this to read and write local files without the need for a server-side component.

- [jsUML2](http://www.jrromero.net/tools/jsUML2). This is library for creating UML diagrams done in pure JavaScript.

Todo
====
The todo list items are tracked as enhancement requests on GitHub. You can check them out at:

[ToDo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)


