export class ReferenceMap extends Map {
    set(key, constructor) {
        if (this.has(key)) {
            this.get(key).references++;
        } else {
            const value = constructor();
            value.references = 1;
            super.set(key, value);
        }
    }

    delete(key, destructor) {
        const value = this.get(key);
        if (value.references-- === 0) {
            destructor(value);
            super.delete(key);
        }
    }
}