import { bufferData } from '../handles/buffers.js';
import { bufferTexture } from '../handles/textures.js';

export const buffer = (context, program, buffers, textures) => {
    for (const uniform of program.uniforms) {
        if (uniform.changed) {
            program[uniform.name](uniform.value);
            uniform.changed = false;
        }
    }

    for (const buffer of buffers) {
        if (buffer.changed) {
            bufferData(buffer, context);
            buffer.changed = false;
        }
    }

    for (const texture of textures) {
        if (texture.changed) {
            bufferTexture(texture, context);
            texture.changed = false;
        }
    }
};