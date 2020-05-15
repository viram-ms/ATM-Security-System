import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";
const styles = {
  cardTitleWhite: {
    textAlign: 'center'
  }
};

class Otp extends Component {
  render() {
    const { handleChange, handleOtp, Otp, classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={5}
            style={{ marginLeft: "20vh", marginTop: 25 }}
          >
            <h4 style={{ color: "white", opacity: "1!important", position: 'relative' }}>ADVAIT</h4>
          </GridItem>
        </GridContainer>

        <GridContainer
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh", marginTop: "-20vh" }}
        >
          <GridItem xs={12} sm={12} md={4} style={{ margin: "auto" }}>
            <form autoComplete="off" onSubmit={handleOtp}>
              <Card>
                <CardHeader color="rose">
                  <h3 className={classes.cardTitleWhite}>Enter OTP</h3>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="standard-name"
                        label="Enter Otp"
                        className={classes.textField}
                        name="otp"
                        onChange={handleChange}
                        margin="normal"
                        value={Otp}
                        autoFocus={true}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ margin: "auto", marginBottom: 10 }}>
                  <Button color="rose" onClick={handleOtp} type="submit">
                    Submit OTP
              </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ flexDirection: 'row-reverse' }}>
          <GridItem
            xs={5}
            sm={4}
            md={3}
            style={{ marginleft: "0vh", marginTop: '-10vh', justifyContent: 'flex-end' }}
          >
            <h5 style={{ color: "white", opacity: "1!important", position: 'relative' }}> &#169; 2019, Made with &#9829; by Phionike</h5>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Otp);
