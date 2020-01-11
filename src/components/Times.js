import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import msToTime from "../msToTime";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";


function Times(props) {

  const eventTimes = props.times[props.wcaEvent];

  function createRows() {
    if (!eventTimes) {
      return;
    }

    const rows = [];
    for (let i = eventTimes.length - 1; i >= 0; --i) {
      const time = eventTimes[i];
      const averages = {
        "3of5": i >= 4
          ? msToTime(eventTimes.slice(i - 4, i + 1).sort((a, b) => a.time - b.time)
            .slice(1, 4).reduce((a, b) => a + b.time, 0) / 3)
          : "",
        ao3: i >= 2 ? msToTime(eventTimes.slice(i - 2, i + 1).reduce((a, b) => a + b.time, 0) / 3) : "",
        ao12: i >= 11 ? msToTime(eventTimes.slice(i - 11, i + 1).reduce((a, b) => a + b.time, 0) / 12) : ""
      };

      rows.push(
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell component="th" scope="row">
            {time.date}
          </TableCell>
          <TableCell align="right">{msToTime(time["time"])}</TableCell>
          <TableCell align="right">{averages["3of5"]}</TableCell>
          <TableCell align="right">{averages["ao3"]}</TableCell>
          <TableCell align="right">{averages["ao12"]}</TableCell>
          <TableCell align="right">
            <Tooltip title={<Typography>{time["scramble"]}</Typography>} interactive>
              <Button>Hover</Button>
            </Tooltip>
          </TableCell>
        </TableRow>
      )
    }
    return rows;
  }


  return (
    <TableContainer component={Paper} style={{height: 340}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Average 3 of 5</TableCell>
            <TableCell align="right">Average of 3</TableCell>
            <TableCell align="right">Average of 12</TableCell>
            <TableCell align="right">Scramble</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default connect(state => ({
  times: state.times,
  wcaEvent: state.wcaEvent
}))(Times)
