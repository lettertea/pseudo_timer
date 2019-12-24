import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";

const classes = makeStyles(theme => ({
  card: {
    maxWidth: 200,
    margin: 8
  }
}));

export default props => {
  return (
    <div>
      <EventOptions setWcaEvent={props.setWcaEvent} />
      <SvgScale setScaleFactor={props.setScaleFactor} />
    </div>
  );
};
