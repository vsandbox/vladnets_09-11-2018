import { hash } from "../types/hash";
import { IEnvironment } from "../types/IEnvironment";
import { IValueParser } from "../types/IValueParser";
import { EValueType } from "../types/EValueType";
export declare class BufferParser {
    env: IEnvironment;
    valueParsers: hash<IValueParser>;
    constructor(env: IEnvironment, valueParsers?: hash<IValueParser>);
    parse(buffer: ArrayBuffer, valueType?: EValueType): any;
    getValueParser(valueType: EValueType): IValueParser<any>;
    setValueParser<T = any>(valueType: EValueType, valueParser: IValueParser<T>): void;
    setValueParsers(valueParsers: hash<IValueParser>): void;
}
