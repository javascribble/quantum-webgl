import { applyConfigurations } from '../context/configuration.js';
import { applyExtensions } from '../context/extensions.js';
import { restoreHandles } from '../context/handles.js';
import { events } from '../constants/browser.js';

const restore = event => {
    const context = event.target.context;
    applyConfigurations(context);
    applyExtensions(context);
    restoreHandles(context);
};

export const addEventListeners = () => {
    addEventListener(events.contextCreationError, console.log);
    addEventListener(events.contextLost, console.log);
    addEventListener(events.contextRestored, restore);
};

export const removeEventListeners = () => {
    removeEventListener(events.contextCreationError, console.log);
    removeEventListener(events.contextLost, console.log);
    removeEventListener(events.contextRestored, restore);
};