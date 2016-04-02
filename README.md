[![Build Status](https://travis-ci.org/jbaron/cats.svg?branch=master)](https://travis-ci.org/jbaron/cats)

## CATS

CATS is an IDE for TypeScript and Web developers. CATS is open source software released under the Apache 2.0 license and runs on Linux, Windows and OS X. 
CATS itself is also written in TypeScript, so you can easily customize it to your needs if required.

And although still work in progress, CATS is already very usable and has built-in support for the following features: 

- Intelligent code editor and code completion for TypeScript sources.
 
<img width="680" src="https://raw.github.com/jbaron/cats/master/artifacts/cats_screenshot.png" />

- Syntax highlighting for over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported).
- Support for code snippets.
- Support for refactoring and smart navigation.
- Very fast TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- Linter support for TypeScript and JavaScript.
- Editing features like folding, indentation and code formatting.
- Running your application from within IDE and using the WebKit debugger to debug.
- Flexible build system with support for external build systems like Grunt, Jake, Gulp and Makefiles.

CATS supports the latest versions of TypeScript, so you are able to use all the new features.

## Usage

The easiest way to start using CATS it to follow these simple steps:

* In case you haven't already installed NW.js (previously known as node-webkit) on your machine, do that first. In case you have nodejs installed, you can install
  NW.js by typing the following command (using npm, the node package manager):

        npm install -g nwjs

  Alternatively you can download NW.js from the following page: [NW.js downloads](http://nwjs.io). 

* Download the CATS binary package (it is a file called cats-x.y.z.nw). There are two versions available, a stable version meant for daily work 
  and an unstable version if you want to try out the latest and greatest features. 

  Download either one from the following location:

  [CATS releases](https://github.com/jbaron/cats/releases/) 
  
  
After you installed NW.js, just go to the directory where you downloaded the CATS package and type:

```shell
nwjs cats-x.y.z.nw
```

If you already have a directory with TypeScript files, just select that directory from "Open project..." 
to start editing your files. Othwewise you can open any directory as a project and start adding the
different typefiles as you go along with your project.

There are some commandline paramters you can use. For example to open CATS with a specific project, use:

```shell        
nwjs cats-x.y.z.nw --project </path/projectDirectory>
```

Please note that you have to specify the full path to the project directory you want to open. 

To open CATS with the same project as last time you opened it, you can use the --restore option:

```shell
nwjs cats-x.y.z.nw --restore
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

Install NW.js, TypeScript and the module dependencies:

```
npm install -g nwjs
npm install
```

Then run the following to build:

```
npm run build
```


## Configuration

CATS will look for tsconfig files in the directory opened from the IDE. If found, CATS will use the values configured in this file.
Otherise it will create a tsconfig file in the root directory and use that.


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

- [Qooxdoo](http://www.qooxdoo.org), an excellent JavaScript library for creating a UI. Has many great widgets out of the box.  

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

