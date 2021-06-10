import { events } from '../constants/browser.js';

export const addEventListeners = context => {
    addEventListener(events.contextCreationError, console.log);
    addEventListener(events.contextLost, console.log);
    addEventListener(events.contextRestored, context.restore);
};

export const removeEventListeners = context => {
    removeEventListener(events.contextCreationError, console.log);
    removeEventListener(events.contextLost, console.log);
    removeEventListener(events.contextRestored, context.restore);
};