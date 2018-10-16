import { TTypedArray, TTypedArrayConstructor } from "./interfaces/TTypedArray";

const SyncArrayConstructor: TTypedArrayConstructor = Uint8Array;

export interface IMemoryNodeOptions {
    parent: MemoryNode;
    children: MemoryNode[];
}

export enum EMemoryNodeBufferState { unset = 0, set = 1 };

export class MemoryNode<T = null> {
    public readonly parent: MemoryNode;
    public readonly children: MemoryNode[];
    public readonly byteLength: number;

    protected buffer: SharedArrayBuffer;
    protected bufferByteOffset: number;
    protected bufferState: EMemoryNodeBufferState;

    constructor(options: IMemoryNodeOptions) {
        this.parent = options.parent;
        this.children = options.children;
        this.byteLength = this.computeByteLength();
        this.bufferState = EMemoryNodeBufferState.unset;
    }

    public setBuffer(buffer: SharedArrayBuffer, byteOffset: number = 0) {
        this.buffer = buffer;
        this.bufferByteOffset = byteOffset;

        let lastByteOffset = byteOffset + this.byteLength;
        this.children.forEach(child => {
            child.setBuffer(buffer, lastByteOffset);
            lastByteOffset += child.byteLength;
        });
        this.bufferState = EMemoryNodeBufferState.set;
    }

    public computeByteLength(): number {
        const syncByteLength = SyncArrayConstructor.BYTES_PER_ELEMENT;
        const childrenByteLength = this.children.reduce((byteSize, child) => child.byteLength, 0);
        return syncByteLength + childrenByteLength;
    }
}
