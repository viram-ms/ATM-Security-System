/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Phone from "@material-ui/icons/Phone";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
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
  spacing: {
    marginBottom: "12px"
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
  dialogHeader: {
    backgroundColor: "#b260c0",
    textAlign:'center',
    "& h6": {
      color: "white"
    },
    "& p": {
      fontSize: 14
    }
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

class AtmDetails extends React.Component {
  render() {
    const {
      handleCloseA,
      openA,
      singleAtm,
      guards,
      supervisors,
      regionHead,
      classes
    } = this.props;

    return (
      <Dialog
        open={openA}
        onClose={handleCloseA}
        aria-labelledby="draggable-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="draggable-dialog-title" className={classes.dialogHeader} onClose={handleCloseA} >
          {singleAtm.BankName}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item sx={12} sm={6} md={8}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Client</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.CompID}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>ATM ID </DialogContentText>
                  <DialogContentText className={classes.header}>
                    {" "}
                    {singleAtm.ATMID}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>State </DialogContentText>
                  <DialogContentText className={classes.header}>
                    {" "}
                    {singleAtm.State}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>City </DialogContentText>
                  <DialogContentText className={classes.header}>
                    {" "}
                    {singleAtm.City}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Lat</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.Lat}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Long</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.Long}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Site Address</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.Add}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Take Over Date</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm["Take Over Date"]}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Type Of Services</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm["Type of service"]}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Type Of Shift</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm["Type of shift"]}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>Falling Under Area </DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.City}
                  </DialogContentText>
                </Grid>

                <Grid item xs={12} sm={6} md={6} className={classes.spacing}>
                  <DialogContentText>overAllStatus</DialogContentText>
                  <DialogContentText className={classes.header}>
                    {singleAtm.overAllStatus}
                  </DialogContentText>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Grid item xs={12} sm={12} className={classes.contactSpacing}>
                <DialogContentText className={classes.contact}>
                  <Phone className={classes.contactIcon} />
                  Contacts
                </DialogContentText>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.contactSpacing}>
                <DialogContentText>Guards </DialogContentText>
                {guards.length === 0 && (
                  <DialogContentText className={classes.header}>
                    No Guards{" "}
                  </DialogContentText>
                )}
                {guards.length > 0 &&
                  guards.map(guard => (
                    <DialogContentText className={classes.header}>
                      {guard.name} : {guard.mobile}{" "}
                    </DialogContentText>
                  ))}
              </Grid>
              <Grid item xs={12} sm={12} className={classes.contactSpacing}>
                <DialogContentText>Supervisors </DialogContentText>
                {supervisors.length === 0 && (
                  <DialogContentText className={classes.header}>
                    No Supervisors{" "}
                  </DialogContentText>
                )}
                {supervisors.length > 0 &&
                  supervisors.map(supervisor => (
                    <DialogContentText className={classes.header}>
                      {supervisor.name} : {supervisor.mobile}
                    </DialogContentText>
                  ))}
              </Grid>
              <Grid item xs={12} sm={12} className={classes.contactSpacing}>
                <DialogContentText>Region Head </DialogContentText>
                {regionHead.length === 0 && (
                  <DialogContentText className={classes.header}>
                    No Region Head{" "}
                  </DialogContentText>
                )}
                {regionHead.length > 0 &&
                  regionHead.map(regionHead => (
                    <DialogContentText className={classes.header}>
                      {regionHead.name} : {regionHead.mobile}
                    </DialogContentText>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>

        {/* <DialogActions>
          <Button
            onClick={handleCloseA}
            color="primary"
            style={{ margin: "auto" }}
          >
            close
          </Button>
        </DialogActions> */}
      </Dialog>
    );
  }
}

export default withStyles(styles)(AtmDetails);
