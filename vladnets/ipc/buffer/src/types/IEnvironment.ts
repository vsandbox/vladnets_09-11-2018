import { hash } from "./hash";

export interface IEnvironment {
    // type id to byteLength map
    typeByteLengthMap: hash<number>;
}
