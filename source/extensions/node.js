import { WebGL } from '../elements/webgl.js';

WebGL.prototype.Node = class Node {
    drawables = [];
    children = [];

    transform = {
        translation: { x: 0, y: 0 },
        rotation: { z: 0 },
        scale: { x: 1, y: 1 }
    };

    draw(context) {
        const { translation, rotation, scale } = this.transform;

        // context.save();

        // const sin = Math.sin(rotation.z);
        // const cos = Math.cos(rotation.z);
        // context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

        // for (const drawable of this.drawables) {
        //     drawable.draw(context);
        // }

        // for (const child of this.children) {
        //     child.draw(context);
        // }

        // context.restore();
    }
};