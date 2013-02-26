
var __jb = {
    modules : {},
    loaded : {}
};


function __activate(moduleName) {
    var fn =  __jb.modules[moduleName];
    var exports = {}
    fn(null,exports);
    return exports;
}

function __jb_require(moduleName) {
    if (__jb.loaded.hasOwnProperty(moduleName)) {
        return __jb.loaded[moduleName];
    }
    
    if (__jb.modules.hasOwnProperty(moduleName)) {
        __jb.loaded[moduleName] = __activate(moduleName);
        return __jb.loaded[moduleName];
    }
    
    throw new Error("Module " + moduleName + " not found.");
    
}


(function(moduleName) {
    
    __jb.modules[moduleName] = function(require, exports) {
        // Original code here        
    }
        
})("test/module1");
