import React, { Component } from 'react';
import moment from 'moment';
import './App.scss';
import TimerHeader from './TimerHeader';
import TimerSettings from './TimerSettings';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerFooter from './TimerFooter';

const initSit = 20;
const initStand = 20;
const initLabel = 'SIT';

class App extends Component {
  constructor(props) {
    super(props)
    //set parent state w/default durations, clock set to 'Sit', and not running
    this.state = {
      currentTime: moment.duration(initSit, 'minutes'),
      SitTime: moment.duration(initSit, 'minutes'),
      StandTime: moment.duration(initStand, 'minutes'),
      label: initLabel,
      running: false,
      timer: null
    };
    
    this.changeSitTime = this.changeSitTime.bind(this);
    this.changeStandTime = this.changeStandTime.bind(this);
    this.switchLabel = this.switchLabel.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.makeAlert = this.makeAlert.bind(this);
  }

  //set currentTime to either SitTime or StandTime on load
  componentDidMount() {
    this.setState({
      currentTime: this.state.label === 'SIT' ? this.state.SitTime.clone() : this.state.StandTime.clone()
    })
  }

  //change the Sit and/or Stand times that are displayed
  changeSitTime(newSitTime) {
      this.setState({
        currentTime: !this.state.running && this.state.label === 'SIT' ? newSitTime.clone() : this.state.currentTime,
        SitTime: newSitTime
      })
   
  }

  changeStandTime(newStandTime) {
      this.setState({
        currentTime: !this.state.running && this.state.label === 'STAND' ? newStandTime.clone() : this.state.currentTime,
        StandTime: newStandTime
      })
  }

  //change the clock setting when an active timer hits 0
  switchLabel() {
    this.setState({
      label: this.state.label === 'SIT' ? 'STAND' : 'SIT'
    })
  }

  //change the timer from Sit to Stand when an active timer hits 0
  switchTimer() {
    this.setState({
      currentTime: this.state.label === 'SIT' ? this.state.SitTime.clone() : this.state.StandTime.clone()
    })
  }  


  //start the timer when start button is clicked
  startTimer() {
    if (this.state.running) {
      return
    } else { 
      this.setState({
        running: true,
        timer: setInterval(this.countdown, 1000)
      })
    }
  }

  //stop the timer when stop (i.e., pause) button is clicked
  stopTimer() {
    if (!this.state.running) {
      return
    } else {
      let interval = this.state.timer
      
      this.setState({
        running: false,
        timer: clearInterval(interval)
      })
    }
  }

  //reset the timer when reset button is clicked
  resetTimer() {
    let interval = this.state.timer

    this.setState({
      currentTime: moment.duration(initSit, 'minutes'),
      SitTime: moment.duration(initSit, 'minutes'),
      StandTime: moment.duration(initStand, 'minutes'),
      label: initLabel,
      running: false,
      timer: clearInterval(interval)
    })
  }

  //reduce timer by the second when running === true
  countdown() {
    if (this.state.running) {
      this.setState({
        currentTime: this.state.currentTime.subtract(1, 'seconds')
      })
  }

    if (this.state.running && this.state.currentTime.get('minutes') <= 0 && this.state.currentTime.get('seconds') <= 0)  {
      this.playAudio();
      this.makeAlert();
      this.switchLabel();
      this.switchTimer();
    }

  }

 playAudio() {
   const beep = document.getElementById("beep");
   beep.play();
 }

 makeAlert() {
   const sitDown = "Sit Down!"
   const standUp = "Stand Up!"
   return (this.state.label === 'SIT' ? alert(standUp) : alert(sitDown))
 }


  render() {
    return (
      <div className="container-fluid container-clock">
        <TimerHeader />
        <TimerSettings SitTime={this.state.SitTime} StandTime={this.state.StandTime} label={this.state.label} running={this.props.running} changeSitTime={this.changeSitTime} changeStandTime={this.changeStandTime}/>
        <TimerDisplay currentTime={this.state.currentTime} />
        <TimerControls startTimer={this.startTimer} stopTimer={this.stopTimer} resetTimer={this.resetTimer}/>
        <TimerFooter />
      </div>
    );
  }  
}


export default App;