import { Projection } from './transformations/projection.js';
import { Node } from './node.js';

export class Camera extends Node {
    constructor() {
        const projection = new Projection();

        super(projection);

        this.projection = projection;
    }
}