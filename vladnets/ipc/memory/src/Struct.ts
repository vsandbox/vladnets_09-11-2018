import { IMemoryArrayView } from "./IMemoryView";

export interface IStructMemberProps {

}

export class StructMember {

    private indexes = [0, 1, 2, 4, 6];
    private arrayView: IMemoryArrayView<any>;
    private arrayViewEnv: {
        buffer: SharedArrayBuffer;
        byteOffset: number;
    };

    public update(values: any[]) {
        values.forEach((value, index) => this.arrayView.setAt(this.arrayViewEnv, index, value));
    }
    public render() {
        return this.indexes.map(index => this.arrayView.getAt(this.arrayViewEnv, index));
    }

}