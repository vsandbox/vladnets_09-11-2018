import { EValueType } from "../types/EValueType";

export const typesByteLength = {
    [EValueType.int8]: 1,
    [EValueType.int16]: 2,
    [EValueType.int32]: 4,

    [EValueType.float32]: 4,
    [EValueType.float64]: 8,

    [EValueType.uint8]: 1,
    [EValueType.uint16]: 2,
    [EValueType.uint32]: 4,

    [EValueType.uint8c]: 1,
};
