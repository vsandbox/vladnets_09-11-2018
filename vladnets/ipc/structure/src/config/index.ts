import { typesByteLength } from "./typesByteLength";

export interface IConfig {
    typesByteLength: typeof typesByteLength;
};

export const config: IConfig = {
    typesByteLength,
};

export default config;
