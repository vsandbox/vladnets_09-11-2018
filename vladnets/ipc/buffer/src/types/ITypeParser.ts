import { IEnvironment } from "./IEnvironment";

export interface IParserResult<T = any> {
    value: T;
}

export type TParserFn<T = any> = (env: IEnvironment, buffer: ArrayBuffer, view: DataView) => IParserResult<T>;

export interface ITypeParser<T = any> {
    parse: TParserFn<T>;
}
