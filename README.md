[![Build Status](https://travis-ci.org/jbaron/cats.svg?branch=master)](https://travis-ci.org/jbaron/cats)

## CATS

CATS is an IDE for TypeScript and Web developers. CATS is open source software released under the Apache 2.0 license 
and runs on Linux, Windows and OS X.  CATS itself is also written in TypeScript, so you can easily 
customize it to your needs if required.

Although still new faetures being added, CATS is already very usable and has built-in support for the following: 

- Intelligent code editor and code completion for TypeScript sources.
 
<img width="680" src="https://raw.github.com/jbaron/cats/master/artifacts/cats_screenshot.png" />

- Syntax highlighting for over 110 languages (TextMate/Sublime Text.tmlanguage files can be imported).
- Support for code snippets.
- Support for refactoring and smart navigation.
- Very fast TypeScript compilation to JavaScript.
- Validation of the source code while you are typing.
- Editing features like folding, indentation and code formatting.
- Running your application from within IDE and using the WebKit debugger to debug.
- Flexible build system with support for external build systems like Grunt, Jake, Gulp and Makefiles.

CATS supports the latest versions of TypeScript, so you are able to use all the new features.

## Getting Started

The easiest way to start using CATS it to follow these simple steps:

* In case you haven't already installed NW.js (previously known as node-webkit) on your machine, do that first. In case you have nodejs installed, you can install
  NW.js by typing the following command (using npm, the node package manager):

        npm install -g nwjs

  Alternatively you can download NW.js from the following page: [NW.js downloads](http://nwjs.io). 

* Get the CATS binary package (it is a file called cats-x.y.z.nw). You can download it from the following location:

  [CATS releases](https://github.com/jbaron/cats/releases/) 
  
  
After you done just go to the directory where you downloaded the CATS package and type:

```shell
nwjs cats-x.y.z.nw
```

If you already have a directory with TypeScript files, just select that directory from `Project -> Open project...`
to start editing your files. Alternatively you can open any directory as a project and start adding the
different TypeScript files as you go along with your project.


## Configuration

CATS will look for tsconfig files in the folder you opened from within IDE (Project -> Open Project....). If a tsconfig file was found, CATS will use the values configured in that file.
Otherwise it will create an empty tsconfig file in the root directory and use that instead.

To find out more, check [TSConfig File](https://github.com/jbaron/cats/wiki/TSConfig-File)


## Bugs and Issues

In case you encounter an issue, you can open a ticket on Github. 
Also enhancement requests can be entered here: [Github issue tracker](https://github.com/jbaron/cats/issues)


## Todo

The todo list items are tracked as enhancement requests on GitHub. You can check them out at:

[Todo List](https://github.com/jbaron/cats/issues?labels=enhancement&page=1&state=open)

There is also a milestone planning in there when some enhancements should be delivered. 

