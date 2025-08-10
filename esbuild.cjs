const { build } = require('esbuild');

build({
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: 'node',
    entryPoints: ['src/index.js'],
    outfile: 'dist/index.js',
    target: 'node16',
}).catch(() => process.exit(1));
