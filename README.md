[![Build Status](https://travis-ci.org/jbaron/cats.svg?branch=master)](https://travis-ci.org/jbaron/cats)

## CATS

CATS is an IDE for TypeScript and Web developers. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. 
CATS itself is also written in TypeScript, so you can easily customize it if required.

And although still work in progress, CATS is already very usable and has built-in support for the following features:

- Intelligent code editor and code completion for TypeScript sources.
 
<img width="680" src="https://raw.github.com/jbaron/cats/master/artifacts/cats_screenshot.png" />

- Syntax highlighting for over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported).
- Support for code snippets.
- Support for refactoring and smart navigation.
- Very fast TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- Linter support for TypeScript and JavaScript.
- Documentation generator based on the comments in the source code.
- Editing features like folding, indentation and code formatting.
- Running your application from within IDE and using the WebKit debugger to debug.
- Support for external build systems like Grunt, Jake, Gulp and Makefiles.

Also the unstable release of CATS has support for the latest features in TypeScript like ES6 support 
and union types.

## Usage

The easiest way to start using CATS it to follow these simple steps:

* In case you haven't already installed NW.js (previously known as node-webkit) on your machine, do that first. In case you have nodejs installed, you can install
  NW.js by typing the following command (using npm, the node package manager):

        npm install -g nw

  Alternatively you can download NW.js from the following page: [NW.js downloads](http://nwjs.io). 

* Download the CATS binary package (it is a file called cats-x.y.z.nw). There are two versions available, a stable version meant for daily work 
  and an unstable version if you want to try out the latest and greatest features. 

  Download either one from the following location:

  [CATS releases](https://github.com/jbaron/cats/releases/) 
  
  
After you installed NW.js, just go to the directory where you downloaded the CATS package and type:

```shell
nw cats-x.y.z.nw
```

If you already have a directory with TypeScript files, just select that directory from "Open project..." 
to start editing your files. Othwewise you can open any directory as a project and start adding the
different typefiles as you go along with your project.

There are some commandline paramters you can use. For example to open CATS with a specific project, use:

```shell        
nw cats-x.y.z.nw --project </path/projectDirectory>
```

Please note that you have to specify the full path to the project directory you want to open. 

To open CATS with the same project as last time you opened it, you can use the --restore option:

```shell
nw cats-x.y.z.nw --restore
```

## Building

In case you want to make changes to CATS and want to build new versions, there are a few 
additional steps to perform.

Ensure that you have [Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed.

Clone a copy of the CATS repo:

```
git clone https://github.com/jbaron/cats.git
```

Change to the cats directory:

```
cd cats
```

Install NW.js, TypeScript, Jake and the module dependencies:

```
npm install -g nw
npm install -g jake
npm install
```

Use one of the following to build:

```
jake lib/main.js            # Builds the main frontend module for CATS
jake lib/tsworker.js        # Builds the Web workers module
jake clean                  # Cleans the compiler output, declare files, and tests
jake default                # Builds the full CATS application
jake dist                   # build a distribution file (only works on OSX/Linux)
jake -T                     # List the above commands. 
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

- [Qooxdoo](http://www.qooxdoo.org), an excellent JavaScript library with many great UI widgets.  

- [ACE](http://ace.ajax.org), an embeddable code editor written in JavaScript. The main developers are Cloud9 and Mozilla.

- [NW.js](http://nwjs.io). This is a great initiative from Intel that allows Node libraries to be used within a web page. 
  CATS use this to read and write local files without the need for a server-side component.

- [TSLint](https://github.com/palantir/tslint). A linter for the TypeScript language that helps to improve your code base even further.

- [TypeDoc](https://github.com/sebastian-lenz/typedoc). This is a documentation generator for TypeScript projects that supports
  theming and a lot of other very impressive features. 

- [jsUML2](http://www.jrromero.net/tools/jsUML2). This is library for creating UML diagrams done in pure JavaScript.

## Todo

The todo list items are tracked as enhancement requests on GitHub. You can check them out at:

[Todo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)

There is also a milestone planning in there when some enhancements should be delivered. 

