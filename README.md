## CATS

CATS is an IDE for the TypeScript developer. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. 
CATS itself is written in TypeScript and even being developed using CATS as the IDE. 

Right now CATS already has built-in support for the following features:

- Intelligent code editor and code completion for TypeScript sources.
 
<img width="680" src="https://raw.github.com/jbaron/cats/master/artifacts/cats_screenshot.png" />

- Syntax highlighting for over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported)
- Support for refactoring and smart navigation.
- TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- Lint support for TypeScript and JavaScript.
- Editing features like folding and indentation.
- Running your application from within IDE and using the WebKit debugger to debug.
- Support for external build systems like Grunt, Jake and Makefiles.

## Building

In order to build CATS, ensure that you have 
[Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the CATS repo:

```
git clone https://github.com/jbaron/cats.git
```

Change to the cats directory:

```
cd cats
```

Install Nodewebkit, Jake and the module dependencies:

```
npm install -g nodewebkit
npm install -g jake
npm install
```

Use one of the following to build:

```
jake lib/main.js            # Builds the main frontend module for CATS
jake lib/tsworker.js        # Builds the Web workers module
jake clean                  # Cleans the compiler output, declare files, and tests
jake default                # Builds the full CATS application
jake -T                     # List the above commands. 
```

## Usage
From the cats directory run 

```shell
nodewebkit
```

There are some option you can use. For example to open CATS with a specific project, use:

```shell        
nodewebkit --project </path/projectDirectory>
```

Or to open CATS with the same project as last time use the --restore option:

```shell
nodewebkit --restore
```

With CATS you also get a samples directory with some small projects you can try out. Of course you can also open a directory that contains your own project. 

```shell
nodewebkit --project samples/greeter
```

## Configuration

CATS will look for a file in the project directory called: ".settings/config.json". If found, CATS will use the values configured in this file, otherwise it will use some sensible default values.
You can edit this file (or the default values if you don't have this file yet) from the main menu.


## Goals

One of the main goals of CATS is to make the developer that is used to IDE's like Eclipse, NetBeans, Visual Studio or IntelliJ, feel right at home. 
So the same support you got from your IDE when you developed in Java or C#, is now available for TypeScript projects.

However a lot of effort is spent to assure CATS deosn't become a resource hog. So while designing and developing CATS, performance is one of the key aspects.
In fact, CATS runs fine on older hardware.


## Bugs and Issues

In case you encounter an issue, you can open a ticket on Github. 
Also enhancement requests can be entered here: [Github issue tracker](https://github.com/jbaron/cats/issues)


## Couldn't have done it without ....

There is not a lot of documentation yet explaining the structure of CATS and how the different parts work together. 
So the more surprised we were when we received some pull request that added functionality or fixed some bugs. So thanks to everyone who
already contributed to this project.

And of course some of the main 3rd party components that we have used within CATS and couldn't have done without:

- [TypeScript](http://www.typescriptlang.org) (of course), developed by Microsoft.

- [Qooxdoo](http://www.qooxdoo.org), excellent JavaScript library with many great UI widgets.  

- [ACE](http://ace.ajax.org), an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.

- [Node-webkit](https://github.com/rogerwang/node-webkit). This is a great initiative from Intel to allow Node libraries to be used within a web page. 
  CATS use this to read and write local files without the need for a server-side component.

- [jsUML2](http://www.jrromero.net/tools/jsUML2). This is library for creating UML diagrams done in pure JavaScript.

## Todo

The todo list items are tracked as enhancement requests on GitHub. You can check them out at:

[Todo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)

There is also a milestone planning in there when some enhancements should be delivered. 


