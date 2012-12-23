
Model
=======
There is one project per window for now. If you open a new project, a new window will be opened. 

A particular project is linked to one ACE editor. When you select a different file within the project, a different edit session will be loaded in the editor. But it is still the same editor instance.

Also one TSWorker instance is linked to a project. So not every edit session has it own TSWorker, but they all edit sessions within a single project share the same TSWorker. This keeps it much easier to keep the state of the TSWorker up to date with the code changed made and also required much less resources on big projects.


Main
====

For local file access the Node file system API is used. Most of it is for now is using the Sync version, but this could change in the future if required.

In order to make it run on multiple platforms, Node path API is used when manipulation file and directory names. 


TSWorker
========

TSWorker is running as a web worker and handles all the heavy lifting, like compiling TypeSCript code and proving code completion options. Since it is running in a web worker it cannot access the node API. So all the file IO is done in the main environment and not in TSWorker.

The communication between CATS and the web worker is done trough a JSON-RPC API. So you send a command to TSWorker with an unique ID, and once you get a response message with that ID back, you can handle the result.

To keep a clean separation, all the TypeSCript libraries are only loaded in TSWorker, the main CATS library has NO runtime dependency on TypeScript.


