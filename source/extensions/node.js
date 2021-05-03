import { WebGL } from '../elements/webgl.js';
import { Transform } from '../graphics/2D/transform.js';

WebGL.prototype.Node = class Node {
    children = [];

    transform = new Transform();

    constructor(context, index) {
        const modelBuffer = context.buffers.get('model');
        if (!modelBuffer.data) {
            modelBuffer.data = this.matrix;
        } else {
            buffer.set(this.#matrix, offset, this.#matrix.length);
            this.#matrix = new Matrix3(buffer, offset, this.#matrix.length);
        }

        modelBuffer.changed = true;

        const objects = new Set();
        buffer.add = object => {
            objects.add(object);
            objects.forEach(o => o.bind(buffer.data));
        };

        buffer.remove = object => {
            objects.delete(object);
            objects.forEach(o => o.bind(buffer.data));
            buffer.data = .subarray(buffer.offset, buffer.length);
        };
    }

    // get changed() { return this.parent?.changed || this.transform.changed }

    // if (this.changed) {
    //     if (parent) {
    //         this.#matrix.compose(this.parent.matrix, this.matrix);
    //     } else {
    //         this.#matrix = this.matrix;
    //     }
    // }

    draw(context, state = {}) {
        // context.save();

        // const { translation, rotation, scale } = this.transform;
        // const sin = Math.sin(rotation.z);
        // const cos = Math.cos(rotation.z);
        // context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

        for (const child of this.children) {
            child.draw(context, state);
        }

        // context.restore();
    }
};