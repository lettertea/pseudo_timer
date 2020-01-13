import React, {Component} from "react";
import Stopwatch from "./components/Stopwatch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/BottomNav";
import Scramble from "./components/Scramble";
import Svg from "./components/Svg";

class App extends Component {

  render() {
    return (
      <Container
        style={{
          marginTop: "10vh"
        }}
      >
        <Grid container direction="column" alignItems={"center"}>
          <Stopwatch/>
          <Scramble/>

          <Grid container spacing={4}>
            <Grid item xs={8}>
              <BottomNav/>
            </Grid>
            <Grid item xs={4}>
              <Svg/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
