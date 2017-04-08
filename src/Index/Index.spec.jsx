import React from "react";
import { shallow } from "enzyme";

import Index from "./Index";

import Game from "../Game/Game";

describe("Index Component", () => {
    it("renders itself", () => {
        const component = shallow(<Index />);
        component.node.must.not.equal(null);
        component.unmount();
    });

    it("renders title", () => {
        const component = shallow(<Index />);
        const header = component.find("h1");
        header.must.have.length(1);
        header.text().must.equal("Slidey - the game");
        component.unmount();
    });

    it("renders game", () => {
        const component = shallow(<Index />);
        const game = component.find(Game);

        game.must.have.length(1);

        const props = game.props();
        props.must.have.keys(["map", "start", "targetMoves"]);

        const { map, start, targetMoves } = props;

        map.must.be.an.array();

        start.must.be.an.array();
        start.must.have.length(2);

        targetMoves.must.be.a.number();

        component.unmount();
    });
});
