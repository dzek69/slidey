let handler;

const attachHandlers = (callbacks = {}) => {
    if (handler){
        throw new Error("Trying to attach handlers twice.");
    }

    const methods = {
        ArrowLeft: callbacks.left,
        ArrowRight: callbacks.right,
        ArrowUp: callbacks.up,
        ArrowDown: callbacks.down,
    };

    handler = (event) => {
        event.preventDefault();

        const callback = methods[event.key];
        callback && callback();
    };

    window.addEventListener("keydown", handler);
};

const deattachHandlers = () => {
    window.removeEventListener("keydown", handler);
    handler = null;
};

export { attachHandlers, deattachHandlers };
