import React from "react";
import { shallow } from "enzyme";

import Item from "./Item";

import TYPES from "./Item.const";

describe("Item Component", () => {
    it("renders itself", () => {
        const component = shallow(<Item />);
        component.node.must.not.be.null();
        component.unmount();
    });

    it("renders with proper class", () => {
        case1: {
            const component = shallow(<Item type={TYPES.ITEM_SOLID} />);
            component.prop("className").must.equal("item item--solid");
            component.unmount();
        }

        case2: {
            const component = shallow(<Item type={TYPES.ITEM_EMPTY} />);
            component.prop("className").must.equal("item item--empty");
            component.unmount();
        }
    });
});
