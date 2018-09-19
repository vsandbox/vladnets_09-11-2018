import { converters } from "./converters";
import { EValueType } from "./types/EValueType";

export const readBuffer = (buffer: ArrayBuffer) => {
    const valueType: EValueType = new DataView(buffer, 0, 1).getUint8(0);
    const getter = converters[valueType];

    if (!getter) return null;
    return getter(buffer, {} as any);
}
