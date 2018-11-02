interface IMemoryView<T> {
    read(buffer: SharedArrayBuffer | ArrayBuffer, byteOffset: number): T;
    write(buffer: SharedArrayBuffer | ArrayBuffer, byteOffset: number, value: T): void;
}

export class ThreadBuffer {
    public readonly byteLength: number;

    constructor(byteLength: number) {
        this.byteLength = byteLength;
    }
}

`[isUsing = 1][byteLength = 12][notifiedThreadCount = 0][memoryViewId = 2][value = 1056]
    1b              2b                  1b                      2b              2b          = 8b
`;

`

[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [...free...]
[isUsing][chunkCount] [...free...]
=>
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [...free...]
=>
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
=>
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[isUsing][chunkCount] [...free...]
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
=>
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[1/2 isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]
[1/2 isUsing][chunkCount] [...free...]
[isUsing][chunkCount] [viewId][..value..] [viewId][..value..] [viewId][..value..]


`
