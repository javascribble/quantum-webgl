import { resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';
import html from '../templates/webgl.js';

export class WebGL extends Component {
    constructor() {
        super();

        // TODO: Unfinished.
        this.canvas = createCanvas();
        this.context = getContext(this.canvas);
        this.appendChild(this.canvas);

        this.entities = new Set();
        this.add = (entity) => this.entities.add(entity);
        this.delete = (entity) => this.entities.delete(entity);
        this.validate = (entity) => entity.renderable;

        const engine = this.parentElement;
        engine.loaders.png = loadImage;
        engine.loaders.glsl = engine.loadText;
        engine.animations.add(this);
        engine.systems.add(this);
    }

    static template = template(html);

    static attributes = [];

    animate(deltaTime) {
        resizeCanvas(this.canvas);
        for (const { renderable } of this.entities) {
        }
    }
}

define('quantum-webgl', WebGL);