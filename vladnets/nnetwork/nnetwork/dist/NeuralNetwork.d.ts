export interface INeuralNetworkOptions {
    inputLayerLength: number;
    hiddenLayerLength: number;
    outputLayerLength: number;
    inputMatrix: number[][];
    hiddenMatrix: number[][];
    inputAndHiddenValues: IOrderedArray<number>;
    outputValues: IOrderedArray<number>;
}
export interface IOrderedArray<T> {
    [key: number]: T;
}
export declare class NeuralNetwork {
    private inputLayerLength;
    private hiddenLayerLength;
    private outputLayerLength;
    private inputMatrix;
    private hiddenMatrix;
    private neuronTransmissionsCache;
    private inputAndHiddenValues;
    private outputValues;
    private outputValueSummary;
    constructor(options: INeuralNetworkOptions);
    tick(): boolean;
    setNeuronValue(neuronIndex: number, neuronValue: number): void;
    setNeuronValues(neuronValues: number[], offset: number): void;
    accNeuronValue(neuronIndex: number, neuronValue: number): void;
    private getRelations;
}
