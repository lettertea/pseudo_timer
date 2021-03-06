import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateScramble } from "../actions";

class Scramble extends Component {
  componentDidMount() {
    this.props.updateScramble(true);
  }

  render() {
    return (
      <Typography
        variant={"body1"}
        color={"textSecondary"}
        style={{ marginBottom: 80 }}
      >
        {this.props.scramble}
      </Typography>
    );
  }
}

const mapStateToProps = state => ({
  scramble: state.scramble,
  wcaEvent: state.wcaEvent,
  times: state.times
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateScramble
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Scramble);
