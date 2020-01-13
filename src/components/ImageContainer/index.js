import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
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
            reset: false,
            guessArray: this.props.guessArray
        }
    }
    handleReset = () => {
        this.props.handleReset();
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
        let { gameStarted } = this.props;
        let margin = {marginTop: '1%'}
        return (
            <div className="image-container">
                {!gameStarted ? (
                    <div className="guess-box">
                        <p>Open a Pokémon to begin!</p>
                    </div>
                ) : '' }
                <img id="pokeball" onClick={!gameStarted ? this.handleClick : ''} src={this.props.image} />
                <div className="guess-container">
                {gameStarted && this.props.guessArray && this.props.guessArray.length > 0 ? this.props.guessArray.map((guess) => {
                    return (
                        <div className="guess-box">
                            <p>{guess}</p>
                        </div>
                    )
                }) : ''}
                </div>
                <Button style={margin} size="sm" onClick={this.handleReset}>Reset </Button>
            </div>
        )
    }
}
