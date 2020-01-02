import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const SCALE_FACTOR_UNIT = 20;

export default function (props) {
  const [value, setValue] = React.useState(props.scaleFactor * SCALE_FACTOR_UNIT);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    // newValue max value is 100, so max scale factor is (100 / x)
    props.setScaleFactor(newValue / SCALE_FACTOR_UNIT);
  };

  return (
    <div style={{width: 250}}>
      <Typography gutterBottom color={"textSecondary"}>
        SVG Scale
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
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
