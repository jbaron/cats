// Lets load this first so we know all module have these exports available

module Cats {
    export var fs = require("fs");
    export var path = require("path");
    export var gui = require('nw.gui');
}


module Cats.UI {
    export var fs = require("fs");
    export var path = require("path");
    export var gui = require('nw.gui');
}


module Cats.Menu {
    export var gui = require('nw.gui');
}


module Cats.Commands {
    export var gui = require('nw.gui');
}
