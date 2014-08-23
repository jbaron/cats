class SessionHistory {
    private maxEntries = 1000;
    private entries = [];
    private pos = 0;
    private last:SessionPage
    
    add(entry) {
        if (this.last) this.entries.push(this.last);
        this.last = entry;
    }
    
    back() {
        this.pos--;
        if (this.pos < 0) this.pos = 0;
        var page = this.entries[this.pos];
    }
    
    
    next() {
        this.pos++;
        
    }
    
}