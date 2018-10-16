export enum EMemoryValueLockState { unlocked = 0, locked = 1 };

export interface IMemoryValueOptions {
    parent: MemoryValue | null;
    buffer: SharedArrayBuffer;
    byteOffset: number;
    byteLength: number;
    isLocked?: boolean;
    children?: MemoryValue[];
}

export class MemoryValue {
    readonly parent: MemoryValue | null;
    readonly children: MemoryValue[];

    readonly buffer: SharedArrayBuffer;
    readonly byteOffset: number;
    readonly byteLength: number;

    protected syncArray: Uint8Array;

    constructor(options: IMemoryValueOptions) {
        this.parent = options.parent;
        this.children = options.children || [];

        this.buffer = options.buffer;
        this.byteOffset = options.byteOffset;
        this.byteLength = options.byteLength;

        this.syncArray = new Uint8Array(options.buffer, this.byteOffset, 1);
        this.syncArray[0] = options.isLocked ? EMemoryValueLockState.locked : EMemoryValueLockState.unlocked;
    }

    public isLocked(): boolean {
        const isParentLocked = this.parent ? this.parent.isLocked() : false;
        if (isParentLocked) return true;

        const localLockState = Atomics.load(this.syncArray, 0);
        return localLockState === EMemoryValueLockState.locked;
    }

    public lock(): boolean {
        const previousValue = Atomics.exchange(this.syncArray, 0, EMemoryValueLockState.locked);
        return previousValue != EMemoryValueLockState.locked;
    }
    public unlock(): boolean {
        const previousValue = Atomics.exchange(this.syncArray, 0, EMemoryValueLockState.unlocked);
        return previousValue != EMemoryValueLockState.unlocked;
    }
}