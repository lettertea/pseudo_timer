import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import msToTime from "../msToTime";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}


export default function Times(props) {
  const classes = useStyles();

  function createRows() {
    if (!props.recordedTimes) {
      return;
    }


    const rows = [];
    for (let i = props.recordedTimes.length - 1; i >= 0; --i) {

      const newRow = {
        date: new Date().toLocaleString("en-us"),
        time: msToTime(props.recordedTimes[i]),
        "3of5": i >= 4
          ? msToTime(props.recordedTimes.slice(i - 4, i+1).sort((a, b) => a - b)
            .slice(1, 4)
            .reduce((a, b) => a + b, 0) / 3)
          : "",
        ao3: i >= 2 ? msToTime(props.recordedTimes.slice(i - 2, i + 1).reduce((a, b) => a + b, 0) / 3) : "",
        ao12: i >= 11 ? msToTime(props.recordedTimes.slice(i - 11, i + 1).reduce((a, b) => a + b, 0) / 12) : ""
      };

      rows.push(
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell component="th" scope="row">
            {newRow.date}
          </TableCell>
          <TableCell align="right">{newRow["time"]}</TableCell>
          <TableCell align="right">{newRow["3of5"]}</TableCell>
          <TableCell align="right">{newRow["ao3"]}</TableCell>
          <TableCell align="right">{newRow["ao12"]}</TableCell>
        </TableRow>
      )
    }
    return rows;
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Average 3 of 5</TableCell>
            <TableCell align="right">Average of 3</TableCell>
            <TableCell align="right">Average of 12</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}