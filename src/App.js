import React, { Component, createRef } from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/BottomNav";
import StyledPaper from "./components/StyledPaper";
import Scramble from "./components/Scramble";

class App extends Component {
  svgRef = createRef();

  render() {
    return (
      <Container
        style={{
          marginTop: "10vh"
        }}
      >
        <Grid container direction="column" alignItems={"center"}>
          <Stopwatch />
          <Scramble />

          <Grid container spacing={4}>
            <Grid item xs={8}>
              <BottomNav />
            </Grid>
            <Grid item xs={4}>
              {/* Hardcode margin top to align with contents of BottomNav */}
              {/* Probably not best practice, but I'm getting lazy. */}
              <StyledPaper
                height={340}
                style={{
                  marginTop: "56px"
                }}
              >
                <div
                  ref={this.svgRef}
                  style={{
                    transform: `scale(${this.props.svgScale})`,
                    transformOrigin: "center center"
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
