import React, {Component} from "react";
import tts from "basic-tts";

const speaker = tts.createSpeaker({rate:1.2});

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
          this.setState((pastState) => ({inspectionTime: pastState.inspectionTime - 1}));
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
        this.setState((prevState => ({isInspecting: !prevState.isInspecting, inspectionTime: 15})));
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
        const spokenTime = this.displayedTimeRef.current.innerText;
        speaker.speak(spokenTime).then(console.log).catch(console.log)
        this.props.addRecordedTimes(this.displayedTimeRef.current.innerText);

      }
    }
  };


  displayTime(milliseconds) {
    const minutes = Math.trunc(milliseconds / 60000);
    let seconds = Math.trunc(milliseconds / 1000) % 60;
    let centiseconds = Math.trunc(milliseconds / 10) % 100;

    // Add leading zeros
    centiseconds = ("0" + centiseconds).substr(-2);
    if (minutes > 0 && seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes === 0 ? `${seconds}.${centiseconds}` : `${minutes}:${seconds}.${centiseconds}`;
  }


  render() {
    return (
      <div>
        <p
          ref={this.displayedTimeRef}>{this.state.isInspecting ? this.state.inspectionTime : this.displayTime(this.state.runningTime)}</p>
      </div>
    );
  }
}

export default Stopwatch;