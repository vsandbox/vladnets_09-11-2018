interface INode {
    inputValue: number;
    outputNodes: symbol[];
    outputValues: number[];
}

interface INetwork {
    nodes: INode;
}
