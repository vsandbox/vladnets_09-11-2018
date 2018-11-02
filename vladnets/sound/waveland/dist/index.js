(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.waveland = factory());
}(this, (function () { 'use strict';

    var index = null;
    // document.addEventListener("click", () => {});
    const fillBuffer = (frequency, sampleRate, length, buffer) => {
        console.log("cyclesPerSecond", length / frequency);
    };
    const ctx = new AudioContext({ sampleRate: 48000 });
    const buffer = ctx.createBuffer(2, ctx.sampleRate, ctx.sampleRate);
    fillBuffer(440, ctx.sampleRate, ctx.sampleRate / 2, buffer);

    return index;

})));
