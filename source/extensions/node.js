import { WebGL } from '../elements/webgl.js';
import { Transform } from '../graphics/2D/transform.js';

WebGL.prototype.Node = class Node {
    children = [];

    transform = new Transform();

    constructor(context, index) {

    }

    // get changed() { return this.parent?.changed || this.transform.changed }



    draw(context) {
        // context.save();

        // const { translation, rotation, scale } = this.transform;
        // const sin = Math.sin(rotation.z);
        // const cos = Math.cos(rotation.z);
        // context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

        for (const child of this.children) {
            child.draw(context);
        }

        // context.restore();
    }
};