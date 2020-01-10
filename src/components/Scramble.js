import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

function Scramble(props) {
  return (
    <Typography
      variant={"body1"}
      color={"textSecondary"}
      style={{ marginBottom: 80 }}
    >
      {props.scramble}
    </Typography>
  );
}

export default connect(state => ({
  scramble: state.scramble
}))(Scramble);
