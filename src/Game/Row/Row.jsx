import React from "react";

import Item from "../Item/Item";

/**
 * Row component
 *
 * @param {Object} props - component props
 * @returns {React.Component} - rendered component
 */
export default function Row(props) {
    const items = props.items.map((item, index) => {
        return <Item type={item} key={index} />
    });

    return (
        <div className="row">
            {items}
        </div>
    );
}
