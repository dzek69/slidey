import React from "react";
import { shallow, mount } from "enzyme";

import Controller from "./Controller";

import createSpy from "../../../test/utils/spy";

describe("Controller Component", () => {
    const testMap = [];
    const newPositionSpy = createSpy();

    const attachHandlersMock = createSpy();
    const deattachHandlersMock = createSpy();

    const testProps = {
        map: testMap,
        positionX: 10,
        positionY: 20,
        onNewPosition: newPositionSpy,
    };

    beforeEach(() => {
        newPositionSpy.__spy.reset();
        attachHandlersMock.__spy.reset();
        deattachHandlersMock.__spy.reset();
    });

    before(() => {
        Controller.__Rewire__("attachHandlers", attachHandlersMock);
        Controller.__Rewire__("deattachHandlers", deattachHandlersMock);
    });

    after(() => {
        Controller.__ResetDependency__("attachHandlers");
        Controller.__ResetDependency__("deattachHandlers");
    });

    describe("renders", () => {
        it("nothing", () => {
            const component = shallow(<Controller {... testProps} />);
            (component.node === null).must.be.true();
            component.unmount();
        });
    });

    describe("on lifecycle", () => {
        it("mount attaches key press handlers", () => {
            attachHandlersMock.__spy.calls.must.have.length(0);

            const component = mount(<Controller {... testProps} />);
            attachHandlersMock.__spy.calls.must.have.length(1);

            const callArguments = attachHandlersMock.__spy.calls[0];
            callArguments.must.have.length(1);
            callArguments[0].must.have.keys([
                "up", "down", "left", "right",
            ]);

            component.unmount();
            attachHandlersMock.__spy.calls.must.have.length(1);
        });

        it("unmount deattaches key press handlers", () => {
            deattachHandlersMock.__spy.calls.must.have.length(0);

            const component = mount(<Controller {... testProps} />);
            deattachHandlersMock.__spy.calls.must.have.length(0);

            component.unmount();
            deattachHandlersMock.__spy.calls.must.have.length(1);
        });
    });

    describe("left handler", () => {
        let nextReturn = 2;

        const findLeftDistanceMock = createSpy(() => {
            return nextReturn;
        });

        before(() => {
            Controller.__Rewire__("findLeftDistance", findLeftDistanceMock);
        });

        after(() => {
            Controller.__ResetDependency__("findLeftDistance");
        });

        it("finds distance and notifies on new position", () => {
            const component = mount(<Controller {... testProps} />);
            const leftHandler = attachHandlersMock.__spy.calls[0][0].left;

            findLeftDistanceMock.__spy.calls.must.have.length(0);
            newPositionSpy.__spy.calls.must.have.length(0);

            leftHandler();
            findLeftDistanceMock.__spy.calls.must.have.length(1);

            const call = findLeftDistanceMock.__spy.calls[0];
            call.must.have.length(3);
            call[0].must.equal(testMap);
            call[1].must.equal(10);
            call[2].must.equal(20);

            newPositionSpy.__spy.calls.must.have.length(1);
            newPositionSpy.__spy.calls[0].must.eql([
               8, 20,
            ]);

            newPositionSpy.__spy.reset();

            nextReturn = 3;
            leftHandler();

            newPositionSpy.__spy.calls[0].must.eql([
                7, 20,
            ]);

            component.unmount();
        });

        it("doesn't notify if distance is zero", () => {
            nextReturn = 0;

            const component = mount(<Controller {... testProps} />);
            const leftHandler = attachHandlersMock.__spy.calls[0][0].left;

            newPositionSpy.__spy.calls.must.have.length(0);

            leftHandler();

            newPositionSpy.__spy.calls.must.have.length(0);

            nextReturn = 1;
            leftHandler();

            newPositionSpy.__spy.calls.must.have.length(1);

            component.unmount();
        });
    });

    describe("right handler", () => {
        let nextReturn = 2;

        const findRightDistanceMock = createSpy(() => {
            return nextReturn;
        });

        before(() => {
            Controller.__Rewire__("findRightDistance", findRightDistanceMock);
        });

        after(() => {
            Controller.__ResetDependency__("findRightDistance");
        });

        it("finds distance and notifies on new position", () => {
            const component = mount(<Controller {... testProps} />);
            const rightHandler = attachHandlersMock.__spy.calls[0][0].right;

            findRightDistanceMock.__spy.calls.must.have.length(0);
            newPositionSpy.__spy.calls.must.have.length(0);

            rightHandler();
            findRightDistanceMock.__spy.calls.must.have.length(1);

            const call = findRightDistanceMock.__spy.calls[0];
            call.must.have.length(3);
            call[0].must.equal(testMap);
            call[1].must.equal(10);
            call[2].must.equal(20);

            newPositionSpy.__spy.calls.must.have.length(1);
            newPositionSpy.__spy.calls[0].must.eql([
               12, 20,
            ]);

            newPositionSpy.__spy.reset();

            nextReturn = 3;
            rightHandler();

            newPositionSpy.__spy.calls[0].must.eql([
                13, 20,
            ]);

            component.unmount();
        });

        it("doesn't notify if distance is zero", () => {
            nextReturn = 0;

            const component = mount(<Controller {... testProps} />);
            const rightHandler = attachHandlersMock.__spy.calls[0][0].right;

            newPositionSpy.__spy.calls.must.have.length(0);

            rightHandler();

            newPositionSpy.__spy.calls.must.have.length(0);

            nextReturn = 1;
            rightHandler();

            newPositionSpy.__spy.calls.must.have.length(1);

            component.unmount();
        });
    });

    describe("up handler", () => {
        let nextReturn = 2;

        const findUpDistanceMock = createSpy(() => {
            return nextReturn;
        });

        before(() => {
            Controller.__Rewire__("findUpDistance", findUpDistanceMock);
        });

        after(() => {
            Controller.__ResetDependency__("findUpDistance");
        });

        it("finds distance and notifies on new position", () => {
            const component = mount(<Controller {... testProps} />);
            const upHandler = attachHandlersMock.__spy.calls[0][0].up;

            findUpDistanceMock.__spy.calls.must.have.length(0);
            newPositionSpy.__spy.calls.must.have.length(0);

            upHandler();
            findUpDistanceMock.__spy.calls.must.have.length(1);

            const call = findUpDistanceMock.__spy.calls[0];
            call.must.have.length(3);
            call[0].must.equal(testMap);
            call[1].must.equal(10);
            call[2].must.equal(20);

            newPositionSpy.__spy.calls.must.have.length(1);
            newPositionSpy.__spy.calls[0].must.eql([
               10, 18,
            ]);

            newPositionSpy.__spy.reset();

            nextReturn = 3;
            upHandler();

            newPositionSpy.__spy.calls[0].must.eql([
                10, 17,
            ]);

            component.unmount();
        });

        it("doesn't notify if distance is zero", () => {
            nextReturn = 0;

            const component = mount(<Controller {... testProps} />);
            const upHandler = attachHandlersMock.__spy.calls[0][0].up;

            newPositionSpy.__spy.calls.must.have.length(0);

            upHandler();

            newPositionSpy.__spy.calls.must.have.length(0);

            nextReturn = 1;
            upHandler();

            newPositionSpy.__spy.calls.must.have.length(1);

            component.unmount();
        });
    });

    describe("down handler", () => {
        let nextReturn = 2;

        const findDownDistanceMock = createSpy(() => {
            return nextReturn;
        });

        before(() => {
            Controller.__Rewire__("findDownDistance", findDownDistanceMock);
        });

        after(() => {
            Controller.__ResetDependency__("findDownDistance");
        });

        it("finds distance and notifies on new position", () => {
            const component = mount(<Controller {... testProps} />);
            const downHandler = attachHandlersMock.__spy.calls[0][0].down;

            findDownDistanceMock.__spy.calls.must.have.length(0);
            newPositionSpy.__spy.calls.must.have.length(0);

            downHandler();
            findDownDistanceMock.__spy.calls.must.have.length(1);

            const call = findDownDistanceMock.__spy.calls[0];
            call.must.have.length(3);
            call[0].must.equal(testMap);
            call[1].must.equal(10);
            call[2].must.equal(20);

            newPositionSpy.__spy.calls.must.have.length(1);
            newPositionSpy.__spy.calls[0].must.eql([
               10, 22,
            ]);

            newPositionSpy.__spy.reset();

            nextReturn = 3;
            downHandler();

            newPositionSpy.__spy.calls[0].must.eql([
                10, 23,
            ]);

            component.unmount();
        });

        it("doesn't notify if distance is zero", () => {
            nextReturn = 0;

            const component = mount(<Controller {... testProps} />);
            const downHandler = attachHandlersMock.__spy.calls[0][0].down;

            newPositionSpy.__spy.calls.must.have.length(0);

            downHandler();

            newPositionSpy.__spy.calls.must.have.length(0);

            nextReturn = 1;
            downHandler();

            newPositionSpy.__spy.calls.must.have.length(1);

            component.unmount();
        });
    });
});
