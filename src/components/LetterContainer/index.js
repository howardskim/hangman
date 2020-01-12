import React, { Component } from 'react'

export default class LetterContainer extends Component {
    handleClick = () => {
       this.props.handleGuessClick(this.props.letter)
    }
    render() {
        return (
            <button disabled={this.props.disabled} onClick={this.handleClick} className="letter-square">
                <div>{this.props.letter}</div>
            </button>
        );
    }
}
