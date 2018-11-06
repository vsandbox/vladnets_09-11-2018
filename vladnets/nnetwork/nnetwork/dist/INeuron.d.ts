import { IEnvironment } from "./IEnvironment";
export interface INeuron {
    canConnectionBeAdded(sourceNeuronIndex: number, targetNeuronIndex: number, env: IEnvironment): boolean;
}
