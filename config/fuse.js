const { FuseBox, BabelPlugin, SassPlugin, CSSPlugin } = require("fuse-box");

let fuse = new FuseBox({
    homeDir: "src/",
    sourcemaps: true,
    outFile: "./dist/out.js",
    plugins: [
        BabelPlugin(),
        [SassPlugin(), CSSPlugin()],
    ]
});

fuse.devServer("> index.jsx");
