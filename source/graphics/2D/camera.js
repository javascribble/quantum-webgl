import { Transform } from './transform.js';
import { Projection } from './transformations/projection.js';
import { draw } from '../../renderer/draw.js';

export class Camera extends Projection {
    transform = new Transform();

    render(context, drawables) {
        draw(context, drawables);
    }
}