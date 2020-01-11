import React, { Component } from 'react'
import ImageContainer from './components/ImageContainer';
import LetterContainer from "./components/LetterContainer";
import pokeball from "./images/pokeball.png";
import lost from "./images/lost.jpg";
import won from "./images/won.jpg";

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameStarted: false,
      attempts: 5,
      lettersGuessed: [],
      guessArray: [],
      gameOver: false
    }
  }
  componentDidMount = () => {
    this.setState({
      image: pokeball
    })
  }
  getDataFromImageContainer = (...args) => {
    console.log('args ', args);
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
    if (attempts <= 0 && gameStarted || (gameStarted && attempts > 0 && !guessArray.includes("_"))) {
      console.log('wtf')
      return;
    } 
    if(!name.includes(guess)){
      this.setState({
        attempts: this.state.attempts -=1
      })
    }



    if(lettersGuessed.includes(guess)){return;}
    let matchedIndex = [];
    for( let i = 0; i < name.length; i++){
      let letter = name[i];
      if(letter === guess){
        matchedIndex.push(i);
      }
    }
    for(let index of matchedIndex){
      guessArray[index] = guess
    };
    this.setState({
      guessArray,
      lettersGuessed: [...this.state.lettersGuessed, guess]
    });
  }
  handleReset = () => {
    this.setState({
        gameStarted: false,
        attempts: 5,
        lettersGuessed: [],
        guessArray: []
    });
  }
  render() {
    console.log('app state ', this.state);
    let { attempts, guessArray, gameStarted, image } = this.state;
    let img;
    if(attempts <= 0 && gameStarted){
      img = lost
    } else if ( gameStarted && attempts > 0 && !guessArray.includes('_')){
      img = won
    } else {
      img = image
    }
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (
      <div>
        <h1>Hangmon</h1>
        <ImageContainer image={img} getDataFromImageContainer={this.getDataFromImageContainer} />
        <div className="letter-container">
          {alphabet.split("").map((letter, index) => {
            return <LetterContainer disabled={!this.state.gameStarted || this.state.lettersGuessed.includes(letter) || this.state.gameOver ? true : false} handleGuessClick={this.handleGuessClick} key={letter} letter={letter} />;
          })}
        </div>
      </div>
    );
  }
}


export default App;
