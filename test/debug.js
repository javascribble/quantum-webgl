import '/node_modules/@javascribble/quantum/source/main.js';
import '/source/plugins/loading.js';
import '/source/main.js';

const webgl = document.querySelector('quantum-webgl');
const source = document.querySelector('img');

webgl.addEventListener('resize', event => {
    console.log(event);
    webgl.drawImage({
        source,
        sx: 0,
        sy: 0,
        sw: source.width,
        sh: source.height,
        dx: 100,
        dy: 100,
        dw: source.width,
        dh: source.height
    });
});

document.body.style.visibility = 'visible';