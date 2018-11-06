(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    class NeuralNetwork {
        constructor(options) {
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
        tick() {
            const inputAndHiddenValueKeys = Object.keys(this.inputAndHiddenValues);
            const outputOffset = this.inputLayerLength + this.hiddenLayerLength;
            inputAndHiddenValueKeys.forEach(key => {
                const neuronIndex = Number(key);
                const neuronValue = this.inputAndHiddenValues[neuronIndex];
                const relations = this.getRelations(neuronIndex);
                let freeValue = 0;
                relations.forEach((relation, index) => {
                    const targetNeuronIndex = index + this.inputLayerLength;
                    if (targetNeuronIndex === neuronIndex)
                        return;
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
        setNeuronValue(neuronIndex, neuronValue) {
            const isOutput = neuronIndex >= (this.inputLayerLength + this.hiddenLayerLength);
            if (isOutput)
                this.outputValues[neuronIndex] = neuronValue;
            else
                this.inputAndHiddenValues[neuronIndex] = neuronValue;
        }
        setNeuronValues(neuronValues, offset) {
            neuronValues.forEach((value, index) => {
                this.setNeuronValue(index + offset, value);
            });
        }
        accNeuronValue(neuronIndex, neuronValue) {
            const isOutput = neuronIndex >= (this.inputLayerLength + this.hiddenLayerLength);
            const neuronValues = isOutput ? this.outputValues : this.inputAndHiddenValues;
            const lastNeuronValue = neuronValues[neuronIndex] || 0;
            const newNeuronValue = lastNeuronValue + neuronValue;
            if (newNeuronValue)
                neuronValues[neuronIndex] = lastNeuronValue + neuronValue;
        }
        getRelations(neuronIndex) {
            const isHidden = neuronIndex >= this.inputLayerLength;
            const matrix = isHidden ? this.hiddenMatrix : this.inputMatrix;
            const matrixRelatedNeuronIndex = isHidden ? neuronIndex - this.inputLayerLength : neuronIndex;
            return matrix[matrixRelatedNeuronIndex];
        }
    }

    const generateMatrix = (x, y) => {
        const matrix = new Array(y);
        for (let i = 0; i < y; i++) {
            matrix[i] = new Array(x).fill(1 / x);
        }
        return matrix;
    };
    const inputLayerLength = 2400;
    const hiddenLayerLength = inputLayerLength * 3;
    const outputLayerLength = 10;
    const network = new NeuralNetwork({
        inputLayerLength,
        hiddenLayerLength,
        outputLayerLength,
        inputMatrix: generateMatrix(hiddenLayerLength, inputLayerLength),
        hiddenMatrix: generateMatrix(hiddenLayerLength + outputLayerLength, hiddenLayerLength),
        inputAndHiddenValues: {},
        outputValues: {},
    });
    let timeoutId;
    document.addEventListener("click", () => {
        clearTimeout(timeoutId);
        console.log("network", network);
    });
    window.addEventListener("load", () => {
        const label = document.getElementById("label");
        if (!label)
            return;
        network.setNeuronValues(new Array(inputLayerLength).fill(1), 0);
        // (window as any).network = network;
        const startAutoTick = () => {
            const result = network.tick();
            const currentTime = Date.now();
            if (!result) {
                // label.innerHTML = `Time elapsed: ${(currentTime - startTime) / 1000} seconds`;
                timeoutId = setTimeout(startAutoTick, 0);
            }
            else {
                label.innerHTML = `Done. Time elapsed: ${(currentTime - startTime) / 1000} seconds. Input length: ${inputLayerLength}, hidden length: ${hiddenLayerLength}, output length: ${outputLayerLength}`;
            }
        };
        const startTime = Date.now();
        startAutoTick();
    });

})));
