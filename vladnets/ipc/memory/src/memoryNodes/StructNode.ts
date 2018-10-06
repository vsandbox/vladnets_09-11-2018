import { IMap } from "../types";

export interface IMemoryNode {
    readonly buffer: SharedArrayBuffer;
    readonly byteOffset: number;
    readonly byteLength: number;
}

export interface IStructReflection {
    [key: string]: IMemoryNode;
}

enum EStructSyncFlag { unlocked = 0, locked = 1 }

export class StructNode implements IMemoryNode {
    public readonly buffer: SharedArrayBuffer;
    public readonly byteOffset: number;
    public readonly byteLength: number;

    private syncBuffer: SharedArrayBuffer;
    private syncFlags: Uint8Array;
    private keyToFlagIndexMap: IMap<number>;

    public constructor(structReflection: IStructReflection, buffer: SharedArrayBuffer, byteOffset: number = 0) {
        this.buffer = buffer;
        this.byteOffset = byteOffset;

        const syncBufferByteLength = this.computeSyncBufferByteLength(structReflection);
        this.syncBuffer = buffer.slice(byteOffset, syncBufferByteLength);
        this.syncFlags = new Uint8Array(this.syncBuffer);
        this.keyToFlagIndexMap = this.makeKeyToFlagIndexMap(structReflection);

        this.byteLength = this.syncBuffer.byteLength;
    }

    public isLocked(key: string): boolean {
        const flagIndex = this.keyToFlagIndexMap[key];
        if (typeof flagIndex !== "number") return false;

        return Atomics.load(this.syncFlags, flagIndex) === EStructSyncFlag.locked;
    }

    public lock(key: string) {
        const flagIndex = this.keyToFlagIndexMap[key];
        if (typeof flagIndex !== "number") return;

        Atomics.store(this.syncFlags, flagIndex, EStructSyncFlag.locked);
    }

    public unlock(key: string) {
        const flagIndex = this.keyToFlagIndexMap[key];
        if (typeof flagIndex !== "number") return;

        Atomics.store(this.syncFlags, flagIndex, EStructSyncFlag.unlocked);
    }

    private computeSyncBufferByteLength(structReflection: IStructReflection) {
        return Object.keys(structReflection).length * Uint8Array.BYTES_PER_ELEMENT;
    }

    private makeKeyToFlagIndexMap(structReflection: IStructReflection) {
        return Object
            .keys(structReflection)
            .reduce<IMap<number>>((acc, key, index) => {
                acc[key] = index;
                return acc;
            }, {});
    }
}
