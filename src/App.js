import React, {Component} from "react";
import "./App.css";

import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";
import {ICAScrambo} from "icascrambo/dist/ICAScrambo";
import Settings from "./components/Settings";

const scrambler = new ICAScrambo();

class App extends Component {
  state = {
    recordedTimes: [],
    scramble: "",
    wcaEvent: "333"
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.recordedTimes !== this.state.recordedTimes) {
      this.updateScramble();
    } else if (prevState.wcaEvent !== this.state.wcaEvent) {
      this.updateScramble(true);
    }
  }

  componentDidMount() {
    this.updateScramble(true);
  }

  updateScramble(loadCurrentAndNextScramble = false) {
    if (typeof window.puzzles === "undefined") {
      setTimeout(() => this.updateScramble(true), 200);
      return;
    }

    // setTimeouts are used to make generateScramble calls asynchronous because
    // it can take a long time to execute. The asynchronous nature allows some
    // rendering in between calls to happen so the UI doesn't seem like it's
    // freezing up
    if (loadCurrentAndNextScramble) {
      setTimeout(() => {
        this.setState({
          scramble: window.puzzles[this.state.wcaEvent].generateScramble()
        });
      });
    } else {
      this.setState({scramble: this.nextScramble});
    }
    setTimeout(() => {
      this.nextScramble = window.puzzles[
        this.state.wcaEvent
        ].generateScramble();
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.scramble}
        <Stopwatch
          recordedTimes={this.state.recordedTimes}
          setRecordedTimes={value => this.setState({recordedTimes: value})}
        />
        <Times recordedTimes={this.state.recordedTimes}/>

        <Settings setWcaEvent={value => this.setState({wcaEvent: value})}/>
      </div>
    );
  }
}

export default App;
