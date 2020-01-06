import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import React from "react";

export default function Settings(props) {
  const PAPER_HEIGHT = 125;

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledPaper height={PAPER_HEIGHT}>
            <EventOptions
              wcaEvent={props.wcaEvent}
              setWcaEvent={props.setWcaEvent}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs>
          <StyledPaper height={PAPER_HEIGHT}>
            <SvgScale scaleFactor={props.scaleFactor} setScaleFactor={props.setScaleFactor} />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
}
