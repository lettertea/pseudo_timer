import React, {Component} from "react";

class Stopwatch extends Component {
  state = {
    holdingSpaceAtStop: false,
    isTiming: false,
    runningTime: 0
  };

  componentDidMount() {
    document.body.onkeyup = this.handleOnKeyUp;
    document.body.onkeypress = this.handleKeyDown;
  }

  handleOnKeyUp = e => {
    if (e.key === " ") {
      if (!this.state.isTiming && !this.state.holdingSpaceAtStop) {

        const startTime = Date.now();
        this.timer = setInterval(() => {
          this.setState({runningTime: Date.now() - startTime});
        }, 10);
        
        this.setState({isTiming: true});
      }
      // Prevents stopwatch from starting again after finishing
      this.setState({holdingSpaceAtStop: false});
    }
  }


  handleKeyDown = (e) => {
    if (e.key === " ") {
      if (this.state.isTiming) {
        clearInterval(this.timer);
        this.setState({isTiming: false, holdingSpaceAtStop: true});
      }
    }

  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  displayStopwatch() {
    const seconds = Math.trunc(this.state.runningTime / 1000) % 60;
    const minutes = Math.trunc(this.state.runningTime / 60000);

    let centiseconds = Math.trunc(this.state.runningTime / 10) % 100;
    // Add leading zeros
    centiseconds = ("0" + centiseconds).substr(-2);

    return minutes === 0 ? `${seconds}.${centiseconds}` : `${minutes}:${seconds}.${centiseconds}`;
  }


  render() {
    return (
      <div onKeyUp={e => console.log(e.keyCode)}>
        <p>{this.displayStopwatch()}</p>
      </div>
    );
  }
}

export default Stopwatch;