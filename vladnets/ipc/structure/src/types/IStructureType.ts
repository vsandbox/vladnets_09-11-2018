import { EValueType } from "./EValueType";

export interface IStructureType {
    getLength: () => number;
    members: {
        [memberName: string]: {
            start: number;
            end: number;
            valueType: EValueType;
        };
    };
}
