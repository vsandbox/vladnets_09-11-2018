export interface IMemoryValue {
    readonly parent: IMemoryValue | null;

    readonly buffer: SharedArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;

    isLocked: () => boolean;
    unlock: () => any;
    lock: () => any;
}
