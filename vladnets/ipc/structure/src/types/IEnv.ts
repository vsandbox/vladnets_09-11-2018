import { IStructureType } from "./IStructureType";

export interface IEnv {
    structureTypes: {
        [structureTypeId: number]: IStructureType;
    };
}
