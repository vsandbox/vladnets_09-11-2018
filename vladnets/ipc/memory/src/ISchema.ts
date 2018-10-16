import { MemoryValue } from "./MemoryValue";

export interface ISchema {
    readonly byteLength: number;
    create: (buffer: SharedArrayBuffer, byteOffset: number, initialValue?: any) => MemoryValue;
}
