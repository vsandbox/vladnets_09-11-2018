import { hash } from "../types/hash";
import { logger } from "../util/logger";
import { IEnvironment } from "../types/IEnvironment";
import { IValueParser } from "../types/IValueParser";
import { EValueType } from "../types/EValueType";

export class BufferParser {

    public env: IEnvironment;
    public valueParsers: hash<IValueParser> = {};

    constructor(env: IEnvironment, valueParsers: hash<IValueParser> = {}) {
        this.env = env;
        this.valueParsers = valueParsers;
    }

    public parse(buffer: ArrayBuffer, valueType?: EValueType): any {
        valueType = valueType || new DataView(buffer).getUint8(0);
        const valueParser = this.valueParsers[valueType];

        if (!valueParser) {
            logger.warn(`BufferParser.parse(buffer): Undefined value type '${valueType}'`);
            return;
        }

        try {
            return valueParser.parse(this, buffer.slice(this.env.typeByteLengthMap[EValueType.uint8]));
        }
        catch (error) {
            logger.warn(`BufferParser.parse ... valueParser.parse: Error occurred during type '${valueType}' parsing`);
            logger.warn(error.stack);
            return;
        }
    }

    public getValueParser(valueType: EValueType) {
        return this.valueParsers[valueType];
    }

    public setValueParser<T = any>(valueType: EValueType, valueParser: IValueParser<T>) {
        this.valueParsers[valueType] = valueParser;
    }

    public setValueParsers(valueParsers: hash<IValueParser>) {
        Object
            .keys(valueParsers)
            .forEach(key => {
                this.setValueParser(key as any, valueParsers[key]);
            });
    }

};
