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

function Times(props) {
  const times = [];

  if (typeof props.recordedTimes !== "undefined") {
    for (let i = props.recordedTimes.length - 1; i >= 0; --i) {
      times.push(<li key={i} time={props.recordedTimes[i]} />);
    }
  }

  return <ol>{times}</ol>;
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
      <Grid item>
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
      </Grid>
      <Grid item>{shownComponent}</Grid>
    </Grid>
  );
};
