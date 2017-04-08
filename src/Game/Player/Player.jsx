import React, { Component } from "react";
import autobind from "react-autobind";

import TYPES, { classNames } from "../Item/Item.const";

import Controller from "./Controller";

export default class Player extends Component {
    constructor(props, context) {
        super(props, context);
        autobind(this);

        this.state = {
            positionX: props.startPosition[0],
            positionY: props.startPosition[1],
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.startPosition === this.props.startPosition) {
            return;
        }

        this.setState({
            positionX: newProps.startPosition[0],
            positionY: newProps.startPosition[1],
        });
    }

    handleNewPosition(x, y) {
        this.setState({
            positionX: x,
            positionY: y,
        });

        this.props.onNewPosition(x, y);
    }

    render() {
        const props = this.props;
        const state = this.state;

        const mapYCount = props.map.length;
        const mapXCount = props.map[0].length;
        const className = "item " + classNames[TYPES.ITEM_PLAYER];

        const topPercentage = state.positionY / mapYCount;
        const leftPercentage = state.positionX / mapXCount;

        const style = {
            top: (topPercentage * 100) + "%",
            left: (leftPercentage * 100) + "%",
        };

        return (
            <div className={className} style={style}>
                <Controller
                    {... state}
                    map={this.props.map}
                    onNewPosition={this.handleNewPosition}
                />
            </div>
        );
    }
}
