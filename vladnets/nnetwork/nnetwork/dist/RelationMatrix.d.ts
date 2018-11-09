export interface IRelationMatrixOptions {
    inputNeuronsLength: number;
    hiddenNeuronsLength: number;
    outputNeuronsLength: number;
    inputNeuronRelations: number[][];
    hiddenNeuronRelations: number[][];
}
export declare class RelationMatrix {
    readonly inputNeuronsLength: number;
    readonly hiddenNeuronsLength: number;
    readonly outputNeuronsLength: number;
    readonly inputAndHiddenNeuronsLength: number;
    private inputNeuronRelations;
    private hiddenNeuronRelations;
    constructor(options: IRelationMatrixOptions);
    getNeuronRelations(neuronIndex: number): number[];
    setNeuronRelation(sourceNeuronIndex: number, targetNeuronIndex: number, relation: number): void;
}
