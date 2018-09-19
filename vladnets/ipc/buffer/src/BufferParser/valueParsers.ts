import { EValueType } from "../types/EValueType";
import { hash } from "../types/hash";
import { IValueParser } from "../types/IValueParser";
import { logger } from "../util/logger";

const VALUE_TYPE_TYPE = EValueType.uint8;
const ARRAY_LENGTH_TYPE = EValueType.uint16;
const ARRA_ITEM_BYTE_LENGTH_TYPE = EValueType.uint32;

const VALUE_TYPE_GETTER_NAME = "getUint8";
const ARRAY_LENGTH_GETTER_NAME = "getUint16";
const ARRAY_ITEM_BYTE_LENGTH_GETTER_NAME = "getUint32";

export const valueParsers: { [valueType: number]: IValueParser } = {
    [EValueType.array]: {
        parse: (bp, buffer) => {
            const view = new DataView(buffer);

            let offset = 0;

            const valueType = view[VALUE_TYPE_GETTER_NAME](offset);
            offset += bp.env.typeByteLengthMap[VALUE_TYPE_TYPE]; // offset 1

            const length = view[ARRAY_LENGTH_GETTER_NAME](offset);
            offset += bp.env.typeByteLengthMap[ARRAY_LENGTH_TYPE]; // offset 3
            offset += 1; // skip 4th byte as in C# (just for fun, sure thing)

            const itemByteLength = view[ARRAY_ITEM_BYTE_LENGTH_GETTER_NAME](offset);
            offset += bp.env.typeByteLengthMap[ARRA_ITEM_BYTE_LENGTH_TYPE]; // offset 8

            // let resultArray = new Uint16Array(buffer, offset, length);
            let resultArray = [];
            const valueParser = bp.valueParsers[valueType];

            for (let i = 0; i < length; i++) {
                const result = valueParser.parse(bp, buffer.slice(offset));
                resultArray[i] = result.value;
                offset += itemByteLength;
            }

            return resultArray;
        }
    },

    [EValueType.int8]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getInt8(0),
            };
        }
    },
    [EValueType.int16]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getInt16(0),
            };
        }
    },
    [EValueType.int32]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getInt32(0),
            };
        }
    },

    [EValueType.float32]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getFloat32(0),
            };
        }
    },
    [EValueType.float64]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getFloat64(0),
            };
        }
    },

    [EValueType.uint8]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getUint8(0),
            };
        }
    },
    [EValueType.uint16]: {
        parse: (bp, buffer) => {
            return new DataView(buffer).getUint16(0);
        }
    },
    [EValueType.uint32]: {
        parse: (bp, buffer) => {
            return {
                value: new DataView(buffer).getUint32(0),
            };
        }
    },

    [EValueType.uint8c]: {
        parse: (bp, buffer) => {
            return {
                value: new Uint8ClampedArray(buffer)[0],
            };
        }
    },
};
