// const worker = new Worker("./worker.js");

// worker.addEventListener("message", () => {
//     console.timeEnd("test");
// });
// console.time("test");
// worker.postMessage("hi");

const buffer = new Buffer("So it's quite big string, ok for us, biaaaaaaatch!");

console.log(buffer.byteLength);
