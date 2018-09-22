import { EValueType } from "../EValueType";
import { TTypedArray, TTypedArrayConstructor } from "../types";

export class ArrayReader {

    public length: number = 0;
    public byteLength: number = 0;
    public valueType: EValueType;

    public buffer: ArrayBuffer | SharedArrayBuffer;
    public bufferOffset: number;

    public value: TTypedArray;

    public static VALUE_TYPE_BUFFER_OFFSET: number = 0;
    public static LENGTH_BUFFER_OFFSET: number = 1;
    public static VALUE_BUFFER_OFFSET: number = 4;
    public static VALUE_CONSTRUCTORS: { [valueType: number]: TTypedArrayConstructor } = {
        [EValueType.int8]: Int8Array,
        [EValueType.int16]: Int16Array,
    };

    constructor(buffer: ArrayBuffer | SharedArrayBuffer, bufferOffset: number = 0) {
        this.buffer = buffer;
        this.bufferOffset = bufferOffset;

        this.readValue();
        this.byteLength = this.computeByteLength(this.valueType, this.length);
    }

    public readValueType(): number {
        return this.valueType = new DataView(this.buffer).getUint8(this.bufferOffset + ArrayReader.VALUE_TYPE_BUFFER_OFFSET);
    }

    public readLength(): number {
        return this.length = new DataView(this.buffer).getUint16(this.bufferOffset + ArrayReader.LENGTH_BUFFER_OFFSET);
    }

    public readValue(valueType = this.readValueType(), length = this.readLength()) {
        const ArrayConstructor = ArrayReader.VALUE_CONSTRUCTORS[valueType];
        return this.value = new ArrayConstructor(this.buffer, this.bufferOffset + ArrayReader.VALUE_BUFFER_OFFSET, length);
    }

    public computeByteLength(valueType = this.readValueType(), length = this.readLength()) {
        const bytesPerElement = ArrayReader.VALUE_CONSTRUCTORS[valueType].BYTES_PER_ELEMENT;
        return ArrayReader.VALUE_BUFFER_OFFSET + (bytesPerElement * length);
    }
}
