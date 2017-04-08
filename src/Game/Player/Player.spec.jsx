import React from "react";
import { shallow } from "enzyme";

import Player from "./Player";

import Controller from "./Controller";

import createSpy from "../../../test/utils/spy";
import maps from "../../../test/data/maps";

const testMap = maps[1].map;

describe("Player Component", () => {
    const testProps = {
        startPosition: [1, 1],
        onNewPosition: createSpy(),
        map: testMap,
    };

    beforeEach(() => {
        testProps.onNewPosition.__spy.reset();
    });

    it("renders itself", () => {
        const component = shallow(<Player {... testProps} />);
        component.node.must.not.equal(null);
        component.unmount();
    });

    it("renders correct className", () => {
        const component = shallow(<Player {... testProps} />);
        component.prop("className").must.equal("item item--player");
        component.unmount();
    });

    it("renders correct styles on init", () => {
        case1: {
            const component = shallow(<Player {... testProps} />);
            component.prop("style").must.eql({
                left: "20%",
                top: "20%",
            });
            component.unmount();
        }

        case2: {
            const props = {
                ... testProps,
                startPosition: [2, 5]
            };

            const component = shallow(<Player {... props} />);
            component.prop("style").must.eql({
                left: "40%",
                top: "100%",
            });
            component.unmount();
        }
    });

    it("renders controller with correct props on init", () => {
        case1: {
            const component = shallow(<Player {... testProps} />);
            const control = component.find(Controller);
            control.must.have.length(1);

            const controlProps = control.props();
            controlProps.must.have.keys([
                "positionX", "positionY", "map", "onNewPosition",
            ]);

            controlProps.positionX.must.equal(1);
            controlProps.positionY.must.equal(1);
            controlProps.map.must.equal(testMap);
            controlProps.onNewPosition.must.be.a.function();

            component.unmount();
        }

        case2: {
            const props = {
                ... testProps,
                startPosition: [2, 5]
            };

            const component = shallow(<Player {... props} />);
            const control = component.find(Controller);
            control.must.have.length(1);

            const controlProps = control.props();
            controlProps.must.have.keys([
                "positionX", "positionY", "map", "onNewPosition",
            ]);

            controlProps.positionX.must.equal(2);
            controlProps.positionY.must.equal(5);
            controlProps.map.must.equal(testMap);
            controlProps.onNewPosition.must.be.a.function();

            component.unmount();
        }
    });

    it("updates position on new position", () => {
        let control;

        const component = shallow(<Player {... testProps} />);
        control = component.find(Controller);
        const update = control.prop("onNewPosition");

        update(5, 4);

        component.prop("style").must.eql({
            left: "100%",
            top: "80%",
        });

        control = component.find(Controller);
        control.prop("positionX").must.equal(5);
        control.prop("positionY").must.equal(4);
    });

    it("notifies on new position", () => {
        const component = shallow(<Player {... testProps} />);
        const control = component.find(Controller);
        const update = control.prop("onNewPosition");

        testProps.onNewPosition.__spy.calls.must.have.length(0);

        update(5, 4);

        testProps.onNewPosition.__spy.calls.must.have.length(1);
        testProps.onNewPosition.__spy.calls[0].must.eql([
            5, 4,
        ]);
    });

    it("resets position when new start position is set", () => {
        let control;

        const component = shallow(<Player {... testProps} />);
        control = component.find(Controller);
        const update = control.prop("onNewPosition");

        update(5, 4);

        control = component.find(Controller);
        control.prop("positionX").must.equal(5);
        control.prop("positionY").must.equal(4);

        component.setProps({
            anyProp: 123,
        });

        control = component.find(Controller);
        control.prop("positionX").must.equal(5);
        control.prop("positionY").must.equal(4);

        component.setProps({
            startPosition: [2, 3],
        });

        control = component.find(Controller);
        control.prop("positionX").must.equal(2);
        control.prop("positionY").must.equal(3);
    });
});
