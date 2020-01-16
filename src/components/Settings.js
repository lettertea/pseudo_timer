import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import React from "react";
import Inspection from "./Inspection";

export default function Settings(props) {
  const PAPER_HEIGHT = 125;

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StyledPaper height={PAPER_HEIGHT}>
            <EventOptions />
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper height={PAPER_HEIGHT}>
            <SvgScale />
          </StyledPaper>
        </Grid>

      <Grid item xs={12}>
        <StyledPaper height={PAPER_HEIGHT}>
          <Inspection/>
        </StyledPaper>
      </Grid>
    </Grid>
    </div>
  );
}
