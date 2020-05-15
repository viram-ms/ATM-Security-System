/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";
import Snackbar from "components/Snackbar/Snackbar";
import MUIDataTable from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const styles = theme => ({
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
    color: "rgba(0,0,0,0.8)"
  },
  selectSpacing: {
    width: "100%",
    margin: "4px auto"
  },
  floatingLabelFocusStyle: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 16
  },
  labelSpacing: {
    textAlign: "center",
    marginBottom: 25,
    marginTop: 25
  },
  buttonSpacinng: {
    justifyContent: "center"
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
  spacing: {
    textAlign: "center",
    marginBottom: "6px"
  },
  contactIcon: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 28,
    marginRight: 16,
    marginTop: 10
  },
  contactSpacing: {
    marginBottom: "16px"
  },
  header: {
    color: "rgba(0,0,0,0.8)",
    margin: "4px 0px",
    fontSize: "16px"
  },
  contact: {
    color: "rgba(0,0,0,0.8)",
    margin: "4px 0px",
    fontSize: "22px"
  },
  centerSpacing: {
    margin: "auto"
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

class Guards extends Component {
  state = {
    name: "",
    open: false,
    area: "Central",
    mobile: "",
    addGuard: "",
    message: "",
    file: "",
    show: false,
    uploadSuccess: false
  };
  // handler to close snackbar for upload file
  handleUploadClose = () => {
    this.setState({
      uploadSuccess: false
    });
  };
  // handler to store state variables
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // handler to close snackbar for guard
  handleCloseGuard = () => {
    this.setState({
      addGuard: false
    });
  };
  // handler to open dialog for new guard details
  addGuard = () => {
    this.setState({
      open: true
    });
  };

  // handler to add new guard details to system
  handleSubmitGuard = async () => {
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
          roleId: "GU",
          location: this.state.area
        })
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          addGuard: true,
          message: data.message
        });
      } else {
        this.setState({
          addGuard: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        addGuard: true,
        message: "Error Occured"
      });
    }
  };

  // these functions are used to upload file
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
    try {
      var res = await fetch("http://13.234.147.114:3000/user/bulkUserUp", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
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
          message: data1.error,
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

  // handler to close dialog for new guard details
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
      guards,
      openA,
      openB,
      singleGuard,
      mobile,
      name,
      area,
      handleCloseA,
      handleCloseB,
      handleSubmit,
      handleChange
    } = this.props;
    const { open, addGuard, message, uploadSuccess } = this.state;

    const data = [...guards];

    const columns = [
      { label: "Name", name: "GuardName" },
      { label: "Number", name: "GuardNumber" },
      { label: "Falling Under Area", name: "Falling Under Area" },
      { label: "Battery", name: "Battery" },
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
        <p>icon</p>
      ),
      renderExpandableRow: (rowData, rowMeta) => {
        console.log(rowMeta);
      }
    };
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"Guards Data"}
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog
          open={openA}
          onClose={handleCloseA}
          aria-labelledby="draggable-dialog-add-user"
        >
          <DialogTitle
            id="draggable-dialog-add-user"
            className={classes.dialogHeader}
            onClose={handleCloseA}
          >
            Guard Details
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText  className={classes.labelSpacing}>Guard Details</DialogContentText> */}

            {openA && (
              <Grid container className={classes.labelSpacing}>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Mobile Number</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.mobile}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>User Number</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.userName}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>
                    Falling Under Which Area
                  </DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.fallingUnderWhichArea}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>KYC 1</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.kyc1}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>KYC 2</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.kyc2}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Address</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.address}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Profile Pic</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleGuard.user.profilePic}
                  </DialogContentText>
                </Grid>
              </Grid>
            )}
            <DialogContentText className={classes.labelSpacing}>
              Shift Details
            </DialogContentText>
            {openA &&
              singleGuard.shifts.map(item => (
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>Shift From</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.shiftFrom}
                    </DialogContentText>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>Shift To</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.shiftTo}
                    </DialogContentText>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>Shift Name</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.shiftName}
                    </DialogContentText>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>Updated At</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.updatedAt}
                    </DialogContentText>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>Guard Name</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.guardName}
                    </DialogContentText>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                    <DialogContentText>ATM Name</DialogContentText>
                    <DialogContentText className={classes.header}>
                      {item.ATMName}
                    </DialogContentText>
                  </Grid>
                </Grid>
              ))}
          </DialogContent>
          <DialogActions className={classes.buttonSpacinng}>
            {/* <Button onClick={handleCloseA} color="primary">
              close
            </Button> */}
          </DialogActions>
        </Dialog>

        <Dialog
          open={openB}
          onClose={handleCloseB}
          aria-labelledby="draggable-dialog-add-user"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-add-user"
            className={classes.dialogHeader}
            onClose={handleCloseB}
          >
            Edit Guard <br /> <p> This action will edit guard in the system </p>
          </DialogTitle>
          <DialogContent>
            <Grid container className={classes.selectSpacing}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.centerSpacing}
              >
                <FormControl className={classes.selectSpacing}>
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.formControl}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }}
                    name="name"
                    onChange={handleChange}
                    margin="normal"
                    value={name}
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
                    onChange={handleChange}
                    margin="normal"
                    value={mobile}
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
                    value={area}
                    onChange={handleChange}
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
            <Button onClick={handleSubmit} color="info">
              Submit
            </Button>
            {/* <Button onClick={handleCloseB} color="primary">
              close
            </Button> */}
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-add-guard"
          maxWidth="xs"
        >
          <DialogTitle
            id="draggable-dialog-add-guard"
            className={classes.dialogHeader}
            onClose={this.handleClose}
          >
            Add Guard <br /> <p>This action will add guard in the system</p>
          </DialogTitle>
          <DialogContent>
            <Grid container className={classes.selectSpacing}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.centerSpacing}
              >
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
            <Button onClick={this.handleSubmitGuard} color="info">
              Submit
            </Button>
            {/* <Button onClick={this.handleClose} color="primary">
              close
            </Button> */}
          </DialogActions>
        </Dialog>
        <Snackbar
          open={addGuard}
          handleClose={this.handleCloseGuard}
          message={message}
        />
        <Snackbar
          open={uploadSuccess}
          handleClose={this.handleUploadClose}
          message={message}
        />
        <div className={classes.spaceBetweenButtons}>
        <Button color="info" onClick={this.addGuard}>
          Add Guard
        </Button>
        <Button color="rose">Download Template</Button>
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
              variant="raised"
              component="span"
              className={classes.spacing}
              color="info"
            >
              Upload Bulk User
            </Button>
          </label>
          
          <Button color="primary" className={classes.spacing} type="submit">
            Submit
          </Button>
          {this.state.show && (
            <span>
              <Typography>{this.state.file.name}</Typography>
            </span>
          )}
        </form>
        </div>
       
        
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Guards);
