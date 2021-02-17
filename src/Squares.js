import React, { Component } from 'react';
import './Squares.css';
import Clock from './Clock';

const squares = [
    {'square': 'a1', 'color': 'dark'}, {'square': 'a2', 'color': 'light'}, {'square': 'a3', 'color': 'dark'}, {'square': 'a4', 'color': 'light'},
    {'square': 'a5', 'color': 'dark'}, {'square': 'a6', 'color': 'light'}, {'square': 'a7', 'color': 'dark'}, {'square': 'a8', 'color': 'light'},
    {'square': 'b1', 'color': 'light'}, {'square': 'b2', 'color': 'dark'}, {'square': 'b3', 'color': 'light'}, {'square': 'b4', 'color': 'dark'},
    {'square': 'b5', 'color': 'light'}, {'square': 'b6', 'color': 'dark'}, {'square': 'b7', 'color': 'light'}, {'square': 'b8', 'color': 'dark'},
    {'square': 'c1', 'color': 'dark'}, {'square': 'c2', 'color': 'light'}, {'square': 'c3', 'color': 'dark'}, {'square': 'c4', 'color': 'light'},
    {'square': 'c5', 'color': 'dark'}, {'square': 'c6', 'color': 'light'}, {'square': 'c7', 'color': 'dark'}, {'square': 'c8', 'color': 'light'},
    {'square': 'd1', 'color': 'light'}, {'square': 'd2', 'color': 'dark'}, {'square': 'd3', 'color': 'light'}, {'square': 'd4', 'color': 'dark'},
    {'square': 'd5', 'color': 'light'}, {'square': 'd6', 'color': 'dark'}, {'square': 'd7', 'color': 'light'}, {'square': 'd8', 'color': 'dark'},
    {'square': 'e1', 'color': 'dark'}, {'square': 'e2', 'color': 'light'}, {'square': 'e3', 'color': 'dark'}, {'square': 'e4', 'color': 'light'},
    {'square': 'e5', 'color': 'dark'}, {'square': 'e6', 'color': 'light'}, {'square': 'e7', 'color': 'dark'}, {'square': 'e8', 'color': 'light'},
    {'square': 'f1', 'color': 'light'}, {'square': 'f2', 'color': 'dark'}, {'square': 'f3', 'color': 'light'}, {'square': 'f4', 'color': 'dark'},
    {'square': 'f5', 'color': 'light'}, {'square': 'f6', 'color': 'dark'}, {'square': 'f7', 'color': 'light'}, {'square': 'f8', 'color': 'dark'},
    {'square': 'g1', 'color': 'dark'}, {'square': 'g2', 'color': 'light'}, {'square': 'g3', 'color': 'dark'}, {'square': 'g4', 'color': 'light'},
    {'square': 'g5', 'color': 'dark'}, {'square': 'g6', 'color': 'light'}, {'square': 'g7', 'color': 'dark'}, {'square': 'g8', 'color': 'light'},
    {'square': 'h1', 'color': 'light'}, {'square': 'h2', 'color': 'dark'}, {'square': 'h3', 'color': 'light'}, {'square': 'h4', 'color': 'dark'},
    {'square': 'h5', 'color': 'light'}, {'square': 'h6', 'color': 'dark'}, {'square': 'h7', 'color': 'light'}, {'square': 'h8', 'color': 'dark'},
];

const ROUNDLENGTH = 600;
const GRANLENGTH = 100;

class Squares extends Component {
    state = {
        solved: 0,
        solvedArray: [],
        failed: 0,
        failedArray: [],
        timer: 0,
        timeRunning: false,
        clock: 0,
        square: squares[7].square,
        color: squares[7].color,
        style: {},
    }

    changeSquare = () => {
        const idx = Math.floor(Math.random() * squares.length);
        this.setState({
            square: squares[idx].square,
            color: squares[idx].color
        });
    }

    componentDidMount = () => {
        this.changeSquare();
    }

    formatTime = (time) => {
        const mins = (Math.floor(time / 600)).toString().padStart(2, '0');
        const secs = (Math.floor((time % 600) / 10)).toString().padStart(2, '0');
        const mils = (time % 10).toString();
        return time < GRANLENGTH && time > 0 ? `${mins}:${secs}.${mils}` : `${mins}:${secs}`;
    }

    startRound = () => {
        this.changeSquare();
        this.setState({
            timer: ROUNDLENGTH,
            solved: 0,
            solvedArray: [],
            failed: 0,
            failedArray: [],
            timeRunning: true,
            clock: setInterval(this.runClock, 100)
        });
    }

    endRound = () => {
        clearInterval(this.state.clock);
        this.setState({
            timeRunning: false,
            clock: 0
        })
    }

    runClock = () => {
       if (this.state.timer === 0 || this.state.failed >= 3) {
           this.endRound();
       } else {
           this.setState({
               timer: this.state.timer - 1
           });
       }
    }
    /*
    flashBackground = (color) => {
        document.body.style.background = color;
        setTimeout(() => {
            document.body.style.transitionProperty = 'background-color';
            document.body.style.transitionDuration = '.5s';
            document.body.style.background = 'blanchedalmond';
        }, 100);
    }
    */
    flashBackgroundStyle = (color) => {
        this.setState({
            style: {
                transition: 'background-color .125s ease-in',
                background: color,
            }
        });
        setTimeout(() => {
            this.setState({
                style: { 
                    transition: 'background-color .125s ease-in',
                    background: 'blanchedalmond',
                 }
            })
        }, 125);
    }

    checkSquare = (event) => {
        if (!this.state.timeRunning) { 
            return;
        }
        let newSolve = this.state.solved;
        let newFail = this.state.failed;
        let solveArray = this.state.solvedArray;
        let failArray = this.state.failedArray;
        
        const chosenColor = event.target.className.split(" ")[1];

        if (chosenColor === this.state.color) {
            newSolve = newSolve + 1;
            solveArray.push(this.state.square);
            // this.flashBackground('green');
            this.flashBackgroundStyle('green');
        } else {
            newFail = newFail + 1;
            failArray.push(this.state.square);
            // this.flashBackground('red');
            this.flashBackgroundStyle('red');
        }    
        this.setState({
            solved: newSolve,
            failed: newFail,
            failedArray: failArray,
            solvedArray: solveArray,
        });
        this.changeSquare();
        console.log("Solved: " + solveArray);
        console.log("Failed: " + failArray);
    }

    render() {
        return (
            <div className="Squares" style={this.state.style}>
                <p>Select the Square Color</p>
                <div className="question">{this.state.timeRunning ? this.state.square : '--'}</div>
                <div className="square light" onClick={this.checkSquare}></div>
                <div className="square dark" onClick={this.checkSquare}></div>
                <Clock time={this.formatTime(this.state.timer)} />
                <div className="info">Solved: {this.state.solved}</div>
                <div className="info">Strikes: {this.state.failed}</div>
                <button className="Button" onClick={this.startRound}>Start</button>
            </div>
        );
    }
}

export default Squares;
