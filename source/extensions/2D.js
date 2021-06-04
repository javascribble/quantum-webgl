import { WebGL } from '../elements/webgl.js';
import { Camera } from '../graphics/2D/camera.js';
import { Node } from '../graphics/2D/node.js';
import { Sprite } from '../graphics/2D/sprite.js';

Object.assign(WebGL.prototype, { Camera, Node, Sprite });