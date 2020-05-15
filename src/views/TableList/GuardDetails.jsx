/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const styles = theme =>({
  formControl: {
    minWidth: 280,
    marginBottom: 10,
    color: "rgba(0,0,0,0.8)"
  },
  dialogHeader: {
    backgroundColor: "#b260c0",
    textAlign: 'center',
    "& h6": {
      color: "white"
    },
    "& p": {
      fontSize: 14
    }
  },
  spacing: {
    margin: "auto"
  },
  gridPadding: {
    padding: 20
  },
  selectGuard: {
    marginTop: 20
  },
  floatingLabelFocusStyle: {
    color: "#fff"
  },
  buttonSpacing: {
    margin: "10px auto" 
  },
  centerSpacing: {
    margin: 'auto'
  },
  dialogPadding: {
    padding: 20
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

class GuardDetails extends React.Component {
  state = {
    Shifts: [],
    open: false,
    availableGuards: [],
    selectedGuard: "",
    selectedTime: "",
    addGuardSuccess: false,
    message: ""
  };

  // close snackbar

  handleCloseSuccess = () => {
    this.setState({
      addGuardSuccess: false
    });
  };

  // set states for selects and inputs
  handleChange = async event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "selectedTime") {
      try {
        var res = await fetch(
          "http://13.234.147.114:3000/user/getUnassignedGuards",
          {
            method: "POST",
            body: JSON.stringify({
              atmId: this.props.singleAtm.ATMID,
              masterShiftName: this.state.selectedTime
            }),
            headers: {
              "Content-Type": "application/json",
              "x-access-token": ` ${localStorage.getItem("token")}`
            }
          }
        );
        var data = await res.json();
        if (res.status === 200) {
          if (data.status !== 901) {
            this.setState({
              availableGuards: data.users
            });
          }
        }
      } catch (e) { 
      }
    }
  };

  // open dialog for edit shift

  handleUser = async () => {
    this.setState({
      open: true
    });
  };

  // close dialog for edit shift
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  // change or update guard shift for particular time

  handleSubmit = async () => {
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/assignGuard", {
        method: "POST",
        body: JSON.stringify({
          UserID: this.state.selectedGuard.UserID,
          ATMID: this.props.singleAtm.ATMID,
          MasterShiftName: this.state.selectedTime,
          GuardID: this.state.selectedGuard.userId
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          open: false,
          addGuardSuccess: true,
          message: data.message
        });
      } else {
        this.setState({
          addGuardSuccess: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        addGuardSuccess: true,
        message: "Error Occured"
      });
    }
  };

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          data: {
            display: "block"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000",
            paddingLeft: "12px",
            paddingTop: '8px'
          }
        },
        MuiTableCell: {
          root: {
            padding: "2px"
          }
        }
      }
    });
  render() {
    const columns = [
      "ShiftName",
      "DutyStart",
      "DutyEnd",
      "GuardName",
      "Actions"
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      print: false,
      download: false,
      search: false,
      filter: false,
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

    const {
      handleCloseC,
      openC,
      Shifts,
      singleAtm,
      classes,
      openD,
      handleCloseD,
      selectedGuardShiftChange,
      handleChange,
      unAssignedGuards,
      handleShiftSuccess
    } = this.props;
    const {
      open,
      selectedGuard,
      selectedTime,
      availableGuards,
      addGuardSuccess,
      message
    } = this.state;
    const data = [...Shifts];
    
    return (
      <div>
        <Dialog
          open={openC}
          onClose={handleCloseC}
          aria-labelledby="draggable-dialog-title"
          className={classes.dialogPadding}
        >
          <DialogTitle id="draggable-dialog-title" className={classes.dialogHeader} onClose={handleCloseC}>
            Update Guard Shift
          </DialogTitle>
          <DialogContent>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={`${singleAtm.ATMID} - ${singleAtm.BankName}`}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </DialogContent>

          <DialogActions className={classes.spacing}>
          {/* <Button onClick={handleCloseC} color="primary">
              close
            </Button> */}
            <Button onClick={this.handleUser} color="info">
              Add Shift
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-add-user"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-add-user"
            className={classes.dialogHeader}
            onClose={this.handleClose}
          >
            Add Guard
          </DialogTitle>
          <Grid item xs={12} sm={12} md={12} className={classes.gridPadding}>
            <FormControl>
              <InputLabel htmlFor="time">Master Shift</InputLabel>
              <Select
                className={classes.formControl}
                value={selectedTime}
                onChange={this.handleChange}
                inputProps={{
                  name: "selectedTime",
                  id: "time"
                }}
              >
                <MenuItem value="9AM TO 9PM">9AM TO 9PM</MenuItem>
                <MenuItem value="8AM TO 8PM">8AM TO 8PM</MenuItem>
                <MenuItem value="9PM TO 9AM">9PM TO 9AM</MenuItem>
                <MenuItem value="8PM TO 8AM">8PM TO 8AM</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} className={classes.dialogPadding}>
            <FormControl>
              <InputLabel htmlFor="time">Available Guards</InputLabel>
              <Select
                className={classes.formControl}
                value={selectedGuard}
                onChange={this.handleChange}
                inputProps={{
                  name: "selectedGuard",
                  id: "time"
                }}
              >
                <MenuItem>Available Guards</MenuItem>
                {availableGuards.length > 0 &&
                  availableGuards.map(item => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <DialogActions className={classes.spacing}>
            {/* <Button onClick={this.handleClose} color="primary">
              close
            </Button> */}
            <Button onClick={this.handleSubmit} color="info">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          TransitionComponent={Transition}
          keepMounted
          open={openD}
          onClose={handleCloseD}
          aria-labelledby="draggable-dialog-title4"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-title4"
            className={classes.dialogHeader}
            onClose={handleCloseD}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle
            }}
          >
            Edit Shift  <br/><p>This action will edit the shift of the atm</p> 
          </DialogTitle>
          <DialogContent className={classes.centerSpacing}>
            <FormControl className={classes.selectGuard}>
              <InputLabel htmlFor="selectedGuardShiftChange">
                Select Guard
              </InputLabel>
              <Select
                className={classes.formControl}
                value={selectedGuardShiftChange}
                onChange={handleChange}
                inputProps={{
                  name: "selectedGuardShiftChange",
                  id: "selectedGuardShiftChange"
                }}
              >
                {unAssignedGuards.map(item => (
                  <MenuItem value={item}> {item.name} </MenuItem>
                ))}
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.buttonSpacing}>
            {/* <Button onClick={handleCloseD} color="primary">
              Close
            </Button> */}
            <Button onClick={handleShiftSuccess} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={addGuardSuccess}
          handleClose={this.handleCloseSuccess}
          message={message}
        />
      </div>
    );
  }
}

export default withStyles(styles)(GuardDetails);
