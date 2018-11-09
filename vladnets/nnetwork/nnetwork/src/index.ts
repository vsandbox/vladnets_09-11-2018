import { RelationMatrix } from "./RelationMatrix";

const relationMatrix = new RelationMatrix({
    inputNeuronsLength: 10,
    hiddenNeuronsLength: 10 * 2,
    outputNeuronsLength: 10,
    inputNeuronRelations: [[1]],
    hiddenNeuronRelations: [[1]],
});

relationMatrix.setNeuronRelation(2, 2, 0.5);

console.log("relationMatrix", relationMatrix.getNeuronRelations(2))
