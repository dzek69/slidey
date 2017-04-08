import React from "react";
import { shallow } from "enzyme";

import Win from "./Win";

describe("Win Component", () => {
    it("renders itself", () => {
        const component = shallow(<Win />);
        component.node.must.not.equal(null);
        component.unmount();
    });

    it("renders text", () => {
        const component = shallow(<Win />);
        component.text().must.equal("You win!Have a cookie:");
        component.unmount();
    });

    it("renders cookie image", () => {
        const component = shallow(<Win />);
        const cookie = component.find("img");
        cookie.prop("src").must.equal(
            "http://vignette2.wikia.nocookie.net/cookieclicker/images/c/c7/Cookie_Clicker_Mobile_Icon.png/revision/" +
            "latest?cb=20140123210322"
        );
        cookie.prop("alt").must.equal("Cookie");
        component.unmount();
    });
});
