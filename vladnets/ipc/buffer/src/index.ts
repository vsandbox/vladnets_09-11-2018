const length = 2000000;
const byteLength = 2 * length;
const buffer = new ArrayBuffer(byteLength);
const arr = new Uint16Array(buffer);
const view = new DataView(buffer);

let items = [];
for (let i = 0; i < length; i++) {
    items[i] = Math.floor(Math.random() * 100);
}
arr.set([22, 32]);

console.log("\n\n\n");

function typedArr() {
    // buffer.slice(14);

    console.time("getFromArr");
    const a = arr[0];
    console.timeEnd("getFromArr");

    console.time("parse array from typed array");
    const a2 = Array.from(arr);
    console.timeEnd("parse array from typed array");
}

function viewArr() {
    // console.time("parse array by slice");
    // let carr0 = [];
    // for (let i = 0; i < length; i++) {
    //     carr0[i] = new DataView(buffer.slice(i * 2)).getUint16(0);
    // }
    // console.timeEnd("parse array by slice");

    console.time("parse array from cached view");
    let carr2 = [];
    for (let i = 0; i < length; i++) {
        carr2[i] = view.getUint16(i * 2);
    }
    console.timeEnd("parse array from cached view");

    // console.time("parse array from view");
    // let carr1 = [];
    // for (let i = 0; i < length; i++) {
    //     carr1[i] = new DataView(buffer).getUint16(i * 2);
    // }
    // console.timeEnd("parse array from view");
}

// typedArr();
viewArr();

// console.time("getFromView");
// const b = new DataView(buffer).getUint16(0);
// console.timeEnd("getFromView");

// console.time("getFromViewCached");
// const c = view.getUint16(2);
// console.timeEnd("getFromViewCached");

// console.time("parse array by slice");
// let carr0 = [];
// for (let i = 0; i < length; i++) {
//     carr0[i] = new DataView(buffer.slice(i * 2)).getUint16(0);
// }
// console.timeEnd("parse array by slice");

// console.time("parse array from cached view");
// let carr2 = [];
// for (let i = 0; i < length; i++) {
//     carr2[i] = view.getUint16(i * 2);
// }
// console.timeEnd("parse array from cached view");

// console.time("parse array from view");
// let carr1 = [];
// for (let i = 0; i < length; i++) {
//     carr1[i] = new DataView(buffer).getUint16(i * 2);
// }
// console.timeEnd("parse array from view");

// import { BufferParser } from "./BufferParser";
// import { IEnvironment } from "./types/IEnvironment";
// import { EValueType } from "./types/EValueType";
// import { IValueParserResult } from "./types/IValueParser";
// import { valueParsers } from "./BufferParser/valueParsers";


// const env: IEnvironment = {
//     typeByteLengthMap: {
//         [EValueType.int8]: 1,
//         [EValueType.int16]: 2,
//         [EValueType.int32]: 4,

//         [EValueType.float32]: 4,
//         [EValueType.float64]: 8,

//         [EValueType.uint8]: 1,
//         [EValueType.uint16]: 2,
//         [EValueType.uint32]: 4,

//         [EValueType.uint8c]: 1,
//     }
// };

// const bp = new BufferParser(env, valueParsers);

// const buffer = new ArrayBuffer(562000);

// const length = 1000;
// const view = new DataView(buffer);
// view.setUint8(0, EValueType.array); // array type
// view.setUint8(0 + 1, EValueType.uint16); // value type is uint 16
// view.setUint16(0 + 1 + 1, length); // length
// view.setUint32(5, env.typeByteLengthMap[EValueType.uint16]);

// let start = 9;
// for (let i = 0; i < length; i++) {
//     view.setUint16(start + (2 * i), Math.floor(Math.random() * 100));
// }

// // view.setUint16(11, 4);

// console.time("parse");
// const value = bp.parse(buffer);
// console.timeEnd("parse");

// // const a = new Uint16Array();
// // console.log("parse result", a.length, value);
// // console.dir(value);

// console.time("iterate");
// let arr = new Array(length);
// const varr = value;
// for (let i = 0; i < varr.length; i++) {
//     let b = i * varr[i];
//     arr[i] = varr[i];
// }
// console.timeEnd("iterate");

