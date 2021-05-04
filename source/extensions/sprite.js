import { WebGL } from '../elements/webgl.js';
import { Matrix3 } from '../graphics/matrix3.js';
import { Transform } from '../graphics/2D/transform.js';

WebGL.prototype.Sprite = class Sprite extends Transform {
    array;

    constructor(context) {
        super();

        this.program = context.programs.get('default');
        this.buffers = [context.buffers.get('quad'), context.buffers.get('model')];
        this.textures = [context.textures.get('default')];
    }

    connect(buffer, offset) {
        this.array = buffer.subarray(offset, offset + 9);
    }

    update() {
        this.array.set(this.matrix);
    }
};