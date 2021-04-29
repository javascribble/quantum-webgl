import { Angle } from '../angle.js';
import { Matrix3 } from '../matrix3.js';
import { Vector2 } from '../vector2.js';

export class Transform {
    #translation = new Matrix3();
    #rotation = new Matrix3();
    #scale = new Matrix3();

    #local = new Matrix3();
    #global = new Matrix3();

    parent;

    constructor() {
        this.translation = new Vector2();
        this.rotation = new Angle();
        this.scale = new Vector2();
    }

    get changed() { return this.parent }

    update() {
        if (this.rotation.changed) {
            this.rotation.changed = false;
            const radians = this.rotation.radians;
            const sine = Math.sin(radians);
            const cosine = Math.cos(radians);
            const matrix = this.#rotation;
            matrix[0] = cosine;
            matrix[1] = -sine;
            matrix[3] = sine;
            matrix[4] = cosine;
        }

        if (this.translation.changed) {
            this.translation.changed = false;
            const matrix = this.#translation;
            matrix[0] = this.translation.x;
            matrix[4] = this.translation.y;
        }

        if (this.scale.changed) {
            this.scale.changed = false;
            const matrix = this.#scale;
            matrix[6] = this.scale.x;
            matrix[7] = this.scale.y;
        }

        if (parent) {

            //local * parent = world
        } else {
            //local = world
        }
    }
}