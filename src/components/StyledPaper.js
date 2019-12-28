import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: 100,
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  }
}));

export default props => {
  const classes = useStyles();
  return <Paper className={classes.paper}>{props.children}</Paper>;
};
