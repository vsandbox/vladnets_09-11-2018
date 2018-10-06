import { IMemoryNode } from "./StructNode";
import { IMemoryValueType, IMap } from "../types";

enum EArrayNodeSyncFlag { unlocked = 0, locked = 1 }

export class ArrayNode implements IMemoryNode {

    public readonly buffer: SharedArrayBuffer;
    public readonly byteOffset: number;
    public readonly byteLength: number;

    public readonly valueType: IMemoryValueType;
    public readonly length: number;

    private syncBuffer: SharedArrayBuffer;
    private syncFlags: Uint8Array;

    constructor(length: number, valueType: IMemoryValueType, buffer: SharedArrayBuffer, byteOffset: number = 0) {
        this.buffer = buffer;
        this.byteOffset = byteOffset;

        this.valueType = valueType;
        this.length = length;

        const syncBufferByteLength = Uint8Array.BYTES_PER_ELEMENT * length;
        this.syncBuffer = buffer.slice(byteOffset, syncBufferByteLength);
        this.syncFlags = new Uint8Array(this.syncBuffer);

        this.byteLength = this.syncBuffer.byteLength * (valueType.byteLength * length);
    }

    public isLocked(index: number): boolean {
        return Atomics.load(this.syncFlags, index) === EArrayNodeSyncFlag.locked;
    }

    public lock(index: number) {
        Atomics.store(this.syncFlags, index, EArrayNodeSyncFlag.locked);
    }

    public unlock(index: number) {
        Atomics.store(this.syncFlags, index, EArrayNodeSyncFlag.unlocked);
    }

}
