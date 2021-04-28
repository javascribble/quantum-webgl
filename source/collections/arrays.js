export class ResizableArray {
    constructor(type) {
        this.array = new type();
    }
}

export class VirtualArray {
    #identity;
    #array;
    #type;

    constructor(identity, type) {
        this.#identity = identity;
        this.#type = type;

        this.#array = new type(identity);
    }

    get array() {
        return this.#array;
    }

    bind(array, offset) {
        array.set(this.#array, offset);
        this.#array = new this.#type(array, offset, this.#identity.length);
    }
}