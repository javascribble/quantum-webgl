export const curryDrawArrays = (context, mode) => (offset, count) => context.drawArrays(mode, offset, count);

export const curryDrawElements = (context, mode, type) => (offset, count) => context.drawElements(mode, count, type, offset);

export const curryDrawArraysInstanced = (context, mode) => (offset, count, instances) => context.drawArraysInstanced(mode, offset, count, instances);

export const curryDrawElementsInstanced = (context, mode, type) => (offset, count, instances) => context.drawElementsInstanced(mode, count, type, offset, instances);