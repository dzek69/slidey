const createSpy = function(realFunction) {
    const spy = function(... args) {
        spy.__spy.calls.push(args);
        if (typeof realFunction === "function") {
            return realFunction(... args);
        }
    };
    spy.__spy = {
        calls: [],
        reset() {
            this.calls.length = 0;
        }
    };
    return spy;
};

export default createSpy;
