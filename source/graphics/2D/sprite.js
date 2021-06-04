import { Node } from './node.js';

export class Sprite extends Node {
    constructor(program, buffers, textures) {
        super();

        this.program = program;
        this.buffers = buffers;
        this.textures = textures;
    }
}