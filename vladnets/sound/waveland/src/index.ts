export default null;

class Wave {
    public isPlaying = false;
    private oscillator: OscillatorNode | null = null;
    private ctx:AudioContext;
    private frequency: number;

    constructor(ctx: AudioContext, frequency: number) {
        this.ctx = ctx;
        this.frequency = frequency;
    }

    public start() {
        const oscillator = this.ctx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = this.frequency;
        oscillator.connect(this.ctx.destination);

        this.oscillator = oscillator;

        this.isPlaying = true;
        oscillator.start();
    }

    public stop() {
        if (this.oscillator) this.oscillator.stop();
        this.oscillator = null;
        this.isPlaying = false;
    }

    public toggle() {
        if (this.isPlaying) this.stop();
        else this.start();
    }

}
// document.addEventListener("click", () => {});

const fillBuffer = (frequency: number, sampleRate: number, length: number, buffer: AudioBuffer) => {
    const cyclesPerSecond = sampleRate / frequency;

    console.log("cyclesPerSecond", length / frequency);
    for (let i = 0; i < frequency; i++) {
        const startIndex = i * frequency;
        for (let j = 0; j < cyclesPerSecond; j++) {

        }
    }
}

const ctx = new AudioContext({ sampleRate: 48000 });
const buffer = ctx.createBuffer(2, ctx.sampleRate, ctx.sampleRate);

fillBuffer(440, ctx.sampleRate, ctx.sampleRate / 2, buffer);
