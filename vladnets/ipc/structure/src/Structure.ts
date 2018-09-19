import { IStructureType } from "./types/IStructureType";
import { readBuffer } from "./readBuffer";
import { converters } from "./converters";
import { IEnv } from "./types/IEnv";

export class Structure {

    private env: IEnv;
    private type: IStructureType;
    private buffer: ArrayBuffer;

    constructor(env: IEnv, type: IStructureType, buffer: ArrayBuffer) {
        this.env = env;
        this.type = type;
        this.buffer = buffer;
    }

    public get(memberName: string) {
        const structureType = this.type;
        let memberDescription: any;

        if (!memberDescription) return;

        const valueType = memberDescription.valueType;
        const converter = converters[valueType];

        if (!converter) new Error(`There is no converters for valueType: ${valueType}`);

        return converter(this.buffer.slice(memberDescription.start, memberDescription.end), this.env);
    }

}
