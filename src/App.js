import React, { Component, createRef } from "react";
import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";
import Settings from "./components/Settings";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

class App extends Component {
  state = {
    recordedTimes: [],
    scramble: "",
    scrambledCubeSvg: "",
    wcaEvent: "333",
    scaleFactor: 1
  };

  appRef = createRef();

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

    const parseScrambledCubeSvg = () => {
      console.log(
        window.toSVG(this.state.scramble, window.puzzles[this.state.wcaEvent])
      );
      this.appRef.current.innerHTML = window.toSVG(
        this.state.scramble,
        window.puzzles[this.state.wcaEvent]
      );
    };

    if (loadCurrentAndNextScramble) {
      setTimeout(() => {
        this.setState(
          {
            scramble: window.puzzles[this.state.wcaEvent].generateScramble()
          },
          parseScrambledCubeSvg
        );
      });
    } else {
      this.setState({ scramble: this.nextScramble }, parseScrambledCubeSvg);
    }
    setTimeout(() => {
      this.nextScramble = window.puzzles[
        this.state.wcaEvent
      ].generateScramble();
    }, 100);
  }

  addRecordedTimes(value) {
    this.setState(prevState => {
      const recordedTimesCopy = { ...prevState.recordedTimes };
      if (typeof prevState.recordedTimes[prevState.wcaEvent] !== "undefined") {
        recordedTimesCopy[prevState.wcaEvent].push(value);
      } else {
        recordedTimesCopy[prevState.wcaEvent] = [value];
      }
      return { recordedTimes: recordedTimesCopy };
    });
  }

  render() {
    return (
      <Container>
        <Grid container spacing={24} direction="column">
          <Grid item>{this.state.scramble}</Grid>
          <Grid item>
            <Stopwatch addRecordedTimes={this.addRecordedTimes.bind(this)} />
          </Grid>
          <Grid item>
            <Times
              recordedTimes={this.state.recordedTimes[this.state.wcaEvent]}
            />
          </Grid>
          <Grid item>
            <div
              ref={this.appRef}
              style={{
                transform: `scale(${this.state.scaleFactor})`,
                "transform-origin": "center left",
                padding: "65px 49px"
              }}
            ></div>
          </Grid>
          <Grid item>
            <Settings
              setWcaEvent={value => this.setState({ wcaEvent: value })}
              setScaleFactor={value => this.setState({ scaleFactor: value })}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
