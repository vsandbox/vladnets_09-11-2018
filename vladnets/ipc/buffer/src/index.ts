let length = 200000;
let itemByteLength = 4;
let byteLength = itemByteLength * length;
let buffer = new ArrayBuffer(byteLength);
let view = new DataView(buffer);

console.log("\n\n");

for (let i = 0; i < length; i++) {
    view.setUint32(i * itemByteLength, Math.floor(Math.random() * 2000));
}

let typedArr = new Uint32Array(buffer);
console.time("fill typed");
let arr2 = Array.from(typedArr);
console.timeEnd("fill typed");
