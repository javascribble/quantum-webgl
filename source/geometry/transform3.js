import { Vector3 } from "./vector3.js";

export class Transform3 {
    constructor() {
        this.translation = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3();
    }
}