/* eslint-disable no-console */
import React, { Component } from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import avatar from "assets/img/faces/marc.jpg";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
// import Snackbar from "components/Snackbar/Snackbar.jsx";
import Snackbar from "@material-ui/core/Snackbar";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  state = {
    otp: "",
    MobNo: "",
    loggedIn: false,
    message: "",
    mobileEnterOpen: true
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(JSON.stringify({ MobNo: this.state.MobNo }));
    // const formData = new FormData();
    // formData.append("viram", "shah");
    // formData.append("MobNo", this.state.MobNo);
    // console.log(formData);
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/getOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ MobNo: this.state.MobNo })
      });
      
      var data = await res.json();
      
      
    } catch (e) {
      
    }
  };

  handleOtp = async () => {
    // event.preventDefault();
    
    

    var res = await fetch(`http://13.234.147.114:3000/user/validateOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ MobNo: this.state.MobNo, OTP: this.state.otp })
    });
    
    var data = await res.json();
    
    if (data.status === 200 && data.user.roleId === "HD") {
      const token = data.user.token;
      localStorage.setItem(token, "token");
      this.setState({
        loggedIn: true
      });
    }
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { loggedIn } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="standard-name"
                      label="Enter Mobile Number"
                      className={classes.textField}
                      name="MobNo"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.MobNo}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="standard-name"
                      label="Enter Otp"
                      className={classes.textField}
                      name="otp"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.otp}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit}>
                  Update Profile
                </Button>
                <Button color="primary" onClick={this.handleOtp}>
                  Submit OTP
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {loggedIn && (
          <Redirect
            to={{
              pathname: "/admin/dashboard",
              state: { loggedIn: true }
            }}
          />
        )}
      
      
      </div>
    );
  }
}
export default withStyles(styles)(UserProfile);
