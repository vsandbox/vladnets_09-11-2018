addEventListener("message", (event: any) => {
    // const initView = new Uint8Array(message.data);
    // console.log("from worker", event);

    (postMessage as any)("message");

    // setInterval(() => {
    //     initView.set([1, 1]);
    // }, 320);
});
