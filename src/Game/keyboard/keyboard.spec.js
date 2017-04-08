import { attachHandlers, deattachHandlers } from "./keyboard";

function simulateKey(key) {
    const eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.key = key;
    window.dispatchEvent(eventObj);
}

describe("Keyboard bindings", () => {
    describe("attachHandlers", () => {
        afterEach(() => {
            deattachHandlers();
        });

        it("calls callback", () => {
            let calledLeft = 0;
            let calledRight = 0;
            let calledUp = 0;
            let calledDown = 0;

            attachHandlers({
                left: () => (calledLeft++),
                right: () => (calledRight++),
                up: () => (calledUp++),
                down: () => (calledDown++),
            });

            calledLeft.must.equal(0);
            calledRight.must.equal(0);
            calledUp.must.equal(0);
            calledDown.must.equal(0);

            simulateKey("ArrowLeft");

            calledLeft.must.equal(1);
            calledRight.must.equal(0);
            calledUp.must.equal(0);
            calledDown.must.equal(0);

            simulateKey("ArrowLeft");

            calledLeft.must.equal(2);
            calledRight.must.equal(0);
            calledUp.must.equal(0);
            calledDown.must.equal(0);

            simulateKey("ArrowRight");

            calledLeft.must.equal(2);
            calledRight.must.equal(1);
            calledUp.must.equal(0);
            calledDown.must.equal(0);

            simulateKey("ArrowDown");

            calledLeft.must.equal(2);
            calledRight.must.equal(1);
            calledUp.must.equal(0);
            calledDown.must.equal(1);

            simulateKey("ArrowUp");

            calledLeft.must.equal(2);
            calledRight.must.equal(1);
            calledUp.must.equal(1);
            calledDown.must.equal(1);
        });

        it("allows to skip some directions", () => {
            let calledUp = 0;

            attachHandlers({
                up: () => (calledUp++),
            });

            simulateKey("ArrowLeft");
            simulateKey("ArrowDown");
            simulateKey("ArrowRight");

            calledUp.must.equal(0);

            simulateKey("ArrowUp");

            calledUp.must.equal(1);
        });

        it("doesn't allow to attach twice", () => {
            attachHandlers();

            const reattach = () => {
                attachHandlers();
            };

            reattach.must.throw(Error, "Trying to attach handlers twice.")
        });
    });

    describe("deattachHandlers", () => {
        it("deattaches event", () => {
            let calledLeft = 0;
            let calledRight = 0;
            let calledUp = 0;
            let calledDown = 0;

            attachHandlers({
                left: () => (calledLeft++),
                right: () => (calledRight++),
                up: () => (calledUp++),
                down: () => (calledDown++),
            });

            calledLeft.must.equal(0);
            calledRight.must.equal(0);
            calledUp.must.equal(0);
            calledDown.must.equal(0);

            simulateKey("ArrowLeft");
            simulateKey("ArrowRight");
            simulateKey("ArrowUp");
            simulateKey("ArrowDown");

            calledLeft.must.equal(1);
            calledRight.must.equal(1);
            calledUp.must.equal(1);
            calledDown.must.equal(1);

            deattachHandlers();

            simulateKey("ArrowLeft");
            simulateKey("ArrowRight");
            simulateKey("ArrowUp");
            simulateKey("ArrowBottom");

            calledLeft.must.equal(1);
            calledRight.must.equal(1);
            calledUp.must.equal(1);
            calledDown.must.equal(1);
        });

        it("does nothing when called multiple times or when not attached", () => {
            const doDeattach = () => { deattachHandlers(); };
            doDeattach.must.not.throw();

            attachHandlers();
            doDeattach.must.not.throw();
            doDeattach.must.not.throw();
        });
    });
});
