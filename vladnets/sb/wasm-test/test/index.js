const Module = require("../dist/test.js");
const jsTest = require("./test");

const _originalOnRuntimeInitialized = Module.onRuntimeInitialized;

Module.onRuntimeInitialized = function() {

    console.time("wasm");
    const a = Module._sayHello(2, 3);
    console.timeEnd("wasm");

    console.time("native");
    const b = jsTest(2, 3);
    console.timeEnd("native");

    console.log(typeof a);

    return _originalOnRuntimeInitialized ? _originalOnRuntimeInitialized.call(Module, ...arguments) : null;

}
