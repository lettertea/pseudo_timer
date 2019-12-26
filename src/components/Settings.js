import React from "react";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: 100,
    color: theme.palette.text.secondary,
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  paperContents: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <EventOptions
              setWcaEvent={props.setWcaEvent}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <SvgScale setScaleFactor={props.setScaleFactor} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
