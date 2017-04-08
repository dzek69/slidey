import React, { Component } from "react";
import autobind from "react-autobind";

import Row from "./Row/Row";
import Player from "./Player/Player";
import Win from "./Win/Win";

import TYPES from "./Item/Item.const";

export default class Game extends Component {
    constructor(props, context) {
        super(props, context);
        autobind(this);

        this.state = {
            win: false,
            moves: 0,
        }
    }

    handleNewPosition(x, y) {
        this.setState({
            moves: this.state.moves + 1,
        });

        if (this.props.map[y][x] !== TYPES.ITEM_EXIT) {
            return;
        }

        this.setState({
            win: true,
        })
    }

    render() {
        const props = this.props;

        const rows = props.map.map((row, index) => {
            return <Row items={row} key={index} />;
        });

        const win = this.state.win ? <Win /> : null;
        const player = this.state.win ? null : (
            <Player
                startPosition={props.start}
                onNewPosition={this.handleNewPosition}
                map={props.map}
            />
        ) ;

        return (
            <div>
                <p>moves: {this.state.moves} / {this.props.targetMoves}</p>
                <div className="game">
                    {win}
                    {rows}
                    {player}
                </div>
            </div>
        );
    }
}
