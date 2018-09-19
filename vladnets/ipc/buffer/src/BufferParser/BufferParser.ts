import { IEnvironment } from "../types/IEnvironment";
import { ITypeParser } from "../types/ITypeParser";
import { hash } from "../types/hash";

export class BufferParser {

    private env: IEnvironment;
    private typeParsers: hash<ITypeParser>;

    constructor(env: IEnvironment) {
        this.env = env;
    }

    public parse(buffer: ArrayBuffer) {
        const view = new DataView(buffer)
        const valueType = view.getUint8(0);
        const typeParser = this.typeParsers[valueType];

        if (!typeParser) throw new Error(`BufferParser.parse(buffer): Undefined value type '${valueType}'`);

        typeParser.parse(this.env, buffer, view);
    }

}
