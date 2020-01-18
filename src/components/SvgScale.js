import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";
import { setSvgScale } from "../actions";
import { bindActionCreators } from "redux";

const SCALE_FACTOR_UNIT = 20;

function SvgScale(props) {
  const [value, setValue] = React.useState(
    props.svgScale * SCALE_FACTOR_UNIT
  );

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    // newValue max value is 100, so max scale factor is (100 / x)
    props.setSvgScale(newValue / SCALE_FACTOR_UNIT);
  };

  return (
    <div style={{ width: 250 }}>
      <Typography gutterBottom>
        SVG Scale
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  );
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSvgScale
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(SvgScale);
