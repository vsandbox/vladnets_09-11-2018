const syncValueTypes = [
    {
        name: "lock",
        byteLength: Uint32Array.BYTES_PER_ELEMENT,
    },
    {
        name: "byteOffset",
        byteLength: Uint32Array.BYTES_PER_ELEMENT,
    },
    {
        name: "byteLength",
        byteLength: Uint32Array.BYTES_PER_ELEMENT,
    },
    {
        name: "chunkLeft",
        byteLength: Uint32Array.BYTES_PER_ELEMENT,
    }
]

const syncValueByteLength = syncValueTypes.reduce((acc, value) => {
    return acc + value.byteLength;
}, 0);

enum ELockStatus { unlocked = 0, locked = 1 }

class BufferStream {
    private valueBuffer: SharedArrayBuffer;
    private syncBuffer: SharedArrayBuffer;
    private length: number;

    constructor(valueBuffer: SharedArrayBuffer, syncBuffer: SharedArrayBuffer) {
        this.valueBuffer = valueBuffer;
        this.syncBuffer = syncBuffer;
        this.length = Math.floor(syncBuffer.byteLength / syncValueByteLength);
    }

    public update() {
        const syncValues = this.readSyncBuffer();
    }

    private readSyncBuffer() {
        const sortedValues: { [key: number]: any }  = {};
        const length = this.length;
        let byteOffset;
        let valuesArrayView;
        let isLocked;
        let syncValue;

        for (let i = 0; i < length; i++) {
            byteOffset = i * syncValueByteLength;
            valuesArrayView = new Uint32Array(this.syncBuffer, byteOffset, syncValueTypes.length);
            isLocked = Atomics.load(valuesArrayView, 0) === ELockStatus.locked;

            if (isLocked) continue;

            syncValue = {
                byteOffset: valuesArrayView[1],
                byteLength: valuesArrayView[2],
                chunkLeft: valuesArrayView[3],
            };

            sortedValues[i] = syncValue;
        }

        return sortedValues;
    }

    private processSyncValues() {

    }
}

const syncBufferLength = 10000;
const syncBuffer = new SharedArrayBuffer(syncValueByteLength * syncBufferLength);
const bufferStream = new BufferStream(new SharedArrayBuffer(2014), syncBuffer);

const syncBufferTypeArray = new Uint32Array(syncBuffer);

for (let i = 0; i < syncBufferLength; i ++) {
    const syncBufferIndexOffset = i * syncValueTypes.length;
    syncBufferTypeArray[syncBufferIndexOffset + 0] = Math.floor(Math.random() * 1);
    syncBufferTypeArray[syncBufferIndexOffset + 1] = Math.floor(Math.random() * 2048);
    syncBufferTypeArray[syncBufferIndexOffset + 2] = Math.floor(Math.random() * 2048);
    syncBufferTypeArray[syncBufferIndexOffset + 3] = Math.floor(Math.random() * 2);
}

console.time("buffer update");
bufferStream.update();
console.timeEnd("buffer update");

console.time("buffer update");
bufferStream.update();
console.timeEnd("buffer update");

export default null;
