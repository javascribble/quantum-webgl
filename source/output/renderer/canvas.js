export const canvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%'
};

export const createCanvas = () => {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, canvasStyle);
    return canvas;
};

export const resizeCanvas = (canvas, scale = devicePixelRatio) => {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
};

export const getContext = (canvas) => canvas.getContext('webgl2', canvasOptions) || canvas.getContext('webgl', canvasOptions);