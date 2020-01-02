import React, {Component, createRef} from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import BottomNav from "./components/BottomNav";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import StyledPaper from "./components/StyledPaper";


class App extends Component {
  state = {
    recordedTimes: {},
    scramble: "",
    scrambledCubeSvg: "",
    wcaEvent: "333",
    scaleFactor: 2
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
    // 333oh uses the same scramble algorithm as 333
    let parsedWcaEvent = this.state.wcaEvent === "333oh" ? "333" : this.state.wcaEvent;
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
        window.puzzles[parsedWcaEvent]
      );
    };

    if (loadCurrentAndNextScramble) {
      setTimeout(() => {
        this.setState(
          {
            scramble: window.puzzles[parsedWcaEvent].generateScramble()
          },
          parseScrambledCubeSvg
        );
      });
    } else {
      this.setState({scramble: this.nextScramble}, parseScrambledCubeSvg);
    }
    setTimeout(() => {
      this.nextScramble = window.puzzles[
        parsedWcaEvent
        ].generateScramble();
    }, 100);
  }

  addRecordedTimes(value) {
    this.setState(prevState => {
      const recordedTimesCopy = {...prevState.recordedTimes};
      if (recordedTimesCopy[prevState.wcaEvent]) {
        recordedTimesCopy[prevState.wcaEvent].push(value);
      } else {
        recordedTimesCopy[prevState.wcaEvent] = [value];
      }
      return {recordedTimes: recordedTimesCopy};
    })
    ;
  }

  render() {
    return (
        <Container>
          <Grid container direction="column" alignItems={"center"}>

            <Stopwatch addRecordedTimes={this.addRecordedTimes.bind(this)}/>

            <Grid container spacing={6}>
              <Grid item xs={7}>
                <BottomNav
                  recordedTimes={this.state.recordedTimes[this.state.wcaEvent]}
                  wcaEvent={this.state.wcaEvent}
                  setWcaEvent={value => this.setState({wcaEvent: value})}
                  scaleFactor={this.state.scaleFactor}
                  setScaleFactor={value => this.setState({scaleFactor: value})}
                />
              </Grid>
              <Grid item xs={4}>
                <StyledPaper style={{

                }}>
                  <Typography variant={"body1"} color={"textSecondary"}>{this.state.scramble}</Typography>
                  <div
                    ref={this.appRef}
                    style={{
                      transform: `scale(${this.state.scaleFactor})`,
                      transformOrigin: "center left",
                      padding: "60px 4px"
                    }}
                  />
                </StyledPaper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
    );
  }
}

export default App;
