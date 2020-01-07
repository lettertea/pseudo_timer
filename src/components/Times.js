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


export default function Times(props) {

  function createRows() {
    if (!props.recordedTimes) {
      return;
    }


    const rows = [];
    for (let i = props.recordedTimes.length - 1; i >= 0; --i) {
      const recordedTime = props.recordedTimes[i];
      const averages = {
        "3of5": i >= 4
          ? msToTime(props.recordedTimes.slice(i - 4, i + 1).sort((a, b) => a.time - b.time)
            .slice(1, 4)
            .reduce((a, b) => a + b.time, 0) / 3)
          : "",
        ao3: i >= 2 ? msToTime(props.recordedTimes.slice(i - 2, i + 1).reduce((a, b) => a + b.time, 0) / 3) : "",
        ao12: i >= 11 ? msToTime(props.recordedTimes.slice(i - 11, i + 1).reduce((a, b) => a + b.time, 0) / 12) : ""
      };

      rows.push(
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell component="th" scope="row">
            {recordedTime.date}
          </TableCell>
          <TableCell align="right">{msToTime(recordedTime["time"])}</TableCell>
          <TableCell align="right">{averages["3of5"]}</TableCell>
          <TableCell align="right">{averages["ao3"]}</TableCell>
          <TableCell align="right">{averages["ao12"]}</TableCell>
          <TableCell align="right">
            <Tooltip title={<Typography>{recordedTime["scramble"]}</Typography>} interactive>
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