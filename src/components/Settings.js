import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import React from "react";
import Inspection from "./Inspection";
import {connect} from "react-redux";

function Settings(props) {
  const PAPER_HEIGHT = 125;

  return (
    <div style={{flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StyledPaper height={PAPER_HEIGHT}>
            <EventOptions wcaEvent={props.wcaEvent}/>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper height={PAPER_HEIGHT}>
            <SvgScale svgScale={props.svgScale}/>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper height={PAPER_HEIGHT}>
            <Inspection inspection={props.inspection} judgeGender={props.judgeGender}/>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect((state) => ({
  svgScale: state.settings.svgScale,
  wcaEvent: state.settings.wcaEvent,
  inspection: state.settings.inspection,
  judgeGender: state.settings.judgeGender
}))(Settings);
