import { draw } from '../renderer/draw.js';

const { WebGL } = Quantum;

WebGL.prototype.render = function (state) {
    draw(state, this);
};