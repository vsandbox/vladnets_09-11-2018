const length = 50000;
const byteLength = Float64Array.BYTES_PER_ELEMENT;
const buffer = new ArrayBuffer(length * byteLength);

const values = new Array();

for (let index = 0; index < length; index++) {
    values[index] = Math.random();
}

const valuesFloats = new Float64Array(buffer, 0, length);
valuesFloats.set(values);

const startIndex = 2;
const offset = startIndex * byteLength;

console.time("fragmenting");
const view = new DataView(buffer);
for (let i = 0; i < length - startIndex; i++) {
    const localOffset = i * byteLength;
    view.setFloat64(localOffset, view.getFloat64(offset + localOffset));
}
console.timeEnd("fragmenting");

export default null;
