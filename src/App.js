import React, { Component } from 'react'
import ImageContainer from './components/ImageContainer';
import LetterContainer from "./components/LetterContainer";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount = () => {

  }
  getDataFromImageContainer = (...args) => {
    console.log('args ', args);
    this.setState({
      data: args[0]
    })
  }
  render() {
    console.log('app state ', this.state);
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return (
      <div>
        <h1>Hangmon</h1>
        <ImageContainer getDataFromImageContainer={this.getDataFromImageContainer} />
        <div className="letter-container">
          {alphabet.split("").map((letter, index) => {
            return <LetterContainer key={letter} letter={letter} />;
          })}
        </div>
      </div>
    );
  }
}


export default App;
