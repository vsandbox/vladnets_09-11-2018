import { StructNode } from "./memoryNodes/StructNode";


const buffer = new SharedArrayBuffer(512);
const struct = new StructNode({
}, buffer, 0);

