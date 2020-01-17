import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { bindActionCreators } from "redux";
import { setInspection, setJudgeGender } from "../actions";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

const INITIAL_STATE = {
  useInspection: true,
  eightSeconds: true,
  twelveSeconds: true,
  inspectionBegins: false
};

const USE_INSPECTION = "useInspection";

const EIGHT_SECONDS = "eightSeconds";
const TWELVE_SECONDS = "twelveSeconds";
const INSPECTION_BEGINS = "inspectionBegins";

function Inspection(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleChange = name => event => {
    if (name === USE_INSPECTION) {
      if (event.target.checked) {
        props.setInspection(INITIAL_STATE);
      } else {
        props.setInspection({
          useInspection: false,
          eightSeconds: false,
          twelveSeconds: false,
          inspectionBegins: false
        });
      }
    } else {
      const inspectionOptions = {
        ...props.inspection,
        useInspection: undefined,
        [name]: event.target.checked
      };
      // Enables or disables useInspection depending on the options
      inspectionOptions.useInspection = Object.values(
        inspectionOptions
      ).includes(true);

      props.setInspection(inspectionOptions);
    }
  };

  const handleChecked = name => {
    return props.inspection[name];
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={handleChecked(USE_INSPECTION)}
                onChange={handleChange(USE_INSPECTION)}
                color="primary"
                value={USE_INSPECTION}
              />
            }
            label="Use Inspection"
          />

          <FormControl component="fieldset" className={classes.formControl} style={{minWidth: 100}}>
            <InputLabel>Voice Type</InputLabel>
            <Select
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={props.judgeGender}
            onChange={e => {props.setJudgeGender(e.target.value)}}
          >
            {["Male", "Female"].map((e, i) => (
              <MenuItem value={e} key={i}>
                {e}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={handleChecked(EIGHT_SECONDS)}
                onChange={handleChange(EIGHT_SECONDS)}
                value={EIGHT_SECONDS}
              />
            }
            label='Call "Eight Seconds"'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={handleChecked(TWELVE_SECONDS)}
                onChange={handleChange(TWELVE_SECONDS)}
                value={TWELVE_SECONDS}
              />
            }
            label='Call "Twelve Seconds"'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={handleChecked(INSPECTION_BEGINS)}
                onChange={handleChange(INSPECTION_BEGINS)}
                value={INSPECTION_BEGINS}
              />
            }
            label='Call "Inspecting" when starting inspection'
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setInspection,
      setJudgeGender
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(Inspection);
