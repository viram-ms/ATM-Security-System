import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Leaflet from "./Leaflet";
import AlarmOff from '@material-ui/icons/AlarmOff';
import AttachMoney from '@material-ui/icons/AttachMoney';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

// const dashboardStyle = theme => ({
//   maps: {
//     padding: 20,
//     [theme.breakpoints.down("md")]: {
//       padding: 0,
//       // margin: 'auto'
//     }
//   }
// })

class Dashboard extends React.Component {
  state = {
    data: {}
  };

  async componentDidMount() {
    // api call to fetch details in dashboard
    var res = await fetch("http://13.234.147.114:3000/user/getDashboardData", {
      method: "POST",
      headers: {
        "x-access-token": `${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
    var data = await res.json();
    this.setState({
      data
    });
  }
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    // eslint-disable-next-line no-console
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  {/* <Icon>content_copy</Icon> */}
                  <AttachMoney />
                </CardIcon>
                <p className={classes.cardCategory}>Unassigned ATM</p>
                <h3 className={classes.cardTitle}>{data.UnassignedAtms} </h3>
              </CardHeader>
              <CardFooter stats>
                {/* <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    See More
                  </a>
                </div> */}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <ErrorOutline />
                </CardIcon>
                <p className={classes.cardCategory}>Partial ATM</p>
                <h3 className={classes.cardTitle}>{data.PartialAtms}</h3>
              </CardHeader>
              <CardFooter stats>
                {/* <div className={classes.stats}>
                  <DateRange />
                  See More
                </div> */}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                <AlarmOff />
                </CardIcon>
                <p className={classes.cardCategory}>Open Issues</p>
                <h3 className={classes.cardTitle}>{data.MissedAlarms}</h3>
              </CardHeader>
              <CardFooter stats>
                {/* <div className={classes.stats}>
                  <LocalOffer />
                  See More
                </div> */}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <div className={classes.maps}>
        <h5 style={{marginTop: '-15px'}}> Site Locations</h5>
        {/* display map */}
        <Leaflet />
        </div>
       
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
