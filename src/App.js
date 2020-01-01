import React, { Component, createRef } from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import green from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";
import BottomNav from "./components/BottomNav";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme({
  typography: {
    fontSize: 18
  }
});

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
      <ThemeProvider theme={theme}>
        <Container>
          <Grid container spacing={24} direction="column" alignItems={"center"}>
            <Typography variant={"body1"} color={"textSecondary"}>{this.state.scramble}</Typography>
            <Stopwatch addRecordedTimes={this.addRecordedTimes.bind(this)} />

            <div
              ref={this.appRef}
              style={{
                transform: `scale(${this.state.scaleFactor})`,
                "transform-origin": "center center",
                padding: "65px 49px"
              }}
            ></div>
            <BottomNav
              recordedTimes={this.state.recordedTimes[this.state.wcaEvent]}
              setWcaEvent={value => this.setState({ wcaEvent: value })}
              setScaleFactor={value => this.setState({ scaleFactor: value })}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
