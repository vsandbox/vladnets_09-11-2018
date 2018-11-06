import { NeuralNetwork } from "./NeuralNetwork";

const generateRelations = (length: number) => {
    return new Array(length).fill(1 / length);
};

const generateMatrix = (x: number, y: number) => {
    const matrix: number[][] = new Array(y);
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

let timeoutId: any;
document.addEventListener("click", () => {
    clearTimeout(timeoutId);
    console.log("network", network);
});

window.addEventListener("load", () => {
    const label = document.getElementById("label");
    if (!label) return;

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
    }

    const startTime = Date.now();
    startAutoTick();
});

