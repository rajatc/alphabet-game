import React, { Component } from 'react';
import classNames from 'classnames';
import alphabets from './alphabets.json';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            alphabets: alphabets,
            currentPosition: 0,
            currentTick:0,
            random: false,
            sound: true
        }
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.playSound = this.playSound.bind(this);
        this.switchRandom = this.switchRandom.bind(this);
        this.switchSound = this.switchSound.bind(this);
        this.manualPlaySound = this.manualPlaySound.bind(this);
    }

    switchRandom(){
        this.setState({
            random: !this.state.random
        });
    }

    switchSound(){
        this.setState({
            sound: !this.state.sound
        });
    }

    componentDidMount (){
        let letterSound = document.querySelector('audio[data-key="letter"]');
        let wordSound = document.querySelector('audio[data-key="word"]');
        if(this.state.currentTick === 0)
            letterSound.play();
    }

    componentDidUpdate(){
        this.playSound();
    }

    manualPlaySound(){
        let letterSound = document.querySelector('audio[data-key="letter"]');
        let wordSound = document.querySelector('audio[data-key="word"]');

        if(this.state.currentTick === 0){
            letterSound.currentTime = 0;
            letterSound.play();
        } else {
            wordSound.currentTime = 0;
            wordSound.play();
        }        
    }

    playSound(){
        let letterSound = document.querySelector('audio[data-key="letter"]');
        let wordSound = document.querySelector('audio[data-key="word"]');

        if(this.state.sound){
            if(this.state.currentTick === 0){
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
        }
        
    }
    randomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    handleNext(){
        if(this.state.random){
            if(this.state.currentTick < 2){
                this.setState({currentTick: this.state.currentTick + 1 })
            } else {
                this.setState({
                    currentPosition: this.randomNumber(0, this.state.alphabets.length - 1),
                    currentTick: 0
                });
            }
        } else {
            if (this.state.currentTick < 2){
                this.setState({currentTick: this.state.currentTick + 1 })
            } else {
                if(this.state.currentPosition === this.state.alphabets.length - 1) {
                    this.state.currentPosition = 0 ;
                } else {
                    this.state.currentPosition += 1;
                }
                this.setState({
                    currentPosition: this.state.currentPosition,
                    currentTick: 0
                });
            }
        }
        
        // this.playSound();
    }

    handlePrevious(){
        if(this.state.currentPosition === 0) {
            this.state.currentPosition = this.state.alphabets.length - 1 ;
        } else {
            this.state.currentPosition -= 1;
        }
        this.setState({
            currentPosition: this.state.currentPosition
        });
    }

    render(){
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showSpelling = this.state.currentTick === 2 ? true : false;
        return(
            <div className="game">  
                <span className="random-label">Random letters: </span>
                <label className="switch">
                    <input type="checkbox" 
                        defaultValue="false"
                        checked={this.state.random}
                        onClick={this.switchRandom}
                    />
                    <div className="slider round"></div>
                </label>
                <span className="random-label">Sound: </span>
                <label className="switch">
                    <input type="checkbox" 
                        defaultValue="true"
                        checked={this.state.sound}
                        onChange={this.switchSound}
                    />
                    <div className="slider round"></div>
                </label>
                <div className="option">
                    <div className="fields">
                        <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                        </div>
                        <audio src={this.state.alphabets[this.state.currentPosition].letterSound} data-key="letter" />
                    </div>
                </div>
                <div className="buttons">
                    <a className="button prev" onClick={this.handlePrevious}>Previous</a>
                    <a className="button sound" onClick={this.manualPlaySound}>Play Sound Again</a>
                    <a className="button next" onClick={this.handleNext}>Next</a>
                </div>
                <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                                <div className={classNames('placeholder-span',{hide: showImage})}>
                                    Click next to view image
                                </div>
                                <img className={classNames('letter-image',{hide: !showImage})} 
                                        alt={this.state.alphabets[this.state.currentPosition].word}
                                        src={this.state.alphabets[this.state.currentPosition].image} />
                                <audio src={this.state.alphabets[this.state.currentPosition].wordSound} data-key="word" />
                            </div>
                            <div className="right-field">
                                <div className={classNames('placeholder-span',{hide: showSpelling})}>
                                    Click next to view spelling
                                    </div>
                                <div className={classNames('word',{hide: !showSpelling})}>
                                {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        
                    </div>
            </div>
        );
    }
}

export default Game;