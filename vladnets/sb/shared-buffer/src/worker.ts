addEventListener("message", (message: any) => {
    const initView = new Uint8Array(message.data);
    console.log("from worker", initView.join("-"));

    setInterval(() => {
        initView.set([1, 1]);
    }, 320);
});
