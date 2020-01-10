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
            <EventOptions />
          </StyledPaper>
        </Grid>
        <Grid item xs>
          <StyledPaper height={PAPER_HEIGHT}>
            <SvgScale />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
}
