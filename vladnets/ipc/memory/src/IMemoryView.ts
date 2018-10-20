export interface IMemoryViewEnv {
    buffer: SharedArrayBuffer | ArrayBuffer;
    byteOffset: number;
}

export interface IMemoryView<T, U = T> {
    readonly byteLength: number;

    get(env: IMemoryViewEnv): T;
    set(env: IMemoryViewEnv, value: U): void;
}

export interface IMemoryArrayView<T, U = T> extends IMemoryView<T, U> {
    readonly length: number;
    readonly maxLength: number;
    readonly byteLength: number;
    readonly byteLengthPerElement: number;

    get(env: IMemoryViewEnv): T;
    set(env: IMemoryViewEnv, value: U): void;
    getAt(env: IMemoryViewEnv, index: number): T | undefined;
    setAt(env: IMemoryViewEnv, index: number, value: U): T | undefined;
}
