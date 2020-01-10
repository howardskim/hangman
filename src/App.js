import React, { Component } from 'react'
import ImageContainer from './components/ImageContainer';
import LetterContainer from "./components/LetterContainer";
import './App.css';

class App extends Component {
  render() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (
      <div>
        <h1>Hangmon</h1>
        <ImageContainer />
        <div className="letter-container">
          { alphabet.split("").map((letter, index) => {
            return <LetterContainer key={letter} letter={letter} />;
          }) }
        </div>
      </div>
    );
  }
}


export default App;
