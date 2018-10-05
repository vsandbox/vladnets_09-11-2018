import { IMap } from "./types";

export interface IMemoryNode {
    readonly buffer: ArrayBuffer;
    readonly byteOffset: number;
    readonly byteLength: number;
}

export interface IStructReflection {
    [key: string]: any;
}

enum EStructSyncFlag { unlocked, locked }

export class Struct implements IMemoryNode {
    public readonly buffer: ArrayBuffer;
    public readonly byteOffset: number;
    public readonly byteLength: number;

    private syncBuffer: ArrayBuffer;
    private syncFlags: Uint8Array;
    private keyToFlagIndexMap: IMap<number>;

    public constructor(structReflection: IStructReflection, buffer: ArrayBuffer, byteOffset: number) {
        this.buffer = buffer;
        this.byteOffset = byteOffset;

        const syncBufferByteLength = this.computeSyncBufferByteLength(structReflection);
        this.syncBuffer = buffer.slice(byteOffset, syncBufferByteLength);
        this.syncFlags = new Uint8Array(this.syncBuffer);
        this.keyToFlagIndexMap = this.mapKeysToFlagIndexes(structReflection);

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

        Atomics.add(this.syncFlags, flagIndex, EStructSyncFlag.locked);
    }

    public unlock(key: string) {
        const flagIndex = this.keyToFlagIndexMap[key];
        if (typeof flagIndex !== "number") return;

        Atomics.add(this.syncFlags, flagIndex, EStructSyncFlag.unlocked);
    }

    private computeSyncBufferByteLength(structReflection: IStructReflection) {
        return Object.keys(structReflection).length * Uint8Array.BYTES_PER_ELEMENT;
    }

    private mapKeysToFlagIndexes(structReflection: IStructReflection) {
        return Object
            .keys(structReflection)
            .reduce<IMap<number>>((acc, key, index) => {
                acc[key] = index;
                return acc;
            }, {});
    }
}