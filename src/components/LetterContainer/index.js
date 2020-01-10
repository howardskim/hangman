import React, { Component } from 'react'

export default class LetterContainer extends Component {
    componentDidMount(){

    }
    render() {
        return (
            <button className="letter-square">
                <div>{this.props.letter}</div>
            </button>
        );
    }
}
