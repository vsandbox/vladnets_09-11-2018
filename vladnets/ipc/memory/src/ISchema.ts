export interface ISchema<T = any> {
    readonly byteLength: number;
    create: (buffer: SharedArrayBuffer) => T;
}
