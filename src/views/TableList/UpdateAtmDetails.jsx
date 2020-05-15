import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "components/Snackbar/Snackbar";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  formControl: {
    minWidth: 220,
    margin: "5px auto",
    color: "rgba(0,0,0,0.8)"
  },
  selectSpacing: {
    margin: "8px auto"
  },
  floatingLabelFocusStyle: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 16
  },
  styledHeader: {
    background: "black",
    "& h2": {
      color: "white"
    }
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
  buttonSpacing: {
    margin: "10px auto"
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

class UpdateAtmDetails extends React.Component {
  state = {
    company: "",
    state: "",
    city: "",
    HK: "",
    central: "",
    time: "",
    Lat: "",
    Long: "",
    Add: "",
    TakeOverDate: "",
    City: "",
    updateAtmSuccess: false
  };

  handleUpdateAtm = () => {
    this.setState({
      updateAtmSuccess: false
    });
  };

  async componentWillMount() {
    const { singleAtm } = this.props;
    await this.setState({
      Lat: singleAtm.Lat,
      Long: singleAtm.Long,
      City: singleAtm.City,
      Add: singleAtm.Add,
      TakeOverDate: singleAtm["Take Over Date"],
      company: singleAtm.CompID,
      state: singleAtm.State,
      city: singleAtm.City,
      central: singleAtm["Falling Under Area"],
      HK: singleAtm["Type of service"],
      time: singleAtm["Type of shift"]
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChangeDate = date => {
    this.setState({
      TakeOverDate: date
    });
  };

  handleSubmit = async () => {
    try {
      var res = await fetch("http://13.234.147.114:3000/atm/updateAtm", {
        method: "POST",
        body: JSON.stringify({
          UserID: 1,
          ATMID: this.props.singleAtm.ATMID,
          ATMName: this.props.singleAtm.ATMName,
          Add: this.state.Add,
          Lat: this.state.Lat,
          Lng: this.state.Long,
          BankID: this.props.singleAtm.BankID,
          CompID: this.state.company,
          LocationID: this.state.central,
          City: this.state.City,
          State: this.state.State,
          typeOfService: this.state.HK,
          typeOfShift: this.state.time,
          takeOverDate: this.state.time,
          managedFromLocation: this.state.city
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        }
      });

      var data = await res.json();

      if (data.status === 200) {
        this.setState({
          updateAtmSuccess: true,
          message: data.message
        });
      } else {
        this.setState({
          updateAtmSuccess: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        updateAtmSuccess: true,
        message: "error occured"
      });
    }
  };
  render() {
    const {
      Lat,
      company,
      HK,
      time,
      state,
      city,
      central,
      Add,
      City,
      TakeOverDate,
      Long
    } = this.state;
    const { classes, openB, handleCloseB, singleAtm } = this.props;
    const { message, updateAtmSuccess } = this.state;
    return (
      <div>
        <Dialog
          open={openB}
          onClose={handleCloseB}
          aria-labelledby="draggable-dialog-title"
          maxWidth="sm"
        >
          <DialogTitle id="draggable-dialog-title" className={classes.dialogHeader}  onClose={handleCloseB}>
            {singleAtm.BankName}
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={12} sm={12} md={6}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      <Select
                        className={classes.formControl}
                        value={company}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "company",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value="Euro">EURONET PVT LTD</MenuItem>
                        <MenuItem value="Hitachi">HITACHI PVT LTD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      <Select
                        className={classes.formControl}
                        value={state}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "state",
                          id: "state"
                        }}
                      >
                        <MenuItem value="Maharashtra">MAHARASHTRA</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      {/* <InputLabel htmlFor="city">MUMBAI</InputLabel> */}
                      <Select
                        className={classes.formControl}
                        value={city}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "city",
                          id: "city"
                        }}
                      >
                        <MenuItem value="Mumbai">MUMBAI</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      {/* <InputLabel htmlFor="central">CENTRAL</InputLabel> */}
                      <Select
                        className={classes.formControl}
                        value={central}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "central",
                          id: "central"
                        }}
                      >
                        <MenuItem value="Eastern">EASTERN</MenuItem>
                        <MenuItem value="Central">CENTRAL</MenuItem>
                        <MenuItem value="Thane">THANE</MenuItem>
                        <MenuItem value="Western">WESTERN</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      {/* <InputLabel htmlFor="time">24 Hours</InputLabel> */}
                      <Select
                        className={classes.formControl}
                        value={time}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "time",
                          id: "time"
                        }}
                      >
                        <MenuItem value="24">24 Hours</MenuItem>
                        <MenuItem value="12">12 Hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl className={classes.selectSpacing}>
                      {/* <InputLabel htmlFor="HK">HK</InputLabel> */}
                      <Select
                        className={classes.formControl}
                        value={HK}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "HK",
                          id: "HK"
                        }}
                      >
                        <MenuItem value="HK">HK</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl className={classes.selectSpacing}>
                    <TextField
                      id="standard-name"
                      label="Latitude"
                      className={classes.formControl}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle
                      }}
                      name="Lat"
                      onChange={this.handleChange}
                      margin="normal"
                      value={Lat}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl className={classes.selectSpacing}>
                    <TextField
                      id="standard-name"
                      label="Longitude"
                      className={classes.formControl}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle
                      }}
                      name="Long"
                      onChange={this.handleChange}
                      margin="normal"
                      value={Long}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl className={classes.selectSpacing}>
                    <TextField
                      id="standard-name"
                      label="Site Address"
                      className={classes.formControl}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle
                      }}
                      name="Add"
                      onChange={this.handleChange}
                      margin="normal"
                      value={Add}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl className={classes.selectSpacing}>
                    <TextField
                      id="standard-name"
                      label="Managed from location"
                      className={classes.formControl}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle
                      }}
                      name="City"
                      onChange={this.handleChange}
                      margin="normal"
                      value={City}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl className={classes.selectSpacing}>
                    {/* <TextField
                      id="standard-name"
                      label="Take over date"
                      className={classes.formControl}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle
                      }}
                      name="TakeOverDate"
                      onChange={this.handleChange}
                      margin="normal"
                      value={TakeOverDate}
                    /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        onError={console.log}
                        variant="inline"
                        ampm={false}
                        name="TakeOverDate"
                        label="Take over date"
                        value={TakeOverDate}
                        onChange={this.handleChangeDate}
                        format="yyyy/MM/dd HH:mm"
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.buttonSpacing}>
            {/* <Button onClick={handleCloseB} color="primary">
              Close
            </Button> */}
            <Button onClick={this.handleSubmit} color="info">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={updateAtmSuccess}
          handleClose={this.handleUpdateAtm}
          message={message}
        />
      </div>
    );
  }
}

export default withStyles(styles)(UpdateAtmDetails);
