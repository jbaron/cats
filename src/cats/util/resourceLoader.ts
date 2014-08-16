class ResourceLoader {
    
    private require(file, callback) {
        callback = callback ||
        function () {};
        var filenode;
        var jsfile_extension = /(.js)$/i;
        var cssfile_extension = /(.css)$/i;
    
        if (jsfile_extension.test(file)) {
            filenode = document.createElement('script');
            filenode.src = file;
            filenode.onload = function () {
                callback();
            };
            document.head.appendChild(filenode);
        
        } else if (cssfile_extension.test(file)) {
            filenode = document.createElement('link');
            filenode.rel = 'stylesheet';
            filenode.type = 'text/css';
            filenode.href = file;
            document.head.appendChild(filenode);
            callback();
        } else {
            console.log("Unknown file type to load.")
        }
    }

    loadResources(files:Array<string>, callback) {
        var counter = 0;
        files.forEach((file) => {
            this.require(file, () =>{
                counter++;
                if (counter === files.length) { callback() } 
            });
        });
    }

    
}