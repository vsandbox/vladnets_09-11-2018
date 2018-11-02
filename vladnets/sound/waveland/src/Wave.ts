const SAMPLE_RATE = 48100;
const LENGTH_BYTE_LENGTH = Uint16Array.BYTES_PER_ELEMENT;

export class Wave {

    private samples: Uint16Array;

    constructor() {
        this.samples = new Uint16Array(SAMPLE_RATE + LENGTH_BYTE_LENGTH);
        this.samples[0] = 0;
    }

    public getByMs(ms: number) {

    }

    public getTimeLength() {
        return this.samples[0];
    }

}
