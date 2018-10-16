import { AMemoryNode, EMemoryNodeLockState, IMemoryNodeOptions } from "./AMemoryNode";
import { TTypedArrayConstructor } from "./interfaces/TTypedArray";

const SyncArrayConstructor: TTypedArrayConstructor = Uint8Array;

export class MemoryNode<T = any> extends AMemoryNode<T> {
    protected syncArray: Uint8Array;

    constructor(options: IMemoryNodeOptions) {
        super(options);
    }

    public setBuffer(buffer: SharedArrayBuffer, byteOffset: number = 0) {
        super.setBuffer(buffer, byteOffset);
        this.syncArray = new Uint8Array(buffer, 0, SyncArrayConstructor.BYTES_PER_ELEMENT);
    }

    public getValue(): T {
        return (1 as any) as T;
    }
    public setValue(value: T) {}
    public getLock() {
        return {} as any;
    }
    public setLock(state: EMemoryNodeLockState, threadId = this.env.threadId) {

    }

    public computeByteLength(): number {
        const syncByteLength = SyncArrayConstructor.BYTES_PER_ELEMENT;
        return syncByteLength + super.computeByteLength();
    }
}

