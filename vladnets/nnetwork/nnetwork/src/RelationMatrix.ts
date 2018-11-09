export interface IRelationMatrixOptions {
    inputNeuronsLength: number;
    hiddenNeuronsLength: number;
    outputNeuronsLength: number;
    inputNeuronRelations: number[][];
    hiddenNeuronRelations: number[][];
}

export class RelationMatrix {
    public readonly inputNeuronsLength: number;
    public readonly hiddenNeuronsLength: number;
    public readonly outputNeuronsLength: number;
    public readonly inputAndHiddenNeuronsLength: number;

    private inputNeuronRelations: number[][];
    private hiddenNeuronRelations: number[][];

    public constructor(options: IRelationMatrixOptions) {
        this.inputNeuronsLength = options.inputNeuronsLength;
        this.hiddenNeuronsLength = options.hiddenNeuronsLength;
        this.outputNeuronsLength = options.outputNeuronsLength;
        this.inputAndHiddenNeuronsLength = this.inputNeuronsLength + this.hiddenNeuronsLength;

        this.inputNeuronRelations = new Array(this.inputNeuronsLength);
        this.hiddenNeuronRelations = new Array(this.hiddenNeuronsLength);

        for (let i = 0; i < this.inputNeuronRelations.length; i++) {
            this.inputNeuronRelations[i] = new Array(this.hiddenNeuronsLength).fill(0);
        }

        for (let i = 0; i < this.hiddenNeuronRelations.length; i++) {
            this.hiddenNeuronRelations[i] = new Array(this.hiddenNeuronsLength + this.outputNeuronsLength).fill(0);
        }

        options.inputNeuronRelations.forEach((neuronRelations, neuronIndex) => {
            neuronRelations.forEach((relation, targetNeuronIndex) => {
                this.inputNeuronRelations[neuronIndex][targetNeuronIndex] = relation;
            });
        });

        options.hiddenNeuronRelations.forEach((neuronRelations, neuronIndex) => {
            neuronRelations.forEach((relation, targetNeuronIndex) => {
                this.hiddenNeuronRelations[neuronIndex][targetNeuronIndex] = relation;
            });
        });
    }

    public getNeuronRelations(neuronIndex: number): number[] {
        // if is output neuron
        if (neuronIndex >= this.inputAndHiddenNeuronsLength) return [];

        // if is hidden neuron
        if (neuronIndex >= this.inputNeuronsLength) {
            return this.hiddenNeuronRelations[neuronIndex - this.inputNeuronsLength];
        }

        // if is input neuron
        return this.inputNeuronRelations[neuronIndex];
    }

    public setNeuronRelation(sourceNeuronIndex: number, targetNeuronIndex: number, relation: number) {
        // if is output neuron
        if (sourceNeuronIndex >= this.inputAndHiddenNeuronsLength) return;

        let relativeSourceNeuronIndex;
        let relations: number[][];

        // if is hidden neuron
        if (sourceNeuronIndex >= this.inputNeuronsLength) {
            relativeSourceNeuronIndex = sourceNeuronIndex - this.inputNeuronsLength;
            relations = this.hiddenNeuronRelations;
        }
        else {
            relativeSourceNeuronIndex = sourceNeuronIndex;
            relations = this.inputNeuronRelations;
        }

        const neuronRelations = relations[relativeSourceNeuronIndex];
        const lastRelation = neuronRelations[targetNeuronIndex - this.inputNeuronsLength];
        const diff = relation - lastRelation;
        const addition = diff / (neuronRelations.length - 1);

        neuronRelations.forEach((relation, index) => {
            if (index + this.inputNeuronsLength === sourceNeuronIndex) return;
            // neuronRelations[index] += addition;
        });
    }

}
