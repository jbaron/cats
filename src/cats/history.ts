/**
 * This class implements the history functionality 
 * that makes it possible to go back were you where 
 * before.
 */ 
class SessionHistory {
    
    private maxEntries = 1000;
    private entries = [];
    private pos = 0;
    private last: {
        hash: number;
        pos: any;
    };

    add(entry: SessionPage) {
           
        this.entries.push({
            hash: entry.toHashCode(),
            pos: undefined
        });
        
        this.pos = this.entries.length -1;
    }

    back() {
        var found = false;
        while ((! found) && (this.pos > 0)) {
            this.pos--;
            var entry = this.entries[this.pos];
            if (this.exists(entry)) {
                this.goto(entry);
                found = true;
            }
            
        }
    }

    next() {
        var found = false;
        while ((! found) && (this.pos < (this.entries.length - 1) )) {
            this.pos++;
            var entry = this.entries[this.pos];
            if (this.exists(entry)) {
                this.goto(entry);
                found = true;
            }
        }
    }


    /**
     * Check if the page still is part of the sessions
     */
    private exists(entry) {
        var hash = entry.hash
        var page = <SessionPage>qx.core.ObjectRegistry.fromHashCode(hash);
        if (! page) return false;
        return IDE.sessionTabView.getChildren().indexOf(page) > -1;
    }

    private goto(entry) {
        var hash = entry.hash
        var page = <SessionPage>qx.core.ObjectRegistry.fromHashCode(hash);
        IDE.sessionTabView.navigateToPage(page, entry.pos);
    }

    
 
}