import React from "react";

import { classNames } from "./Item.const";

/**
 * Item component
 *
 * @param {Object} props - component props
 * @returns {React.Component} - rendered component
 */
export default function Item(props) {
    const className = "item " + classNames[props.type];
    return (
        <div className={className} />
    );
}
