import { canvasOptions } from '../constants/canvas.js';
import { applyConfigurations } from './configuration.js';
import { applyExtensions } from './extensions.js';
import { applyHandles } from './handles.js';

export const initialize = canvas => {
    const context = canvas.getContext('webgl2', canvasOptions) || canvas.getContext('webgl', canvasOptions);
    applyConfigurations(context);
    applyExtensions(context);
    applyHandles(context);
    return context;
}