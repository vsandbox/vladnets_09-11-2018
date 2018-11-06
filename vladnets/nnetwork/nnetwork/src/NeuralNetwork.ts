export interface INeuralNetworkOptions {
    inputLayerLength: number;
    hiddenLayerLength: number;
    outputLayerLength: number;
    inputMatrix: number[][];
    hiddenMatrix: number[][];
    inputAndHiddenValues: IOrderedArray<number>;
    outputValues: IOrderedArray<number>;
}

export  interface IOrderedArray<T> {
    [key: number]: T;
}

export class NeuralNetwork {

    private inputLayerLength: number;
    private hiddenLayerLength: number;
    private outputLayerLength: number;
    private inputMatrix: number[][];
    private hiddenMatrix: number[][];
    private neuronTransmissionsCache: IOrderedArray<IOrderedArray<number>>;

    private inputAndHiddenValues: IOrderedArray<number>;
    private outputValues: IOrderedArray<number>;

    private outputValueSummary: number;

    public constructor(options: INeuralNetworkOptions) {
        this.inputLayerLength = options.inputLayerLength;
        this.hiddenLayerLength = options.hiddenLayerLength;
        this.outputLayerLength = options.outputLayerLength;
        this.inputMatrix = options.inputMatrix;
        this.hiddenMatrix = options.hiddenMatrix;
        this.neuronTransmissionsCache = {};

        this.inputAndHiddenValues = options.inputAndHiddenValues;
        this.outputValues = options.outputValues;

        this.outputValueSummary = 0;
    }

    public tick(): boolean {
        const inputAndHiddenValueKeys = Object.keys(this.inputAndHiddenValues);
        const outputOffset = this.inputLayerLength + this.hiddenLayerLength;

        inputAndHiddenValueKeys.forEach(key => {
            const neuronIndex = Number(key);
            const neuronValue = this.inputAndHiddenValues[neuronIndex];
            const relations = this.getRelations(neuronIndex);

            let freeValue = 0;
            relations.forEach((relation, index) => {
                const targetNeuronIndex = index + this.inputLayerLength;
                if (targetNeuronIndex === neuronIndex) return;

                const cache = this.neuronTransmissionsCache[neuronIndex] || (this.neuronTransmissionsCache[neuronIndex] = {});
                const cachedValue = cache[targetNeuronIndex];
                const value = neuronValue * relation;

                const isOutput = targetNeuronIndex >= outputOffset;

                if (isOutput) {
                    const additionalValue = freeValue > 0 ? freeValue / this.outputLayerLength : 0;
                    const finalValue = value + additionalValue;
                    this.outputValueSummary += finalValue;
                    this.accNeuronValue(targetNeuronIndex, finalValue);
                    return;
                }

                if (typeof cachedValue === "number") {
                    freeValue += cachedValue;
                    return;
                }

                this.accNeuronValue(targetNeuronIndex, value);
                cache[targetNeuronIndex] = value;
            });

            delete this.inputAndHiddenValues[neuronIndex];
        });

        const isDone = Object.keys(this.inputAndHiddenValues).length === 0;

        if (isDone) {
            for (let i = 0; i < this.outputLayerLength; i++) {
                const outputValue = this.outputValues[outputOffset + i];
                this.outputValues[outputOffset + i] = outputValue / this.outputValueSummary;
            }
        }

        return isDone;
    }

    public setNeuronValue(neuronIndex: number, neuronValue: number) {
        const isOutput = neuronIndex >= (this.inputLayerLength + this.hiddenLayerLength);
        if (isOutput) this.outputValues[neuronIndex] = neuronValue;
        else this.inputAndHiddenValues[neuronIndex] = neuronValue;
    }

    public setNeuronValues(neuronValues: number[], offset: number) {
        neuronValues.forEach((value, index) => {
            this.setNeuronValue(index + offset, value);
        });
    }

    public accNeuronValue(neuronIndex: number, neuronValue: number) {
        const isOutput = neuronIndex >= (this.inputLayerLength + this.hiddenLayerLength);
        const neuronValues = isOutput ? this.outputValues : this.inputAndHiddenValues;
        const lastNeuronValue = neuronValues[neuronIndex] || 0;
        const newNeuronValue = lastNeuronValue + neuronValue;
        if (newNeuronValue) neuronValues[neuronIndex] = lastNeuronValue + neuronValue;
    }

    private getRelations(neuronIndex: number): number[] {
        const isHidden = neuronIndex >= this.inputLayerLength;
        const matrix = isHidden ? this.hiddenMatrix : this.inputMatrix;
        const matrixRelatedNeuronIndex = isHidden ? neuronIndex - this.inputLayerLength : neuronIndex;
        return matrix[matrixRelatedNeuronIndex];
    }

}
