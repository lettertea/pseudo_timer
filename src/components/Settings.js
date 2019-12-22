import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const WCA_EVENTS = [
  { name: "3x3x3", tnoodleName: "333" },
  { name: "2x2x2", tnoodleName: "222" },
  { name: "4x4x4", tnoodleName: "444" },
  { name: "5x5x5", tnoodleName: "555" },
  { name: "6x6x6", tnoodleName: "666" },
  { name: "7x7x7", tnoodleName: "777" },
  { name: "3x3x3 BLD", tnoodleName: "333ni" },
  { name: "3x3x3 OH", tnoodleName: "333" },
  { name: "Clock", tnoodleName: "clock" },
  { name: "Megaminx", tnoodleName: "minx" },
  { name: "Pyraminx", tnoodleName: "pyram" },
  { name: "Skewb ", tnoodleName: "skewb" },
  { name: "Square-1", tnoodleName: "sq1" },
  { name: "4x4x4 BLD", tnoodleName: "444ni" },
  { name: "5x5x5 BLD", tnoodleName: "555ni" }
];

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  }
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState(0);

  const handleChange = event => {
    setSelectedMenu(event.target.value);
    props.setWcaEvent(WCA_EVENTS[event.target.value].tnoodleName);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          WCA Event
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedMenu}
          onChange={handleChange}
        >
          {WCA_EVENTS.map((e, i) => (
            // Use index for value instead of tnoodleName so each value is unique as 3x3x3 and 3x3x3 OH has the same value.
            <MenuItem value={i} key={i}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
