import { TTypedArrayConstructor } from "./interfaces/TTypedArray";

export interface IMemoryNodeEnv {
    readonly threadId: number;
}

export interface IMemoryNodeOptions {
    env: IMemoryNodeEnv;
    parent?: AMemoryNode;
    children?: AMemoryNode[];
}

export enum EMemoryNodeBufferState { unset = 0, set = 1 };
export enum EMemoryNodeLockState { unlocked = 0, locked = 1 };

export interface IMemoryNodeLockInfo {
    readonly state: EMemoryNodeLockState;
    readonly threadId: number;
}

export abstract class AMemoryNode<T = null> {
    public readonly env: IMemoryNodeEnv;
    public readonly parent: AMemoryNode | null;
    public readonly children: AMemoryNode[];
    public readonly byteLength: number;

    protected buffer: SharedArrayBuffer;
    protected bufferByteOffset: number;
    protected bufferState: EMemoryNodeBufferState;

    constructor(options: IMemoryNodeOptions) {
        this.env = options.env;
        this.parent = options.parent || null;
        this.children = options.children || [];
        this.byteLength = this.computeByteLength();
        this.bufferState = EMemoryNodeBufferState.unset;
    }

    public abstract getValue(): T;
    public abstract setValue(value: T): any;
    public abstract getLock(): IMemoryNodeLockInfo;
    public abstract setLock(state: EMemoryNodeLockState, threadId?: number): any;

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
        // const syncByteLength = SyncArrayConstructor.BYTES_PER_ELEMENT;
        const childrenByteLength = this.children.reduce((byteSize, child) => byteSize + child.byteLength, 0);
        return childrenByteLength;
        // return syncByteLength + childrenByteLength;
    }
}
