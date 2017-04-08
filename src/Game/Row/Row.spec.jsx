import React from "react";
import { shallow } from "enzyme";

import Row from "./Row";

import Item from "../Item/Item";

describe("Row Component", () => {
    const item1 = 1;
    const item2 = 0;

    const testProps = {
        items: [
            item1, item2,
        ],
    };

    it("renders itself", () => {
        const component = shallow(<Row items={testProps.items} />);
        component.node.must.not.equal(null);
        component.unmount();
    });

    it("renders wrapper", () => {
        const component = shallow(<Row items={testProps.items} />);
        component.prop("className").must.equal("row");
        component.unmount();
    });

    it("renders items", () => {
        case1: {
            const component = shallow(<Row items={testProps.items} />);
            const items = component.find(Item);
            items.must.have.length(2);

            items.at(0).props().must.eql({
                type: 1,
            });

            items.at(1).props().must.eql({
                type: 0,
            });

            component.unmount();
        }

        case2: {
            const testItems = [
                item1, item1, item1,
            ];

            const component = shallow(<Row items={testItems} />);
            const items = component.find(Item);
            items.must.have.length(3);

            items.at(0).props().must.eql({
                type: 1,
            });

            items.at(1).props().must.eql({
                type: 1,
            });

            items.at(2).props().must.eql({
                type: 1,
            });

            component.unmount();
        }
    });
});
