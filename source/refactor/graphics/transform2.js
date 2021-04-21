import { Angle } from "./angle.js";
import { Vector2 } from "./vector2.js";

export class Transform2 {
    constructor() {
        this.translation = new Vector2();
        this.rotation = new Angle();
        this.scale = new Vector2();
    }

    setTranslation(m3, v2) {
        m3[6] = v2[0];
        m3[7] = v2[1];
    }

    setRotation(m3, radians) {
        const s = Math.sin(radians);
        const c = Math.cos(radians);
        m3[0] = c;
        m3[1] = -s;
        m3[3] = s;
        m3[4] = c;
    }

    setScale(m3, v2) {
        m3[0] = v2[0];
        m3[4] = v2[1];
    }
}