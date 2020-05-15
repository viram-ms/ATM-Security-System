import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
    padding: 3
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
class AvailableSupervisor extends React.Component {
  render() {
    const {
      classes,
      openE,
      handleCloseE,
      handleChange,
      selectedSupervisor,
      availableSupervisor,
      handleAssignSupervisor
    } = this.props;
    return (
      <Dialog
        open={openE}
        onClose={handleCloseE}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle
          id="draggable-dialog-title"
          className={classes.dialogHeader}
          onClose={handleCloseE}
        >
          Assign Supervisor
          <br />
          <p>
            This action will Assign The Selected ATMS to a single Supervisor
          </p>
        </DialogTitle>
        <DialogContent className={classes.centerSpacing}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="time">Available Supervisors</InputLabel>
                <Select
                  className={classes.formControl}
                  value={selectedSupervisor}
                  onChange={handleChange}
                  inputProps={{
                    name: "selectedSupervisor",
                    id: "time"
                  }}
                >
                  <MenuItem>Available Supervisors</MenuItem>
                  {availableSupervisor.length > 0 &&
                    availableSupervisor.map(item => (
                      <MenuItem value={item}>{item.SupName}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.buttonSpacinng}>
          <Button onClick={handleAssignSupervisor} color="info">
            Submit
          </Button>
          {/* <Button onClick={handleCloseE} color="primary">
            close
          </Button> */}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AvailableSupervisor);
