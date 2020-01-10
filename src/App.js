import React, {Component, createRef} from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/BottomNav";
import Typography from "@material-ui/core/Typography";
import StyledPaper from "./components/StyledPaper";
import {connect} from "react-redux";
import Scramble from "./components/Scramble";
import {bindActionCreators} from "redux";
import {updateScramble, setSvgScale} from "./actions";


class App extends Component {
  state = {
    recordedTimes: {},
    scrambledCubeSvg: "",
    scaleFactor: 2
  };

  svgRef = createRef();

  componentDidMount() {
    if (localStorage.getItem("times")) {
      this.setState(JSON.parse(localStorage.getItem("times")));
      console.log(this.props.wcaEvent);
    } else {
      this.props.updateScramble(true);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.recordedTimes !== this.state.recordedTimes) {
      this.props.updateScramble();
    } else if (prevProps.wcaEvent !== this.props.wcaEvent) {
      this.props.updateScramble(true);
    }
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

      const result = {recordedTimes: recordedTimesCopy};

      localStorage.setItem("times", JSON.stringify(result));
      return result;
    })
    ;
  }

  render() {
    return (
      <Container style={{
        marginTop: "10vh"
      }}>
        <Grid container direction="column" alignItems={"center"}>

          <Stopwatch addRecordedTimes={this.addRecordedTimes.bind(this)}/>
          <Scramble/>


          <Grid container spacing={4}>
            <Grid item xs={8}>
              <BottomNav
                recordedTimes={this.state.recordedTimes[this.props.wcaEvent]}
                wcaEvent={this.props.wcaEvent}
                setWcaEvent={value => this.setState({wcaEvent: value})}
                 />
            </Grid>
            <Grid item xs={4}>
              {/* Hardcode margin top to align with contents of BottomNav */}
              {/* Probably not best practice, but I'm getting lazy. */}
              <StyledPaper height={340} style={{
                marginTop: "56px",
              }}>
                <div
                  ref={this.svgRef}
                  style={{
                    transform: `scale(${this.props.svgScale})`,
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

const mapStateToProps = (state) => ({
  svgScale: state.svgScale,
  wcaEvent: state.wcaEvent
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateScramble
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
