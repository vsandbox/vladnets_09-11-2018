import { EValueType } from "./EValueType";
import { ArrayReader } from "./readers/ArrayReader";

const length = 10000;
const buffer = new ArrayBuffer(Int16Array.BYTES_PER_ELEMENT * length + 8);
const view = new DataView(buffer);

// set value type
view.setUint8(ArrayReader.VALUE_TYPE_BUFFER_OFFSET, EValueType.int16);

// set length
view.setUint16(ArrayReader.LENGTH_BUFFER_OFFSET, length);

// set value
const values = new Array(length);
values.fill(1).map(() => Math.floor(Math.random() * 32767));
const arr = new Int16Array(buffer, ArrayReader.VALUE_BUFFER_OFFSET, length);
arr.set(values);

console.time("create array reader");
const arrReader = new ArrayReader(buffer, 0);
console.timeEnd("create array reader");

console.time("get element from direct reader");
const el3 = arrReader.value[3];
console.timeEnd("get element from direct reader");

console.time("get element from js array");
const el2 = values[3];
console.timeEnd("get element from js array");
