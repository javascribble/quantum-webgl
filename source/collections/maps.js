export class HandleMap extends Map {
    constructor(allocate, deallocate, reallocate) {
        super();

        this.allocate = allocate;
        this.deallocate = deallocate;
        this.reallocate = reallocate;
    }

    load(name, options) {
        if (this.has(name)) {
            this.get(name).references++;
        } else {
            const value = this.allocate(options);
            value.references = 1;
            this.set(name, value);
        }
    }

    unload(name) {
        const value = this.get(name);
        if (value.references-- === 0) {
            this.deallocate(value);
            this.delete(name);
        }
    }

    restore() {
        for (const value in this.values()) {
            this.reallocate(value);
        }
    }
}