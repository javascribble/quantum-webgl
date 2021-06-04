import { Node } from './node.js';

export class Camera extends Node {
    constructor(projection) {
        super(projection);

        this.projection = projection;
    }
}