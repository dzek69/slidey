import React from "react";
import { shallow } from "enzyme";

import Game from "./Game";

import Row from "./Row/Row";
import Player from "./Player/Player";
import Win from "./Win/Win";

import maps from "../../test/data/maps";

const testMap = maps[1].map;

describe("Game Component", () => {
    const testProps = {
        map: testMap,
        start: maps[1].start,
        targetMoves: 15,
    };

    it("renders itself", () => {
        const component = shallow(<Game {... testProps} />);
        component.node.must.not.equal(null);
        component.unmount();
    });

    it("renders rows", () => {
        const component = shallow(<Game {... testProps} />);
        const rows = component.find(Row);
        rows.must.have.length(5);

        for (let i = 0; i < 4; i++) {
            const row = rows.at(i);
            const props = row.props();
            props.must.have.keys(["items"]);
            props.items.must.equal(testMap[i]);
        }

        component.unmount();
    });

    it("renders Player", () => {
        const component = shallow(<Game {... testProps} />);
        const player = component.find(Player);
        player.must.have.length(1);

        const props = player.props();
        props.must.have.keys([
            "startPosition", "onNewPosition", "map",
        ]);

        props.startPosition.must.equal(testProps.start);
        props.onNewPosition.must.be.a.function();
        props.map.must.equal(testMap);

        component.unmount();
    });

    it("renders moves taken", () => {
        let moves;
        const component = shallow(<Game {... testProps} />);
        moves = component.find("p");
        moves.text().must.equal("moves: 0 / 15");

        const player = component.find(Player);
        const updatePosition = player.prop("onNewPosition");

        updatePosition(1, 1);
        moves = component.find("p");
        moves.text().must.equal("moves: 1 / 15");

        updatePosition(2, 2);
        updatePosition(1, 1);
        moves = component.find("p");
        moves.text().must.equal("moves: 3 / 15");

        component.unmount();
    });

    it("renders Win only after winning", () => {
        const component = shallow(<Game {... testProps} />);

        beforeWin: {
            const win = component.find(Win);
            win.must.have.length(0);
        }

        const player = component.find(Player);
        const updatePosition = player.prop("onNewPosition");

        updatePosition(4, 4);

        afterWin: {
            const win = component.find(Win);
            win.must.have.length(1);
        }

        component.unmount();
    });

    it("doesn't render Player after winning", () => {
        let player;
        const component = shallow(<Game {... testProps} />);

        player = component.find(Player);
        const updatePosition = player.prop("onNewPosition");

        updatePosition(4, 4);

        player = component.find(Player);
        player.must.have.length(0);

        component.unmount();
    });
});
