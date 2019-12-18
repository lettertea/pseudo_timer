import React, {Component} from "react";

class Stopwatch extends Component {
  state = {
    runningTime: 0
  };

  isHoldingSpaceAtStop = false;
  isTiming = false;
  timer;
  displayedTimeRef = React.createRef()

  componentDidMount() {
    document.body.onkeyup = this.handleOnKeyUp;
    document.body.onkeypress = this.handleKeyDown;
  }

  handleOnKeyUp = e => {
    if (e.key === " ") {
      if (!this.isTiming && !this.isHoldingSpaceAtStop) {
        const startTime = Date.now();
        this.timer = setInterval(() => {
          this.setState({runningTime: Date.now() - startTime});
        }, 10);

        this.isTiming = true;
      }
      // Prevents stopwatch from starting again after finishing
      this.isHoldingSpaceAtStop = false;
    }
    e.preventDefault();

  }


  handleKeyDown = (e) => {
    if (e.key === " ") {
      if (this.isTiming) {
        clearInterval(this.timer);
        this.isTiming = false;
        this.isHoldingSpaceAtStop = true;
        this.props.setRecordedTimes([this.displayedTimeRef.current.innerText, ...this.props.recordedTimes]);
      }
    }
    e.preventDefault();
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

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
        <p ref={this.displayedTimeRef}>{this.displayTime(this.state.runningTime)}</p>
      </div>
    );
  }
}

export default Stopwatch;