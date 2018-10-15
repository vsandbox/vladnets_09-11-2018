import { ISchema } from "src/ISchema";
import { IMap } from "src/IMap";

export class StructSchema<T = any> implements ISchema<T> {
    public readonly byteLength: number;

    private members: IMap<ISchema>;

    constructor(byteLength: number, members: IMap<ISchema>) {
        this.byteLength = byteLength;
        this.members = members;
    }

    public create(buffer: SharedArrayBuffer) {
        return <T>null;
    }

    public static createSchema<R = any>(members: IMap<ISchema>): StructSchema<R> {
        const keys = Object.keys(members);
        const syncBufferByteLength = keys.length * Uint8Array.BYTES_PER_ELEMENT;
        const valueBufferByteLength = keys.reduce((value, key) => {
            return value + members[key].byteLength;
        }, 0);
        const summaryBufferByteLength = syncBufferByteLength + valueBufferByteLength;

        return new StructSchema(summaryBufferByteLength, members);
    }
}
