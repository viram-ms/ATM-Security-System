/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import AtmDetails from "./AtmDetails.jsx";
import UpdateAtmDetails from "./UpdateAtmDetails.jsx";
import GuardDetails from "./GuardDetails.jsx";
import Snackbar from "components/Snackbar/Snackbar";
import Button from "components/CustomButtons/Button";
import AccessTime from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import AvailableSupervisor from "./AvailableSupervisor.jsx";

// global variable used to store the selected supervisors for assigning atm
const selected = [];

const styles = theme => ({
  formControl: {
    minWidth: 220,
    margin: "5px auto",
    color: "rgba(0,0,0,0.8)"
  },
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
  selectSpacing: {
    marginTop: 15,
    width: "100%",
    margin: "4px auto"
  },
  spacing: {
    marginTop: 10
  },
  buttonSpacinng: {
    justifyContent: "center"
  },
  centerSpacing: {
    margin: "auto"
  },
  iconPadding: {
    paddingLeft: 3,
    paddingRight: 3
  },
  spaceBetweenButtons: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexEndButtons: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
class TableList extends React.Component {
  state = {
    openA: false, //This is used to open  dialog to display atm details
    openB: false, //This is used to open  dialog to edit atm details
    openC: false, //This is used to open  dialog to display guard details for each atm
    openD: false, //This is used to open  dialog to edit the guard shift
    openE: false, //This is used to open  dialog to select supervisors for assignment of atm
    file: "", //used to store and upload file
    deleteSuccess: false, //This is used to open  snackbar to display message for deletion of guard shift
    assignSupervisor: false, //This is used to open  snackbar to display message for assignment of supervisor
    uploadSuccess: false, //This is used to open  snackbar to display message for upload file success
    show: false, // used to display file name
    Atms: [], // store all atm details
    singleAtm: "", // store single atm details
    guards: "", // store single guard details
    supervisors: "", // store supervisor
    availableSupervisor: [], // store available supervisor list
    selectedSupervisor: "", // store selected supervisor list
    regionHead: "", // store region head
    Shifts: "", // store shifts of individual guard
    unAssignedGuards: [], //store unassigned guards list
    selectedGuardShiftChange: "", // store the guard shift which needs to be editted
    selectedShift: "", // store selected shift
    selectedAtm: [] //store selected single atm
  };

  handleUploadClose = () => {
    this.setState({
      uploadSuccess: false
    });
  };

  handleCloseAssignSupervisor = () => {
    this.setState({
      assignSupervisor: false
    });
  };

  async componentDidMount() {
    // api call to display atm details
    try {
      var res = await fetch(`http://13.234.147.114:3000/atm/getATM`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userId: 12, location: "Central" })
      });
      var data = await res.json();
      this.setState({
        Atms: data.Atms
      });
      this.handleArray();
    } catch (e) {}
  }
  // snackbar to show message for delete guard shift

  handleCloseDelete = () => {
    this.setState({
      deleteSuccess: false
    });
  };
  handleCloseUpdate = () => {
    this.setState({
      updateSuccess: false
    });
  };

  // insert action buttons to ATMS

  handleArray = () => {
    const { classes } = this.props;
    const atmCopy = [...this.state.Atms];
    atmCopy.map(item => {
      item.actions = (
        <div>
          <Person
            color="primary"
            onClick={this.handleClickOpenA(item)}
            className={classes.iconPadding}
          />
          <Create
            color="primary"
            onClick={this.handleClickOpenB(item)}
            className={classes.iconPadding}
          />
          <AccessTime
            color="primary"
            onClick={this.handleClickOpenC(item)}
            className={classes.iconPadding}
          />
        </div>
      );
    });

    this.setState({
      Atms: atmCopy
    });
  };

  // add action buttons to dialog to handleShifts
  handleArrayShifts = () => {
    const ShiftCopy = [...this.state.Shifts];
    ShiftCopy.map(item => {
      item.Actions = (
        <div>
          <Delete color="primary" onClick={this.handleDeleteShift(item)} />
          <Create color="primary" onClick={this.handleUpdateShift(item)} />
        </div>
      );
    });

    this.setState({
      Shifts: ShiftCopy
    });
  };
  // Dialog to display single atm details
  handleClickOpenA = singleAtm => async event => {
    event.preventDefault();

    try {
      var res = await fetch("http://13.234.147.114:3000/atm/getSingleATM", {
        method: "POST",
        body: JSON.stringify({
          UserID: 1,
          ATMID: singleAtm.ATMID
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (res.status === 200) {
        this.setState({
          singleAtm: data.ATMs[0],
          guards: data.guards,
          supervisors: data.supervisors,
          regionHead: data.rh
        });
      }

      this.setState({
        openA: true
      });
    } catch (e) {}
  };

  // api call to update single atm details
  handleClickOpenB = singleAtm => async event => {
    event.preventDefault();

    try {
      var res = await fetch("http://13.234.147.114:3000/atm/getSingleATM", {
        method: "POST",
        body: JSON.stringify({
          UserID: 1,
          ATMID: singleAtm.ATMID
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (res.status === 200) {
        this.setState({
          singleAtm: data.ATMs[0]
        });
      }
    } catch (e) {}

    this.setState({
      openB: true
    });
  };

  // api call to handle guard shifts for single atm
  handleClickOpenC = singleAtm => async event => {
    event.preventDefault();
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/getSingleATM", {
        method: "POST",
        body: JSON.stringify({
          UserID: 1,
          ATMID: singleAtm.ATMID
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (res.status === 200) {
        this.setState({
          singleAtm: data.ATMs[0],
          Shifts: data.ATMs[0].Shifts
        });
      }

      this.setState({
        openC: true
      });
      this.handleArrayShifts();
    } catch (e) {}
  };

  handleClickOpenD = () => {
    this.setState({
      openC: false,
      openD: true
    });
  };

  // api call to fetch available supervisors
  handleClickOpenE = async () => {
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/assignList", {
        method: "POST",
        body: JSON.stringify({
          UserID: 1,
          RoleID: "SU"
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          availableSupervisor: data.Supervisors
        });
      }
      this.setState({
        openE: true
      });
    } catch (e) {}
  };

  // api call to assign supervisors to selected atms
  handleAssignSupervisor = async () => {
    console.log(selected);
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/assignSuperVisor", {
        method: "POST",
        body: JSON.stringify({
          ATMList: selected,
          ShiftName: this.state.selectedSupervisor.SupName,
          SupervisorId: this.state.selectedSupervisor.SupId
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      selected.splice(0, selected.length);
      if (data.status === 200) {
        this.setState({
          message: data.message,
          assignSupervisor: true
        });
      } else {
        this.setState({
          message: data.message,
          assignSupervisor: true
        });
      }
    } catch (e) {
      this.setState({
        message: data.message,
        assignSupervisor: true
      });
    }
  };

  // handle selected atms and add them to globally defined selected variable
  handleSelection = ATMS => {
    // return ATMS;
    var data = [];

    data.push(ATMS);
    data.map(item =>
      item.map(item2 => selected.push(this.state.Atms[item2.index]))
    );
    return selected;
  };

  // handler to store values in state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // handler to close dialog A
  handleCloseA = () => {
    this.setState({ openA: false });
  };

  // handler to close dialog B
  handleCloseB = () => {
    this.setState({ openB: false });
  };

  // handler to close dialog C
  handleCloseC = () => {
    this.setState({ openC: false });
  };

  // handler to close dialog D
  handleCloseD = () => {
    this.setState({ openD: false });
  };

  // handler to close dialog E
  handleCloseE = () => {
    this.setState({ openE: false });
  };

  // api call to delete guard shift
  handleDeleteShift = Shift => async event => {
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/deleteGuardShift", {
        method: "POST",
        body: JSON.stringify({
          shiftId: Shift.ShiftId
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          deleteSuccess: true,
          message: data.message,
          openC: false
        });
      } else {
        this.setState({
          deleteSuccess: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        deleteSuccess: true,
        message: "Error Occured"
      });
    }
  };
  // api call to fetch data for update guard shift
  handleUpdateShift = Shift => async event => {
    try {
      var res = await fetch(
        "http://13.234.147.114:3000/user/getUnassignedGuards",
        {
          method: "POST",
          body: JSON.stringify({
            atmId: this.state.singleAtm.ATMID,
            masterShiftName: Shift.ShiftName
          }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": ` ${localStorage.getItem("token")}`
          }
        }
      );
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          openD: true,
          openC: false,
          unAssignedGuards: data.users,
          selectedShift: Shift
        });
      } else {
        this.setState({
          openC: true
        });
      }
    } catch (e) {}
  };

  // api call to submit and update guard shift
  handleShiftSuccess = async event => {
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/updateGuardShift", {
        method: "POST",
        body: JSON.stringify({
          ShiftId: this.state.selectedShift.ShiftId,
          GuardID: this.state.selectedGuardShiftChange.userId
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          openD: false,
          updateSuccess: true,
          message: data.message
        });
      } else {
        this.setState({
          updateSuccess: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        updateSuccess: true,
        message: "Error Occured"
      });
    }
  };

  handleUploadFile = async event => {
    console.log("hi");
    this.setState({
      file: event.target.files[0],
      show: true
    });
  };

  fileUpload = async file => {
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    console.log(data);
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/bulkCreateAtm", {
        method: "POST",
        headers: {
          "x-access-token": `${localStorage.getItem("token")}`
        },
        body: data
      });
      console.log(res);
      const data1 = await res.json();
      console.log(data1);
      if (data1.status === 200) {
        this.setState({
          message: data1.message,
          uploadSuccess: true
        });
      } else {
        this.setState({
          message: data1.message,
          uploadSuccess: true
        });
      }
    } catch (e) {
      this.setState({
        message: "Error Occured",
        uploadSuccess: true
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("hey");
    this.fileUpload(this.state.file);
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000",
            paddingLeft: "6px",
            paddingRight: "3px"
          }
        },
        MuiTableCell: {
          root: {
            padding: "5px"
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
    const columns = [
      {label:'Company Name', name: 'CompanyName'},
      {label:'ATM ID', name: 'ATMID'},
      {label:'Bank Name', name: 'BankName'},
      {label:'State', name: 'State'},
      {label:'City', name: 'City'},
      {label:'Location', name: 'Location'},
      {label:'Supervisor Name', name: 'supervisorName'},
      {label:'Falling Under', name: 'Falling Under'},
      {label:'Type Of Shift', name: 'Type Of Shift'},


      // "CompanyName",
      // "ATMID",
      // "BankName",
      // "State",
      // "City",
      // "Location",
      // "supervisorName",
      // "Falling Under",
      // "Type Of Shift",
      "Overall Status",
      {
        name: "actions",
        options: {
          download: false
        }
      }
    ];
    const data = [...this.state.Atms];
    const options = {
      print: false,
      filterType: "dropdown",
      responsive: "scroll",
      onRowsDelete: () => {
        return false;
      },
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        this.handleSelection(currentRowsSelected);
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        // return displayData;
        <p />
      ),
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowMeta);
      },
      onDownload: (buildHead, buildBody, columns, data) =>
        buildHead(columns) +
        buildBody(
          data.concat({
            index: data.length,
            data: columns
          })
        )
    };

    const {
      singleAtm,
      guards,
      supervisors,
      regionHead,
      Shifts,
      unAssignedGuards,
      selectedGuardShiftChange,
      deleteSuccess,
      updateSuccess,
      message,
      availableSupervisor,
      selectedSupervisor,
      assignSupervisor,
      uploadSuccess
    } = this.state;

    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"ATM Management"}
          data={data}
          columns={columns}
          options={options}
        />

        <AtmDetails
          handleCloseA={this.handleCloseA}
          openA={this.state.openA}
          singleAtm={singleAtm}
          guards={guards}
          supervisors={supervisors}
          regionHead={regionHead}
        />

        {this.state.openB && (
          <UpdateAtmDetails
            openB={this.state.openB}
            singleAtm={singleAtm}
            handleCloseB={this.handleCloseB}
          />
        )}

        <GuardDetails
          openC={this.state.openC}
          handleCloseC={this.handleCloseC}
          Shifts={Shifts}
          singleAtm={singleAtm}
          openD={this.state.openD}
          handleCloseD={this.handleCloseD}
          selectedGuardShiftChange={selectedGuardShiftChange}
          handleChange={this.handleChange}
          unAssignedGuards={unAssignedGuards}
          handleShiftSuccess={this.handleShiftSuccess}
        />

        <AvailableSupervisor
          openE={this.state.openE}
          handleCloseE={this.handleCloseE}
          handleChange={this.handleChange}
          selectedSupervisor={selectedSupervisor}
          availableSupervisor={availableSupervisor}
          handleAssignSupervisor={this.handleAssignSupervisor}
        />
        <div className={classes.spaceBetweenButtons}>
          <Button
            onClick={this.handleClickOpenE}
            color="info"
            variant="contained"
            className={classes.spacing}
          >
            Get available Supervisor list
          </Button>

          <Button
            color="rose"
            className={classes.spacing}
            style={{ justifyContent: "flex-end" }}
          >
            Download Template
          </Button>
        </div>

        <div className={classes.flexEndButtons}>
          <form onSubmit={this.handleSubmit}>
            <input
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={this.handleUploadFile}
            />
            <label htmlFor="raised-button-file">
              <Button
                // variant="raised"
                component="span"
                className={classes.spacing}
                color="info"
              >
                Upload Bulk User
              </Button>
            </label>

            {/* <br /> */}
            <Button color="primary" type="submit" className={classes.spacing}>
              Submit
            </Button>

            {this.state.show && (
              <span className={classes.spacing}>
                <Typography>{this.state.file.name}</Typography>
              </span>
            )}
          </form>
        </div>

        <Snackbar
          open={uploadSuccess}
          handleClose={this.handleUploadClose}
          message={message}
        />

        <Snackbar
          open={deleteSuccess}
          handleClose={this.handleCloseDelete}
          message={message}
        />

        <Snackbar
          open={updateSuccess}
          handleClose={this.handleCloseUpdate}
          message={message}
        />

        <Snackbar
          open={assignSupervisor}
          handleClose={this.handleCloseAssignSupervisor}
          message={message}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(TableList);
