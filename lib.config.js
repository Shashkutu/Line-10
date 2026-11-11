export default { publicDir: false, build: { outDir: 'dist-lib', minify: true, lib: { entry: 'src/line10/line10.js', formats: ['es'], fileName: () => 'line10-player.js' }, cssCodeSplit: false } };
