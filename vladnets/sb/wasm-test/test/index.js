// const Module = require("../dist/test.js");
// const jsTest = require("./test");

// const _originalOnRuntimeInitialized = Module.onRuntimeInitialized;

// Module.onRuntimeInitialized = function() {

//     // console.time("wasm");
//     // const a = Module._sayHello(2, 3);
//     // console.timeEnd("wasm");

//     // console.time("native");
//     // const b = jsTest(2, 3);
//     // console.timeEnd("native");

//     // console.log(typeof a);

//     // const arrayDataToPass = [0,0,0,0,0];
//     // const typedArray = new Uint8Array(arrayDataToPass.length)
//     // for (let i=0; i<arrayDataToPass.length; i++) {
//     //     typedArray[i] = arrayDataToPass[i]
//     // }
//     // buffer = Module._malloc(typedArray.length * typedArray.BYTES_PER_ELEMENT);
//     // const result = Module._addNums(typedArray, typedArray.length);
//     // console.log("result:", result);

//     const buffer = Buffer.from("Fuck you biaaaaatch!");
//     // const uint8Array = encoder.encode("Fuck you, biaaaaatch");
//     const result = Module._addNums(buffer, buffer.length);

//     console.log("result", result);

//     return _originalOnRuntimeInitialized ? _originalOnRuntimeInitialized.call(Module, ...arguments) : null;

// }


