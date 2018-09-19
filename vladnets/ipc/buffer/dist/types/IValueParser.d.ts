import { BufferParser } from "../BufferParser";
export interface IValueParserResult<T = any> {
    value: T;
}
export declare type TValueParserFn<T = any> = (bufferParser: BufferParser, buffer: ArrayBuffer) => T;
export interface IValueParser<T = any> {
    parse: TValueParserFn<T>;
}
