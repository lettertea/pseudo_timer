import {connect} from "react-redux";
import React, {useEffect, useRef} from "react";
import StyledPaper from "./StyledPaper";

function Svg(props) {

  let svgRef = useRef();

  useEffect(() => {
    if (window.puzzles && props.scramble !== "Loading Scramble...") {
      let parsedWcaEvent = props.settings.wcaEvent === "333oh" ? "333" : props.settings.wcaEvent;
      svgRef.current.innerHTML = window.toSVG(props.scramble, window.puzzles[parsedWcaEvent])
    }
  }, [props.scramble])

  // marginTop at 56px to match the height of the BottomNav header
  return (
    <StyledPaper
      height={340}
      style={{
        marginTop: "56px"
      }}
    >
      <div
        style={{
          transform: `scale(${props.settings.svgScale})`,
          transformOrigin: "center center"
        }}
        ref={svgRef}
      />
    </StyledPaper>
  )
}

export default connect((state) => ({
  scramble: state.scramble,
  settings: state.settings
}))(Svg);