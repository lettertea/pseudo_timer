import {connect} from "react-redux";
import React, {useEffect, useRef} from "react";
import StyledPaper from "./StyledPaper";

function Svg(props) {

  let svgRef = useRef();

  useEffect(() => {
    if (window.puzzles && props.scramble !== "Loading Scramble...") {
      svgRef.current.innerHTML = window.toSVG(props.scramble, window.puzzles[props.wcaEvent])
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
          transform: `scale(${props.svgScale})`,
          transformOrigin: "center center"
        }}
        ref={svgRef}
      />
    </StyledPaper>
  )
}

export default connect((state) => ({
  svgScale: state.svgScale,
  scramble: state.scramble,
  wcaEvent: state.wcaEvent
}))(Svg);