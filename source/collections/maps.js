export class HandleMap extends Map {
    constructor(allocate, deallocate, reallocate) {
        super();

        this.allocate = allocate;
        this.deallocate = deallocate;
        this.reallocate = reallocate;
    }

    set(key, options) {
        if (this.has(key)) {
            this.get(key).references++;
        } else {
            const value = this.allocate(options);
            value.references = 1;
            super.set(key, value);
        }
    }

    delete(key) {
        const value = this.get(key);
        if (value.references-- === 0) {
            this.deallocate(value);
            super.delete(key);
        }
    }

    restore() {
        for (const value in this.values()) {
            this.reallocate(value);
        }
    }
}