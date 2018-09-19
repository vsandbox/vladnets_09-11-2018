import { EValueType } from "../types/EValueType";
import { IEnv } from "../types/IEnv";

export const converters: { [typeId: string]: (buffer: ArrayBuffer, env: IEnv) => any } = {
    [EValueType.struct]: (buffer: ArrayBuffer, env: IEnv) => {
        const structTypeId = new DataView(buffer).getInt16(1);
        const structureType = env.structureTypes[structTypeId];

        if (!structureType)
            throw new Error(`Attempt to convert bytes to not existed structure, structureTypeId: ${structTypeId}`);

    },

    [EValueType.array]: (buffer: ArrayBuffer) => {

    },

    [EValueType.int8]: (buffer: ArrayBuffer) => new DataView(buffer).getInt8(0),
    [EValueType.int16]: (buffer: ArrayBuffer) => new DataView(buffer).getInt16(0),
    [EValueType.int32]: (buffer: ArrayBuffer) => new DataView(buffer).getInt32(0),

    [EValueType.float32]: (buffer: ArrayBuffer) => new DataView(buffer).getFloat32(0),
    [EValueType.float64]: (buffer: ArrayBuffer) => new DataView(buffer).getFloat64(0),

    [EValueType.uint8]: (buffer: ArrayBuffer) => new DataView(buffer).getUint8(0),
    [EValueType.uint16]: (buffer: ArrayBuffer) => new DataView(buffer).getUint16(0),
    [EValueType.uint32]: (buffer: ArrayBuffer) => new DataView(buffer).getUint32(0),

    [EValueType.uint8c]: (buffer: ArrayBuffer) => new Uint8ClampedArray(buffer)[0],
};
