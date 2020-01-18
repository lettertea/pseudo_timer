import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import SettingsIcon from "@material-ui/icons/Settings";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import InfoIcon from '@material-ui/icons/Info';
import Times from "./Times";
import Settings from "./Settings";
import About from "./About";


export default props => {
  const COMPONENTS = [
    <Times/>,
    <Settings/>,
    <About/>
  ];
  const [shownComponentIndex, setShownComponentIndex] = useState(0);
  const shownComponent = COMPONENTS[shownComponentIndex];

  return (
    <Grid container direction={"column"}>

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
        <BottomNavigationAction label="About" icon={<InfoIcon/>}/>
      </BottomNavigation>
      <div>{shownComponent}</div>
    </Grid>
  );
};
