import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Times from "./Times";
import Settings from "./Settings";


export default props => {
  const COMPONENTS = [
    <Times recordedTimes={props.recordedTimes}/>,
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
          icon={<FormatListNumberedIcon/>}
        />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon/>}/>
        <BottomNavigationAction label="Hidden" icon={<VisibilityOffIcon/>}/>
      </BottomNavigation>
      <div>{shownComponent}</div>
    </Grid>
  );
};
