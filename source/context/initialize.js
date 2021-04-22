import { createHandles, restoreHandles } from './handles.js';
import { applyConfigurations } from './configuration.js';
import { applyExtensions } from './extension.js';

export const initializeContext = context => {
    applyConfigurations(context);
    applyExtensions(context);
    createHandles(context);

    // TODO: Pause rendering while context is lost.
    const contextCreationError = () => { };
    const contextLost = () => { }
    const contextRestored = () => {
        applyOptionsAndExtensions(context);
        restoreHandles(context);
    };

    // TODO: Add removeEventListener to disconnectedCallback.
    addEventListener('webglcontextcreationerror', contextCreationError);
    addEventListener('webglcontextlostevent', contextLost);
    addEventListener('webglcontextrestored', contextRestored);
};