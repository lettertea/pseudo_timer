import React, { useState } from "react";
import EventOptions from "./EventOptions";
import SvgScale from "./SvgScale";
import Grid from "@material-ui/core/Grid";
import StyledPaper from "./StyledPaper";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

function Settings(props) {
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <StyledPaper>
            <EventOptions setWcaEvent={props.setWcaEvent} />
          </StyledPaper>
        </Grid>
        <Grid item xs>
          <StyledPaper>
            <SvgScale setScaleFactor={props.setScaleFactor} />
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
}

const useTimesStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    "overflow-y": "scroll",
    height:400
}
}));

function Times(props) {
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

export default props => {
  const COMPONENTS = [
    <Times recordedTimes={props.recordedTimes} />,
    <Settings
      setWcaEvent={props.setWcaEvent}
      setScaleFactor={props.setScaleFactor}
    />,
    null
  ];
  const [shownComponentIndex, setShownComponentIndex] = useState(0);
  const shownComponent = COMPONENTS[shownComponentIndex];

  return (
    <Grid container spacing={3} direction={"column"}>
        <BottomNavigation
          value={shownComponentIndex}
          onChange={(event, newValue) => {
            setShownComponentIndex(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Times"
            icon={<FormatListNumberedIcon />}
          />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
          <BottomNavigationAction label="Hidden" icon={<VisibilityOffIcon />} />
        </BottomNavigation>
      <div>{shownComponent}</div>
    </Grid>
  );
};
