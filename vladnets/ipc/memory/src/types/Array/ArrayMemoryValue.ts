import { MemoryValue, IMemoryValueOptions } from "src/MemoryValue";
import { ISchema } from "src/ISchema";

export interface IArrayMemoryValueOptions extends IMemoryValueOptions {
    valueSchema: ISchema;
    maxLength: number;
    length?: number;
}

export class ArrayMemoryValue extends MemoryValue {

    public length: number;

    public readonly valueSchema: ISchema;
    public readonly maxLength: number;

    private values: MemoryValue[];

    constructor(options: IArrayMemoryValueOptions) {
        super(options);

        this.valueSchema = options.valueSchema;
        this.length = typeof options.length === "number"  ? options.length : 0;
        this.maxLength = options.maxLength;
    }

    public at(index: number): MemoryValue | undefined {
        return this.values[index];
    }

    public setAt(index: number, value: any) {
        const byteOffset = (index * this.valueSchema.byteLength) + /* 1 byte for syncArray */ Uint8Array.BYTES_PER_ELEMENT;
        const newValue = this.valueSchema.create(this.buffer, byteOffset, value);
        this.values[index] = newValue;
        this.length = Math.max(this.length, index + 1);
    }

    public set(values: any[]) {
        this.values = new Array(values.length);
        this.length = values.length;
        values.forEach((value, index) => this.setAt(index, value));
    }

    public get() {

    }

}
