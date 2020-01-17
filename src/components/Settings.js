import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import React, {Component} from "react";
import Inspection from "./Inspection";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSettings} from "../actions";

const PAPER_HEIGHT = 120;

class Settings extends Component {


  componentDidUpdate() {
    localStorage.setItem("settings", JSON.stringify(this.props.settings));
  }

  render() {
    return (
      <div style={{flexGrow: 1}}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <StyledPaper height={PAPER_HEIGHT}>
              <EventOptions wcaEvent={this.props.wcaEvent}/>
            </StyledPaper>
          </Grid>
          <Grid item xs={6}>
            <StyledPaper height={PAPER_HEIGHT}>
              <SvgScale svgScale={this.props.svgScale}/>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            {/* 196 for height to match the svg */}
            <StyledPaper height={196}>
              <Inspection inspection={this.props.inspection} voiceType={this.props.voiceType}/>
            </StyledPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  settings: state.settings,
  svgScale: state.settings.svgScale,
  wcaEvent: state.settings.wcaEvent,
  inspection: state.settings.inspection,
  voiceType: state.settings.voiceType
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSettings
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
