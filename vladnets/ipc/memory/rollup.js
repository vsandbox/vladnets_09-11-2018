const rollup = require("rollup");
const typescriptPlugin = require("rollup-plugin-typescript2");

rollup
    .rollup({
        input: "src/index.ts",
        plugins: [
            typescriptPlugin(),
        ]
    })
    .then(function (bundle) {
        bundle.write({
            file: "dist/bundle.js",
            format: "umd"
        });
    })
    .catch(err => {
        console.error("[Rollup ERROR] Error occured during compile", err);
    });