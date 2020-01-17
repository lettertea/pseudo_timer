import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import msToTime from "../msToTime";
import {bindActionCreators} from "redux";
import {addTime, updateScramble} from "../actions";
import {connect} from "react-redux";

const INSPECTION_VOICES = {
  "Male": {
    eightSeconds: new Audio(require("../audio/male/eight_seconds.ogg")),
    twelveSeconds: new Audio(require("../audio/male/twelve_seconds.ogg")),
    inspecting: new Audio(require("../audio/male/inspecting.ogg"))
  }, "Female": {
    eightSeconds: new Audio(require("../audio/female/eight_seconds.ogg")),
    twelveSeconds: new Audio(require("../audio/female/twelve_seconds.ogg")),
    inspecting: new Audio(require("../audio/female/inspecting.ogg"))
  }
}

class Stopwatch extends Component {
  state = {
    runningTime: 0,
    isInspecting: false,
    inspectionTime: 15
  };

  isHoldingSpaceAtStop = false;
  isTiming = false;
  timer;
  inspectionCountdown;
  displayedTimeRef = React.createRef();

  componentDidMount() {
    document.body.onkeyup = this.handleOnKeyUp;
    document.body.onkeypress = this.handleKeyDown;
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.isInspecting) {
      if (this.props.settings.inspection.eightSeconds && prevState.inspectionTime === 8) {
        INSPECTION_VOICES[this.props.settings.judgeGender].eightSeconds.play();
      } else if (this.props.settings.inspection.twelveSeconds && prevState.inspectionTime === 4) {
        INSPECTION_VOICES[this.props.settings.judgeGender].twelveSeconds.play();
      }

      if (prevState.isInspecting !== this.state.isInspecting) {
        this.inspectionCountdown = setInterval(() => {
          this.setState(pastState => ({
            inspectionTime: pastState.inspectionTime - 1
          }));
        }, 1000);
        if (this.props.settings.inspection.inspectionBegins) {
          INSPECTION_VOICES[this.props.settings.judgeGender].inspecting.play();
        }
      }
    }
  }

  handleOnKeyUp = e => {
    e.preventDefault();

    if (e.key === " ") {
      if (!this.isTiming && !this.isHoldingSpaceAtStop) {
        if (this.state.isInspecting || !this.props.settings.inspection.useInspection) {
          const startTime = Date.now();
          this.timer = setInterval(() => {
            this.setState({runningTime: Date.now() - startTime});
          }, 10);

          this.isTiming = true;
          clearInterval(this.inspectionCountdown);
        }

        if (this.props.settings.inspection.useInspection) {
          this.setState(prevState => ({
            isInspecting: !prevState.isInspecting,
            inspectionTime: 15
          }));
        }
      }
      // Prevents stopwatch from starting again after finishing
      this.isHoldingSpaceAtStop = false;
    }
  };

  handleKeyDown = e => {
    e.preventDefault();
    if (e.key === " ") {
      if (this.isTiming) {
        clearInterval(this.timer);
        this.isTiming = false;
        this.isHoldingSpaceAtStop = true;

        // addTime should be called before updateScramble as addTime uses the current scramble information

        this.props.addTime(this.state.runningTime);
        this.props.updateScramble();
      }
    }
  };

  render() {
    return (
      <div>
        <Typography
          variant={"h1"}
          color={"textPrimary"}
          ref={this.displayedTimeRef}
        >
          {this.state.isInspecting
            ? this.state.inspectionTime
            : msToTime(this.state.runningTime)}
        </Typography>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  settings: state.settings
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTime,
      updateScramble
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
