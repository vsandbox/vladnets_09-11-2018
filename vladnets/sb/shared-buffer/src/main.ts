console.log("fuck you");

const buffer = new SharedArrayBuffer(2);
const worker = new Worker("worker.js");

worker.postMessage(buffer);

const initView = new Uint8Array(buffer);

setInterval(() => {
    console.log("from index", initView.join("-"));
}, 500);

export default null;

