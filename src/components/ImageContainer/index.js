import React, { Component } from 'react'
import pokeball from '../../images/pokeball.png'
import lost from '../../images/lost.jpg'
import won from '../../images/won.jpg'

export default class ImageContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: pokeball
        }
    }
    componentDidMount = () => {

    }
    handleClick = () => {

    }
    render() {
        return (
            <div className="image-container">
                <img src={this.state.imageSource} />
            </div>
        )
    }
}
