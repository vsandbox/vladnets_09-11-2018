import { IConnection } from "./NeuralNetwork";
export declare class ConnectionManager {
    connections: IConnection[];
    private connectionsById;
    private weightsByConnectionId;
    constructor(connections: IConnection[]);
    setConnection(connection: IConnection): void;
}
