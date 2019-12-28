import React from "react";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";

export default props => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledPaper>
            <EventOptions setWcaEvent={props.setWcaEvent} />
          </StyledPaper>
        </Grid>
        <Grid item xs>
          <StyledPaper>
            <SvgScale setScaleFactor={props.setScaleFactor} />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};
