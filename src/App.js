import React, {Component, createRef} from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/BottomNav";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "./components/StyledPaper";


class App extends Component {
  state = {
    recordedTimes: {},
    scramble: "",
    scrambledCubeSvg: "",
    wcaEvent: "333",
    scaleFactor: 2
  };

  svgRef = createRef();

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
      this.svgRef.current.innerHTML = window.toSVG(
        this.state.scramble,
        window.puzzles[parsedWcaEvent]
      );
    };

    if (loadCurrentAndNextScramble) {
      // Set scramble to empty to notify users the scramble is loading
      this.setState({scramble: ""});

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
      const recordedTimeInfo = {time: value, scramble: prevState.scramble, date: new Date().toLocaleString("en-us")}
      const recordedTimesCopy = {...prevState.recordedTimes};
      if (recordedTimesCopy[prevState.wcaEvent]) {
        recordedTimesCopy[prevState.wcaEvent].push(recordedTimeInfo);
      } else {
        recordedTimesCopy[prevState.wcaEvent] = [recordedTimeInfo];
      }
      return {recordedTimes: recordedTimesCopy};
    })
    ;
  }

  render() {
    return (
      <Container style={{
        "margin-top": "10vh"
      }}>
        <Grid container direction="column" alignItems={"center"}>

          <Stopwatch addRecordedTimes={this.addRecordedTimes.bind(this)}/>
          <Typography variant={"body1"}
                      color={"textSecondary"}
                      style={{"margin-bottom": 80}}>{this.state.scramble ? this.state.scramble : "Loading Scramble..."}</Typography>


          <Grid container spacing={4}>
            <Grid item xs={8}>
              <BottomNav
                recordedTimes={this.state.recordedTimes[this.state.wcaEvent]}
                wcaEvent={this.state.wcaEvent}
                setWcaEvent={value => this.setState({wcaEvent: value})}
                scaleFactor={this.state.scaleFactor}
                setScaleFactor={value => this.setState({scaleFactor: value})}
              />
            </Grid>
            <Grid item xs={4}>
              {/* Hardcode margin top to align with contents of BottomNav */}
              {/* Probably not best practice, but I'm getting lazy. */}
              <StyledPaper height={340} style={{
                "margin-top": "56px",
              }}>
                <div
                  ref={this.svgRef}
                  style={{
                    transform: `scale(${this.state.scaleFactor})`,
                    transformOrigin: "center center",
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
