import React from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import {AutoSizer, Column, Table} from 'react-virtualized';
import {bindActionCreators} from "redux";
import {setTimes} from "../actions";
import {connect} from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 60,
    rowHeight: 60,
  };

  getRowClassName = ({index}) => {
    const {classes, onRowClick} = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({cellData, columnIndex}) => {
    const {columns, classes, rowHeight, onRowClick} = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{height: rowHeight}}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({label, columnIndex}) => {
    const {headerHeight, columns, classes} = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{height: headerHeight}}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;
    return (
      <AutoSizer>
        {({height, width}) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({dataKey, ...other}, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function Times(props) {
  const rows = [];

  if (props.times[props.wcaEvent]){
    for (let i = props.times[props.wcaEvent].length - 1; i >= 0; i--) {
      const time = props.times[props.wcaEvent][i];
      rows.push({
          ...time, solveNumber: i + 1, scramble: (
            <Tooltip title={<Typography>{time["scramble"]}</Typography>} interactive placement="top">
              <Button>Hover</Button>
            </Tooltip>)
        }
      )
    }
  }

  return (
    <Paper style={{height: 340, width: '100%'}}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({index}) => rows[index]}
        columns={[
          {
            width: 100,
            label: 'No.',
            dataKey: 'solveNumber',
            numeric: true,
          },
          {
            width: 200,
            label: 'Date',
            dataKey: "date",
          },
          {
            width: 120,
            label: 'Time',
            dataKey: 'time',
          },
          {
            width: 120,
            label: 'Average 3 of 5',
            dataKey: '3of5',
          },
          {
            width: 120,
            label: 'Average of 3',
            dataKey: 'ao3',
          },
          {
            width: 120,
            label: 'Average of 12',
            dataKey: 'ao12',
          },
          {
            width: 140,
            label: 'Scramble',
            dataKey: 'scramble',
          },
        ]}
      />
    </Paper>
  );
}


const mapStateToProps = (state) => ({
  times: state.times,
  wcaEvent: state.wcaEvent
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTimes
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Times)

