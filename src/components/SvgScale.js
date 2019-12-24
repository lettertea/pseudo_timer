import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";

const useSliderStyles = makeStyles({
  root: {
    width: 250
  },
  input: {
    width: 42
  }
});

export default function(props) {
  const classes = useSliderStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.setScaleFactor(newValue / 25);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
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