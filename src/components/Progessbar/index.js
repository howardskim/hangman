import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default class Progessbar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let { attempts, lives } = this.props;
        let remaining = attempts / lives * 100;
        let percentage = 100 - remaining;
        attempts = attempts < 0 ? 0 : attempts;
        return (
            <div className="progress-container">
                <ProgressBar 
                    animated
                    now={percentage} 
                    label={`${attempts} attempts remaining`}
                />
            </div>
        )
    }
}
