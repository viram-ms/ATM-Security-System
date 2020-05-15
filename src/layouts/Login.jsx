/* eslint-disable no-console */
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Redirect } from "react-router-dom";
import Mobile from "./Mobile.jsx";
import OtpComponent from "./Otp.jsx";
import BackGround from "../assets/img/login.jpg";
import Snackbar from "components/Snackbar/Snackbar.jsx";
const styles = {
  backgroundImage: {
    position: "absolute",
    opacity: 1,
    width: '100%',
    height: '100vh',
    '& :before': {
    background: 'rgba(0,0,0,0.5)'

    }
  },
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
  },
  textField: {
    maxWidth: 600,
    margin: "auto"
  },
  wrapper: {
  }
};

class Login extends Component {
  state = {
    otp: "",
    MobNo: "",
    loggedIn: false,
    message: "",
    mobileEnterOpen: false,
    showOtp: false,
    showMobile: true,
    otpEnterOpen: false
  };

  handleCloseOtp = () => {
    this.setState({
      otpEnterOpen: false
    });
  };

  handleClose = () => {
    this.setState({
      mobileEnterOpen: false
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // submit mobile number

  handleSubmit = async event => {
    event.preventDefault();
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/getOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ MobNo: this.state.MobNo })
      });
      console.log(res);
      var data = await res.json();
      console.log(data);
      if (data.status !== 200) {
        this.setState({
          message: data.message,
          mobileEnterOpen: true
        });
      }
      if (data.status === 200) {
        this.setState({
          message: data.message,
          mobileEnterOpen: true,
          showOtp: true,
          showMobile: false
        });
      }
    } catch (e) {
      this.setState({
        message: "Error Occured",
        mobileEnterOpen: true
      });
    }
  };

  // submit otp

  handleOtp = async (event) => {
    event.preventDefault();
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/validateOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ MobNo: this.state.MobNo, OTP: this.state.otp })
      });
      var data = await res.json();
      if (
        data.status === 200 &&
        (data.user.roleId === "GU" || data.user.roleId === "SU")
      ) {
        this.setState({
          otpEnterOpen: true,
          message: data.message,
          showOtp: true
        });
      }
      if (data.status === 200 && data.user.roleId === "HD") {
        localStorage.setItem("token", data.user.token);
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          showOtp: true,
          otpEnterOpen: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        otpEnterOpen: true,
        message: "Error Occured"
      });
    }
  };

  render() {
    const {
      loggedIn,
      mobileEnterOpen,
      showOtp,
      showMobile,
      message,
      MobNo,
      Otp,
      otpEnterOpen
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <img
          src={BackGround}
          alt="background"
          className={classes.backgroundImage}
        />
        {/* enter mobile number */}
        {showMobile &&
        <Mobile
          handleChange={this.handleChange}
          MobNo={MobNo}
          handleSubmit={this.handleSubmit}
        />
        }
        {/* render otp card only once the mobile number is send successfully */}
        {showOtp && (
          <OtpComponent
            handleChange={this.handleChange}
            Otp={Otp}
            handleOtp={this.handleOtp}
          />
        )}
        {/* redirect to dashboard after the otp is verified */}
        {loggedIn && <Redirect to="/admin/dashboard" />}
        <Snackbar
          open={mobileEnterOpen}
          handleClose={this.handleClose}
          message={message}
        />
        {/* display messages */}
        <Snackbar
          open={otpEnterOpen}
          handleClose={this.handleCloseOtp}
          message="access not allowed"
        />
      </div>
    );
  }
}
export default withStyles(styles)(Login);
