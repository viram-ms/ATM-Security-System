/* eslint-disable react/prop-types */
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Guard from "../../../src/assets/img/guardFinal.png";
import Supervisor from "../../../src/assets/img/supervisorFinal.png";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const styles = {
  wrapper: {
    justifyContent: "center",
    margin: "auto",
    backgroundColor: "#er23dr"
  },
  icon: {
    width: 60,
    // margin: "20px",
    // padding: 10,
    border: "1px solid transparent"
    // borderRadius: 5
  }
};

class Selection extends Component {
  state = {
    table1: "red",
    table2: "white"
  };

  render() {
    const { classes, handleChangeTable } = this.props;
    return (
      <div>
        <GridContainer style={{ marginBottom: 20 }}>
          <GridItem
            xs={12}
            sm={6}
            md={6}
            className={classes.wrapper}
            style={{ padding: 10 }}
          >
            <div
              onClick={handleChangeTable("guard")}
              style={{
                textAlign: "center",
                backgroundColor: this.props.table1,
                float: "right",
                display: "block",
                padding: 10,
                borderRadius: 5,
                width: 80
              }}
            >
              <img src={Guard} alt="guard" className={classes.icon} />
              <br />
              <span style={{ color: this.props.text1 }}>Guards</span>
            </div>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} className={classes.wrapper}>
            <div
              onClick={handleChangeTable("supervisor")}
              style={{
                textAlign: "center",
                backgroundColor: this.props.table2,
                float: "left",
                padding: 10,
                borderRadius: 5
              }}
            >
              <img src={Supervisor} alt="guard" className={classes.icon} />
              <br />
              <span style={{ color: this.props.text2 }}>Supervisors</span>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Selection);
