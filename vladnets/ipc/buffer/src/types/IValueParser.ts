import { IEnvironment } from "./IEnvironment";
import { BufferParser } from "../BufferParser";

export interface IValueParserResult<T = any> {
    value: T;
}

export type TValueParserFn<T = any> = (bufferParser: BufferParser, buffer: ArrayBuffer) => T;

export interface IValueParser<T = any> {
    parse: TValueParserFn<T>;
}
