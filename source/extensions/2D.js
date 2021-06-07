import { WebGL } from '../elements/webgl.js';
import { Camera } from '../graphics/camera.js';
import { Node } from '../graphics/node.js';
import { Sprite } from '../graphics/sprite.js';

Object.assign(WebGL.prototype, { Camera, Node, Sprite });