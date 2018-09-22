// this.addEventListener("message", () => {
//     // console.log("yeah");
// });

addEventListener("message", (event) => {
    const b = Date.now();
    postMessage("pong");
});
