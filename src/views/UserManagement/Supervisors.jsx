/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from "react";
import Button from "components/CustomButtons/Button";
import Snackbar from "components/Snackbar/Snackbar";
import MUIDataTable from "mui-datatables";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
const styles = theme =>({
  card: {
    width: 200,
    margin: "30px auto",
    padding: 25
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
  formControl: {
    minWidth: 220,
    margin: "5px auto",
    color: "rgba(0,0,0,1)"
  },
  selectSpacing: {
    width: "100%",
    margin: "4px auto"
  },
  floatingLabelFocusStyle: {
    color: "rgba(0,0,0,1)",
    fontSize: 16
    // borderBottomColor: "yellow",
    // "&:after": {
    //   borderBottomColor: "rgb(70, 197, 29)",
    //   borderWidth: "10px"
    // }
  },
  labelSpacing: {
    textAlign: "center",
    marginTop: 25
  },
  buttonSpacinng: {
    justifyContent: "center",
    marginBottom: 8
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
  header: {
    color: "rgba(0,0,0,0.8)",
    margin: "4px 0px",
    fontSize: "16px"
  },
  spacing: {
    textAlign: "center",
    marginBottom: "12px"
  },
  buttons: {
    margin: 8
  }
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

class Supervisors extends Component {
  state = {
    name: "",
    open: false,
    openRH: false,
    addSupervisor: "",
    message: "",
    area: "Central",
    mobile: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCloseSupervisor = () => {
    this.setState({
      addSupervisor: false
    });
  };

  addSupervisor = () => {
    this.setState({
      open: true
    });
  };

  addRegionHead = () => {
    this.setState({
      openRH: true
    });
  };
  handleSupervisor = async () => {
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: this.state.name,
          mobile: this.state.mobile,
          roleId: "SU",
          location: this.state.area
        })
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          addSupervisor: true,
          message: data.message
        });
      } else {
        this.setState({
          addSupervisor: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        addSupervisor: true,
        message: "Error Occured"
      });
    }
  };

  handleRegionHead = async () => {
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: this.state.name,
          mobile: this.state.mobile,
          roleId: "RH",
          location: this.state.area
        })
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          addSupervisor: true,
          message: data.message
        });
      } else {
        this.setState({
          addSupervisor: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        addSupervisor: true,
        message: "Error Occured"
      });
    }
  };

  handleCloseRh = () => {
    this.setState({ openRH: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            // backgroundColor: "#FF0000",
            padding: "10px"
          }
        }
      }
    });
  render() {
    const {
      classes,
      supervisors,
      openC,
      handleSubmitSupervisor,
      handleChange,
      handleCloseC,
      supArea,
      supMobile,
      supName,
      singleSupervisor,
      openD,
      handleCloseD
    } = this.props;
    const { open, message, addSupervisor, openRH } = this.state;

    const data = [...supervisors];

    const columns = [
      { laebl: "Supervisor Name", name: "SupName" },
      { label: "Role", name: "SupRole" },
      { label: "Number", name: "SupNumber" },
      { label: "Falling Under Area", name: "Falling Under Area" },
      { label: "Assignment Status", name: "SupAssignStatus" },
      "Actions"
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      print: false,
      onRowsDelete: () => {
        return false;
      },
      onRowsSelect: (currentRowsSelected, allRowsSelected) => {
        console.log(currentRowsSelected);
      },
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        // return displayData;
        <p />
      ),
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowMeta);
      }
    };
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"Supervisors Data"}
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog
          open={openC}
          onClose={handleCloseC}
          aria-labelledby="draggable-dialog-supervisor"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-supervisor"
            className={classes.dialogHeader}
            onClose={handleCloseC}
          >
            Edit Supervisor <br />{" "}
            <p>This action will edit supervisor in the system</p>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="supName"
                    onChange={handleChange}
                    margin="normal"
                    value={supName}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Mobile Number"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="supMobile"
                    onChange={handleChange}
                    margin="normal"
                    value={supMobile}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  {/* <InputLabel htmlFor="SupervisorArea" className={classes.labelSpacing}>Falling Under Which Area</InputLabel> */}
                  <Select
                    className={classes.formControl}
                    value={supArea}
                    onChange={handleChange}
                    inputProps={{
                      name: "supArea",
                      id: "SupervisorArea"
                    }}
                  >
                    <MenuItem value="Central">Central</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button
              onClick={handleCloseC}
              className={classes.buttons}
              color="primary"
            >
              close
            </Button> */}
            <Button
              onClick={handleSubmitSupervisor}
              className={classes.buttons}
              color="info"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-add-supervisor"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-add-supervisor"
            className={classes.dialogHeader}
            onClose={this.handleClose}
          >
            Add Supervisor <br />{" "}
            <p>This action will add supervisor in the system</p>
          </DialogTitle>
          <DialogContent>
            <Grid container className={classes.selectSpacing}>
              <Grid item xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="name"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.name}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Mobile Number"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="mobile"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.mobile}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  {/* <InputLabel htmlFor="HK" className={classes.labelSpacing}>Falling Under Which Area</InputLabel> */}
                  <Select
                    className={classes.formControl}
                    value={this.state.area}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "area",
                      id: "HK"
                    }}
                  >
                    <MenuItem value="Central">Central</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button
              onClick={this.handleClose}
              className={classes.buttons}
              color="rose"
            >
              close
            </Button> */}
            <Button
              onClick={this.handleSupervisor}
              className={classes.buttons}
              color="info"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openRH}
          onClose={this.handleCloseRh}
          aria-labelledby="draggable-dialog-add-region-head"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-add-region-head"
            className={classes.dialogHeader}
            onClose={this.handleCloseRh}
          >
            Add region-head <br />{" "}
            <p>This action will add region-head in the system</p>
          </DialogTitle>
          <DialogContent>
            <Grid container className={classes.selectSpacing}>
              <Grid item xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="name"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.name}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Mobile Number"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="mobile"
                    onChange={this.handleChange}
                    margin="normal"
                    value={this.state.mobile}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.selectSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  {/* <InputLabel htmlFor="HK" className={classes.labelSpacing}>Falling Under Which Area</InputLabel> */}
                  <Select
                    className={classes.formControl}
                    value={this.state.area}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "area",
                      id: "HK"
                    }}
                  >
                    <MenuItem value="Central">Central</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button
              onClick={this.handleCloseRh}
              className={classes.buttons}
              color="primary"
            >
              close
            </Button> */}
            <Button
              onClick={this.handleRegionHead}
              className={classes.buttons}
              color="info"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openD}
          onClose={handleCloseD}
          aria-labelledby="draggable-dialog-supervisor-details"
        >
          <DialogTitle
            id="draggable-dialog-add-region-head"
            className={classes.dialogHeader}
            onClose={handleCloseD}
          >
            Supervisor Deatils
          </DialogTitle>
          <DialogContent>
            <Grid container className={classes.labelSpacing}>
              <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                <DialogContentText>Name</DialogContentText>
                <DialogContentText className={classes.header}>
                  {singleSupervisor.SupName}
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                <DialogContentText>Mobile Number</DialogContentText>
                <DialogContentText className={classes.header}>
                  {singleSupervisor.SupNumber}
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                <DialogContentText>Supervisor ID</DialogContentText>
                <DialogContentText className={classes.header}>
                  {singleSupervisor.SupId}
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                <DialogContentText>Assignment Status</DialogContentText>
                <DialogContentText className={classes.header}>
                  {singleSupervisor.SupAssignStatus}
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                <DialogContentText>Falling Under Area</DialogContentText>
                <DialogContentText className={classes.header}>
                  {singleSupervisor["Falling Under Area"]}
                </DialogContentText>
              </Grid>
              {openD && (
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>ATM ID</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleSupervisor.ATMs.map(item => item.ATMID)}
                  </DialogContentText>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button onClick={handleCloseD} color="primary">
              close
            </Button> */}
          </DialogActions>
        </Dialog>

        <Button color="info" onClick={this.addSupervisor}>
          Add Supervisor
        </Button>
        <Button color="info" onClick={this.addRegionHead}>
          Add Region-Head
        </Button>
        <Button color="rose" style={{ float: "right" }}>
          Download Template
        </Button>
        <Snackbar
          open={addSupervisor}
          handleClose={this.handleCloseSupervisor}
          message={message}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Supervisors);
