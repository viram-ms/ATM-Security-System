/* eslint-disable react/prop-types */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Selection from "./Selection";
import {
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import Guard from "../../../src/assets/img/shift.jpeg";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  dialogHeader: {
    backgroundColor: "#b260c0",
    textAlign: "center",
    "& h6": {
      color: "white"
    },
    "& p": {
      fontSize: 14
    }
  },
  buttonSpacinng: {
    justifyContent: "center"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.dialogHeader}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon color="rose" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class ReportManagement extends React.Component {
  state = {
    open: false,
    showImage: false,
    table: 1,
    table1: "#ff9800",
    table2: "rgb(238, 238, 238)",
    text1: "white",
    text2: "rgba(0,0,0,0.8)"
  };

  handleOpenImage = () => {
    this.setState({
      showImage: true
    });
  };
  handleCloseImage = () => {
    this.setState({
      showImage: false
    });
  };

  handleClickOpen = () => {
    console.log("hi");
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleChangeTable = name => () => {
    if (name === "guard") {
      this.setState({
        table: 1,
        table1: "#ff9800",
        table2: "rgb(238, 238, 238)",
        text1: "white",
        text2: "rgba(0,0,0,0.8)"
      });
    } else {
      this.setState({
        table: 2,
        table2: "#ff9800",
        table1: "rgb(238, 238, 238)",
        text2: "white",
        text1: "rgba(0,0,0,0.8)"
      });
    }
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000",
            padding: "9px"
          }
        },
        MuiTableCell: {
          root: {
            padding: "16px 29px 16px 16px"
          }
        },
        MUIDataTableHeadCell: {
          data: {
            display: "block"
          }
        }
      }
    });
  render() {
    const { classes } = this.props;

    const columns = [
      { label: " ATM Name", name: "GuardName" },
      { label: "ATM ID", name: "GuardNumber" },
      { label: "Location", name: "location" },
      { label: "Shift 1 (Guard Name)", name: "Shift1" },
      { label: "Check Images", name: "checkImages" },
      { label: "Shift 2 (Guard Name)", name: "Shift2" },
      { label: "Check Images", name: "checkImages" },
    ];
    const columns2 = [
      { label: "Guard Name", name: "GuardName" },
      { label: "Guard Number", name: "GuardNumber" },
      { label: "ATM Name", name: "ATMName" },
      { label: "Location", name: "location" },
      "Action"
    ];
    const column3 = [
      { label: "Date", name: "date" },
      { label: "12pm", name: "12pm" },
      { label: "1pm", name: "1pm" },
      { label: "2pm", name: "2pm" },
      { label: "3pm", name: "3pm" },
      { label: "4pm", name: "4pm" },
      { label: "5pm", name: "5pm" },
      { label: "6pm", name: "6pm" },
      { label: "7pm", name: "7pm" },
      { label: "8pm", name: "8pm" },
      { label: "9pm", name: "9pm" },
      { label: "10pm", name: "10pm" },
      { label: "11pm", name: "11pm" }
    ];
    const data3 = [
      {
        date: "14-6-19",
        "12pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "1pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "2pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "3pm": "no",
        "4pm": "yes",
        "5pm": "no",
        "6pm": "yes",
        "7pm": "no",
        "8pm": "yes",
        "9pm": "no",
        "10pm": "yes",
        "11pm": "no"
      },
      {
        date: "15-6-19",
        "12pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "1pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "2pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "3pm": "no",
        "4pm": "yes",
        "5pm": "no",
        "6pm": "yes",
        "7pm": "no",
        "8pm": "yes",
        "9pm": "no",
        "10pm": "yes",
        "11pm": "no"
      },
      {
        date: "16-6-19",
        "12pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "1pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "2pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "3pm": "no",
        "4pm": "yes",
        "5pm": "no",
        "6pm": "yes",
        "7pm": "no",
        "8pm": "yes",
        "9pm": "no",
        "10pm": "yes",
        "11pm": "no"
      },
      {
        date: "17-6-19",
        "12pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "1pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "2pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "3pm": "no",
        "4pm": "yes",
        "5pm": "no",
        "6pm": "yes",
        "7pm": "no",
        "8pm": "yes",
        "9pm": "no",
        "10pm": "yes",
        "11pm": "no"
      },
      {
        date: "18-6-19",
        "12pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "1pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "2pm": (
          <img
            src={Guard}
            onClick={this.handleOpenImage}
            style={{ width: 100, height: 100 }}
            alt="img"
          />
        ),
        "3pm": "no",
        "4pm": "yes",
        "5pm": "no",
        "6pm": "yes",
        "7pm": "no",
        "8pm": "yes",
        "9pm": "no",
        "10pm": "yes",
        "11pm": "no"
      }
    ];
    const data = [
      {
        GuardName: "AXIS Bank",
        GuardNumber: "ATM2003",
        location: "Maharashtra",
        checkImages: (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            button
          </Button>
        ),
        Shift1: "viram",
        Shift2: "sid",
        checkImages: (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            button
          </Button>
        )
      }
    ];

    const data2 = [
      {
        GuardName: "viram",
        GuardNumber: "8879490461",
        ATMName: "AXIS Bank",
        location: "Maharashtra",
        Action: (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
          >
            button
          </Button>
        )
      }
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      search: false,
      download: false,
      filter: false,
      print: false,
      viewColumns: false,
      pagination: false,
      onRowsDelete: () => {
        return false;
      },
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        console.log(currentRowsSelected);
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        // return displayData;
        <p>icon</p>
      ),
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowMeta);
      }
    };
    const { table1, table2, table, text1, text2 } = this.state;
    return (
      <div>
        <Selection
          handleChangeTable={this.handleChangeTable}
          table={table}
          table1={table1}
          table2={table2}
          text1={text1}
          text2={text2}
        />

        {table === 1 && (
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"ATM"}
              data={data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        )}

        {table === 2 && (
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"GUARDS"}
              data={data2}
              columns={columns2}
              options={options}
            />
          </MuiThemeProvider>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-atm"
          maxWidth="lg"
        >
          <DialogTitle
            id="draggable-dialog-add-region-head"
            className={classes.dialogHeader}
            onClose={this.handleClose}
          >
            GUARD DETAILS
          </DialogTitle>
          <DialogContent style={{ marginTop: 10 }}>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={""}
                data={data3}
                columns={column3}
                options={options}
              />
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button
              onClick={this.handleClose}
              variant="contained"
              color="rose"
            >
              close
            </Button> */}
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.showImage} onClose={this.handleCloseImage}>
          <DialogContent>
            <img src={Guard} style={{ height: 400, width: 400 }} alt="img" />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ReportManagement);
