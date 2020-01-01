import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React from "react";

const useTimesStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    "overflow-y": "scroll",
    height: 400
  }
}));

export default function Times(props) {
  const classes = useTimesStyles();
  const times = [];

  if (typeof props.recordedTimes !== "undefined") {
    for (let i = props.recordedTimes.length - 1; i >= 0; --i) {
      times.push(<li key={i}>{props.recordedTimes[i]}</li>);
    }
  }
  if (times.length <= 0) {
    return <Typography color={"textSecondary"}>No recorded times</Typography>;
  }

  return (
    <Paper className={classes.paper}>
      <Typography>
        <ol reversed>{times}</ol>
      </Typography>
    </Paper>
  );
}
