import React, { Component } from 'react'
import pokeball from '../../images/pokeball.png'
import lost from '../../images/lost.jpg'
import won from '../../images/won.jpg'
import axios from 'axios';


export default class ImageContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: pokeball,
            loading: false,
            gameStarted: false,
            reset: false
        }
    }
    handleReset = () => {
        this.setState({
            imageSource: pokeball,
            gameStarted: false,
            reset: false
        })
    }
    componentDidMount = () => {

    }
    componentDidUpdate(prevProps, prevState){

    }
    handleClick = () => {
        this.setState({loading: true})
        let randomNum = Math.floor(Math.random() * 151) + 1
        axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`).then((resp) => {
            let { sprites, name } = resp.data;
            let { front_shiny: image } = sprites;
            let guessArray = [];
            let nameLength = name.length;
            for(let i = 0; i < nameLength; i++){
                guessArray.push('_')
            }
            this.setState({
              loading: false,
              name,
              image,
              imageSource: image,
              gameStarted: true,
              guessArray
            }, () => {
                this.props.getDataFromImageContainer(this.state);
            });
        })
    }
    render() {
        console.log('image container state ', this.state);
        return (
            <div className="image-container">
                <img onClick={!this.state.gameStarted ? this.handleClick : ''} src={this.props.image} />
                <div className="guess-container">
                {!this.state.gameStarted ? (
                    <div className="guess-box">
                        <p>Click To Begin</p>
                    </div>
                ) : '' }
                {this.state.gameStarted && this.state.guessArray && this.state.guessArray.length > 0 ? this.state.guessArray.map((guess) => {
                    return (
                        <div className="guess-box">
                            <p>{guess}</p>
                        </div>
                    )
                }) : ''}
                </div>
                <button onClick={this.handleReset}>Reset </button>
            </div>
        )
    }
}
