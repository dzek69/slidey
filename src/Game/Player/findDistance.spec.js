import { left, right, down, up } from "./findDistance";

import maps from "../../../test/data/maps";

const testMap = maps[0].map;

describe("findDistance", () => {
    describe("left", () => {
        it("returns correct values", () => {
            left(testMap, 3, 1).must.equal(2);
            left(testMap, 3, 2).must.equal(1);
            left(testMap, 4, 3).must.equal(0);
        });

        it("returns 0 when out of bounds position", () => {
            left(testMap, 20, 20).must.equal(0);
            left(testMap, -20, -20).must.equal(0);
        });

        it("returns 0 when there is no wall to stop", () => {
            left(testMap, 2, 4).must.equal(0);
        });
    });

    describe("right", () => {
        it("returns correct values", () => {
            right(testMap, 3, 2).must.equal(1);
            right(testMap, 4, 3).must.equal(0);
            right(testMap, 1, 4).must.equal(3);
        });

        it("returns 0 when out of bounds position", () => {
            right(testMap, 20, 20).must.equal(0);
            right(testMap, -20, -20).must.equal(0);
        });

        it("returns 0 when there is no wall to stop", () => {
            right(testMap, 2, 1).must.equal(0);
        });
    });

    describe("up", () => {
        it("returns correct values", () => {
            up(testMap, 3, 2).must.equal(1);
            up(testMap, 4, 3).must.equal(2);
            up(testMap, 4, 1).must.equal(0);
        });

        it("returns 0 when out of bounds position", () => {
            up(testMap, 20, 20).must.equal(0);
            up(testMap, -20, -20).must.equal(0);
        });

        it("returns 0 when there is no wall to stop", () => {
            up(testMap, 2, 1).must.equal(0);
        });
    });

    describe("down", () => {
        it("returns correct values", () => {
            down(testMap, 3, 2).must.equal(0);
            down(testMap, 3, 1).must.equal(1);
            down(testMap, 4, 1).must.equal(3);
        });

        it("returns 0 when out of bounds position", () => {
            down(testMap, 20, 20).must.equal(0);
            down(testMap, -20, -20).must.equal(0);
        });

        it("returns 0 when there is no wall to stop", () => {
            down(testMap, 2, 1).must.equal(0);
        });
    });
});
