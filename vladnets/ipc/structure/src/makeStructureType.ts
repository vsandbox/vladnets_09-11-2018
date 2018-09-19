import { IEnv } from "./types/IEnv";
import { IStructureType } from "./types/IStructureType";
import { typesByteLength } from "./config/typesByteLength";

export const makeStructureType = (env: IEnv, memberDescriptors: { [memberName: string]: any; }): any => {

    Object
        .keys(memberDescriptors)
        .reduce((acc, memberName) => {
            const memberValueType = memberDescriptors[memberName];
            // const byteLength = typesByteLength[memberValueType];

            return acc;
        }, {});

};
