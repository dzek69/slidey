import React, { Component } from "react";
import autobind from "react-autobind";

import { attachHandlers, deattachHandlers } from "../keyboard/keyboard";
import {
    left as findLeftDistance,
    right as findRightDistance,
    down as findDownDistance,
    up as findUpDistance,
} from "./findDistance";

export default class Controller extends Component {
    constructor(props, context) {
        super(props, context);
        autobind(this);
    }

    componentDidMount() {
        attachHandlers({
            left: this.handleLeft,
            right: this.handleRight,
            up: this.handleUp,
            down: this.handleDown,
        });
    }

    componentWillUnmount() {
        deattachHandlers();
    }

    handleLeft() {
        const distance = findLeftDistance(this.props.map, this.props.positionX, this.props.positionY);

        distance && this.props.onNewPosition(
            this.props.positionX - distance,
            this.props.positionY,
        );
    }

    handleRight() {
        const distance = findRightDistance(this.props.map, this.props.positionX, this.props.positionY);

        distance && this.props.onNewPosition(
            this.props.positionX + distance,
            this.props.positionY,
        );
    }

    handleUp() {
        const distance = findUpDistance(this.props.map, this.props.positionX, this.props.positionY);

        distance && this.props.onNewPosition(
            this.props.positionX,
            this.props.positionY - distance,
        );
    }

    handleDown() {
        const distance = findDownDistance(this.props.map, this.props.positionX, this.props.positionY);

        distance && this.props.onNewPosition(
            this.props.positionX,
            this.props.positionY + distance,
        );
    }

    render() {
        return null;
    }
}
