import { EValueTypeId } from "./EValueTypeId";
import { IValueType } from "./IValueType";

export class Environemnt {

    valueTypes: { [valueTypeId: number]: IValueType } = {
        [EValueTypeId.null]: {
            id: EValueTypeId.null,
            byteLength: 0,
        },

        [EValueTypeId.array]: {
            id: EValueTypeId.array,
            byteLength: 0,
        },
        [EValueTypeId.struct]: {
            id: EValueTypeId.struct,
            byteLength: 0,
        },

        [EValueTypeId.int8]: {
            id: EValueTypeId.int8,
            byteLength: 1,
        },
        [EValueTypeId.uint8]: {
            id: EValueTypeId.uint8,
            byteLength: 1,
        },
        [EValueTypeId.uint8c]: {
            id: EValueTypeId.uint8c,
            byteLength: 1,
        },

        [EValueTypeId.int16]: {
            id: EValueTypeId.int16,
            byteLength: 2,
        },
        [EValueTypeId.uint16]: {
            id: EValueTypeId.int16,
            byteLength: 2,
        },

        [EValueTypeId.int32]: {
            id: EValueTypeId.int32,
            byteLength: 4,
        },
        [EValueTypeId.uint32]: {
            id: EValueTypeId.uint32,
            byteLength: 4,
        },
        [EValueTypeId.float32]: {
            id: EValueTypeId.float32,
            byteLength: 4,
        },

        [EValueTypeId.float64]: {
            id: EValueTypeId.float64,
            byteLength: 8,
        },
    };

}
