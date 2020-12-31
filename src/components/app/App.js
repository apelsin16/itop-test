import React, { Component } from "react";
import Button from "../button";
import './App.css';

function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}


export default class App extends Component {

  state = {
    isWorking: false,
    paused: false,
    start: 0,
    timeInterval: 0
  };


  startTimer = () => {
    this.setState({
      start: Date.now() - this.state.timeInterval,
      isWorking: true,
      timeInterval: this.state.timeInterval
    });
    this.timer = setInterval(() => {

        this.setState({
          timeInterval: new Date() - this.state.start,
        });

    }, 1000);
  };

  stopTimer = () => {
    this.setState({isWorking: false});
    clearInterval(this.timer);
    this.resetTimer();
  };

  pauseTimer = () => {
      this.setState({isWorking: false});
      clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      start: 0,
      isWorking: false,
      timeInterval: 0
    })
  };

  render() {
    const {isWorking, paused, start, timeInterval} = this.state;
    const seconds = Math.trunc(Math.floor(timeInterval / 1000)*10)/10;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);


    return (
        <div className="App">
          <h1>Timer
            <span className='span'>
              {hours < 10 ? "0" + hours : hours} :
              {minutes < 10 ? "0" + minutes : minutes} :
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
          </h1>
          {!paused && isWorking ?
              (<Button text='Stop' handler={this.stopTimer}/>) :
              (<Button text='Start' handler={this.startTimer}/>)
          }
          <button onDoubleClick={debounce(this.pauseTimer, 300)}>Wait</button>
          <Button text='Reset' handler={this.resetTimer}/>
        </div>
    );
  };
}
