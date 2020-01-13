import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import msToTime from "../msToTime";
import {bindActionCreators} from "redux";
import {addTime, updateScramble} from "../actions";
import {connect} from "react-redux";

const eightSeconds = new Audio(require("../audio/female/eight_seconds.ogg"));
const twelveSeconds = new Audio(require("../audio/female/twelve_seconds.ogg"));
const inspecting = new Audio(require("../audio/female/inspecting.ogg"));

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
      if (prevState.inspectionTime === 8) {
        eightSeconds.play();
      } else if (prevState.inspectionTime === 4) {
        twelveSeconds.play();
      }

      if (prevState.isInspecting !== this.state.isInspecting) {
        this.inspectionCountdown = setInterval(() => {
          this.setState(pastState => ({
            inspectionTime: pastState.inspectionTime - 1
          }));
        }, 1000);
        inspecting.play();
      }
    }
  }

  handleOnKeyUp = e => {
    e.preventDefault();

    if (e.key === " ") {
      if (!this.isTiming && !this.isHoldingSpaceAtStop) {
        if (this.state.isInspecting) {
          const startTime = Date.now();
          this.timer = setInterval(() => {
            this.setState({runningTime: Date.now() - startTime});
          }, 10);

          this.isTiming = true;
          clearInterval(this.inspectionCountdown);
        }
        this.setState(prevState => ({
          isInspecting: !prevState.isInspecting,
          inspectionTime: 15
        }));
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTime,
      updateScramble
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(Stopwatch);
