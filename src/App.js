import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header easy-abc">
          <h1>Easy ABC</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
