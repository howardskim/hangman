import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ImageContainer from './components/ImageContainer';
import LetterContainer from "./components/LetterContainer";
import Progessbar from './components/Progessbar';
import pokeball from "./images/pokeball.png";
import lost from "./images/lost.jpg";
import won from "./images/won.jpg";
import title from './images/title.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameStarted: false,
      lives: 5,
      attempts: 5,
      lettersGuessed: [],
      guessArray: [],
      gameOver: false,
      gameLost: false
    }
  }
  componentDidMount = () => {
    this.setState({
      image: pokeball
    })
  }
  getDataFromImageContainer = (...args) => {
    let { imageSource, loading, gameStarted, name, image, guessArray, reset } = args[0]
    if(reset){
      this.setState({
        imageSource,
        loading,
        gameStarted,
        name,
        image,
        guessArray,
        lettersGuessed: []
      });
    }
    this.setState({
      imageSource,
      loading,
      gameStarted,
      name,
      image,
      guessArray
    })
  }
  handleGuessClick = (guess) => {
    let { name, guessArray, lettersGuessed, attempts, gameStarted } = this.state;
    if(lettersGuessed.includes(guess)){
      return;
    } else {
      this.setState({
        lettersGuessed: [...this.state.lettersGuessed, guess]
      })
    }
    if (!name.includes(guess)) {
      this.setState({
        attempts: (this.state.attempts -= 1)
      });
    };
    let matchedIndex = [];
    for (let i = 0; i < name.length; i++) {
      let letter = name[i];
      if (letter === guess) {
        matchedIndex.push(i);
      }
    }
    for (let index of matchedIndex) {
      guessArray[index] = guess;
    };
    this.setState({
      guessArray
    })
  };

  
  handleReset = () => {
    this.setState({
        gameStarted: false,
        attempts: 5,
        lettersGuessed: [],
        gameOver: false,
        guessArray: [],
        image: pokeball,
        imageSource: pokeball,
        gameLost: false
    });
  }
  render() {
    let { attempts, guessArray, gameStarted, image, gameLost } = this.state;
    let img;
    if(attempts <= 0 && gameStarted){
      img = lost
    } else if (gameStarted && attempts > 0 && !guessArray.includes('_')){
      img = won
    } else {
      img = image
    }
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (
      <div className="outer-container">
        <div className="title-container">
          <img src={title} />
        </div>
        <ImageContainer
          gameStarted={this.state.gameStarted}
          handleReset={this.handleReset}
          image={img}
          getDataFromImageContainer={this.getDataFromImageContainer}
          guessArray={attempts <= 0 ? this.state.name.split('') : this.state.guessArray }
        />
        <div className="letter-container">
          {alphabet.split("").map((letter, index) => {
            return (
              <LetterContainer
                disabled={
                  this.state.guessArray.join('') === this.state.name ||
                  this.state.attempts <= 0 ||
                  !this.state.gameStarted ||
                  this.state.lettersGuessed.includes(letter) ||
                  this.state.gameOver
                    ? true
                    : false
                }
                handleGuessClick={this.handleGuessClick}
                key={letter}
                letter={letter}
              />
            );
          })}
        </div>
        <Progessbar lives={this.state.lives} attempts={this.state.attempts} />
      </div>
    );
  }
}


export default App;
