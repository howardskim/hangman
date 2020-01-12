import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'

export default class Progessbar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let { attempts, lives } = this.props;
        let remaining = attempts / lives * 100;
        let percentage = 100 - remaining;
        
        return (
            <div className="progress-container">
                <ProgressBar 
                    now={percentage} 
                    label={`${attempts} remaining`}
                />
            </div>
        )
    }
}
