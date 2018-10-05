import { IMap } from "./types";

export enum EDefaultMemoryNodeFlag {
    free,
    locked,
}

interface IMemoryNode {
    readonly buffer: ArrayBuffer;
    readonly offset: number;
    readonly byteLength: number;
    readonly children: IMap<IMemoryNode>;
}

class DefaultMemoryNode implements IMemoryNode {
    public readonly buffer: ArrayBuffer;
    public readonly offset: number;
    public readonly byteLength: number;
    public readonly children: IMap<IMemoryNode>;

    private flags: Uint8Array;
    private keyToFlagIndexMap: IMap<number>;

    public constructor(buffer: ArrayBuffer, offset: number, children: IMap<IMemoryNode> = {}) {
        this.buffer = buffer;
        this.offset = offset;
        this.children = children;
        this.byteLength = this.computeByteLength(children);
    }

    public isLocked(key: string): boolean {
        const flagIndex = this.keyToFlagIndexMap[key];

        if (!flagIndex) return false;

        return Atomics.load(this.flags, flagIndex) === EDefaultMemoryNodeFlag.locked;
    }

    public lock(key: string) {
        const flagIndex = this.keyToFlagIndexMap[key];
        Atomics.add(this.flags, flagIndex, EDefaultMemoryNodeFlag.locked);
    }

    public free(key: string) {
        const flagIndex = this.keyToFlagIndexMap[key];
        Atomics.add(this.flags, flagIndex, EDefaultMemoryNodeFlag.free);
    }

    private computeByteLength(children = this.children) {
        const keys = Object.keys(children);

        let byteLength = keys.length * Uint8Array.BYTES_PER_ELEMENT;

        keys.forEach(key => {
            byteLength += children[key].byteLength;
        });
        return byteLength;
    }
}
