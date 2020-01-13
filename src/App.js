import React, {Component, createRef} from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/BottomNav";
import StyledPaper from "./components/StyledPaper";
import {connect} from "react-redux";
import Scramble from "./components/Scramble";
import {bindActionCreators} from "redux";
import {setTimes, updateScramble} from "./actions";


class App extends Component {
  state = {
    recordedTimes: {},
    scrambledCubeSvg: "",
    scaleFactor: 2
  };

  svgRef = createRef();

  render() {
    return (
      <Container style={{
        marginTop: "10vh"
      }}>
        <Grid container direction="column" alignItems={"center"}>

          <Stopwatch/>
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
  wcaEvent: state.wcaEvent,
})
export default connect(
  mapStateToProps
)(App)
