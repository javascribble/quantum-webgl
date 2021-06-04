import { Matrix3 } from '../matrix3.js';
import { Transform } from '../transform.js';
import { Translation } from './transformations/translation.js';
import { Rotation } from './transformations/rotation.js';
import { Scale } from './transformations/scale.js';

export class Node extends Transform {
    // children = [];

    constructor(...transformations) {
        const translation = new Translation();
        const rotation = new Rotation();
        const scale = new Scale();

        super([translation, rotation, scale, ...transformations], new Matrix3());

        this.translation = translation;
        this.rotation = rotation;
        this.scale = scale;
    }

    // get changed() { return this.parent?.changed || this.transform.changed }

    // get matrix() {
    //     context.save();

    //     const { translation, rotation, scale } = this.transform;
    //     const sin = Math.sin(rotation.z);
    //     const cos = Math.cos(rotation.z);
    //     context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

    //     for (const child of this.children) {
    //         child.draw(context);
    //     }

    //     context.restore();
    // }
}