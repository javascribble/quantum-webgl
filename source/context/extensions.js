import { extensionOptions } from '../constants/context.js';

export const applyExtensions = context => {
    for (const extensionOption of extensionOptions) {
        const vendorName = extensionOption.substring(0, extensionOption.indexOf('_'));
        const extension = context.getExtension(extensionOption);
        for (const member in extension) {
            const isConstant = member.includes('_');
            const propertyName = member.substring(0, member.indexOf(vendorName) - (isConstant ? 1 : 0));
            context[propertyName] = isConstant ? extension[member] : extension[member].bind(extension);
        }
    }
};