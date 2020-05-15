/* eslint-disable no-console */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Selection from "./Selection";
import Guards from "./Guards";
import Supervisors from "./Supervisors";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Snackbar from "components/Snackbar/Snackbar.jsx";
const styles = {
  card: {
    width: 200,
    margin: "30px auto",
    padding: 25
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
    marginLeft: 25
  },
  buttonSpacinng: {
    justifyContent: "center"
  }
};
class UserManagement extends React.Component {
  state = {
    table1: "#ff9800",
    table2: "rgb(238, 238, 238)",
    text1: "white",
    text2: "rgba(0,0,0,0.8)",
    openA: false,
    openB: false,
    openC: false,
    openD: false,
    updateGuard: false,
    table: 1,
    supervisors: [],
    guards: [],
    singleGuard: "",
    singleSupervisor: "",
    area: "",
    supArea: "",
    name: "",
    supName: "",
    mobile: "",
    supMobile: "",
    message: ""
  };
  // set state for input and select fields
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // handler used to close snackbar 
  handleCloseUpdateGuard = () => {
    this.setState({
      updateGuard: false
    });
  };
  // handler to close dialog to show Guards details
  handleCloseA = () => {
    this.setState({
      openA: false
    });
  };
  // handler to close dialot to edit Guard details
  handleCloseB = () => {
    this.setState({
      openB: false
    });
  };
  // handler to close dialog to show Supervisor details
  handleCloseC = () => {
    this.setState({
      openC: false
    });
  };
  // handler to close dialot to edit Supervisor details
  handleCloseD = () => {
    this.setState({
      openD: false
    });
  };
  // api call to display guard and Supervisor details
  handleClickOpenA = item => async () => {
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/getSingleUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userId: item.GuardId })
      });
      var data = await res.json();
      if (data.status === 200) {
        this.setState({
          singleGuard: data
        });
      }
    } catch (e) {}
    this.setState({
      openA: true
    });
  };
  //  api call to populate data in text fields and select fields of guards
  handleClickOpenB = item => async () => {
    this.setState({
      name: item.GuardName,
      mobile: item.GuardNumber,
      area: item["Falling Under Area"],
      singleGuard: item,
      openB: true
    });
  };
  //  api call to populate data in text fields and select fields of Supervisor
  handleClickOpenC = item => async () => {
    this.setState({
      supName: item.SupName,
      supMobile: item.SupNumber,
      supArea: item["Falling Under Area"],
      singleSupervisor: item,
      openC: true
    });
  };
  // handler to display single supervisor details
  handleClickOpenD = item => async () => {
    this.setState({
      singleSupervisor: item,
      openD: true
    });
  };
  // handler to edit and submit guard details
  handleSubmit = async event => {
    event.preventDefault();
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userId: this.state.singleGuard.GuardId,
          name: this.state.name,
          mobile: this.state.mobile,
          roleId: "GU",
          location: this.state.area
        })
      });

      var data = await res.json();

      if (data.status !== 200) {
        this.setState({
          updateGuard: true,
          message: data.message
        });
      }
      if (data.status === 200) {
        this.setState({
          updateGuard: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        updateGuard: true,
        message: "Error Occured"
      });
    }
  };
  // handler to edit and submit Supervisor details
  handleSubmitSupervisor = async event => {
    event.preventDefault();
    try {
      var res = await fetch(`http://13.234.147.114:3000/user/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userId: this.state.singleSupervisor.SupId,
          name: this.state.supName,
          mobile: this.state.supMobile,
          roleId: "SU",
          location: this.state.supArea
        })
      });

      var data = await res.json();

      if (data.status !== 200) {
        this.setState({
          updateGuard: true,
          message: res.message
        });
      }
      if (data.status === 200) {
        this.setState({
          updateGuard: true,
          message: data.message
        });
      }
    } catch (e) {
      this.setState({
        updateGuard: true,
        message: "Error Occured"
      });
    }
  };
  // handler to add action buttons for Supervisor
  handleArray = () => {
    const supervisorsCopy = [...this.state.supervisors];
    supervisorsCopy.map(item => {
      item.Actions = (
        <div>
          <Person
            color="primary"
            onClick={this.handleClickOpenD(item)}
            style={{ padding: 3 }}
          />
          <Create
            color="primary"
            onClick={this.handleClickOpenC(item)}
            style={{ padding: 3 }}
          />
        </div>
      );
    });

    this.setState({
      supervisors: supervisorsCopy
    });
  };
  // handler to add action buttons for guards
  handleArrayGuards = () => {
    const guardsCopy = [...this.state.guards];
    guardsCopy.map(item => {
      item.Actions = (
        <div>
          <Person
            color="primary"
            onClick={this.handleClickOpenA(item)}
            style={{ padding: 3 }}
          />
          <Create
            color="primary"
            onClick={this.handleClickOpenB(item)}
            style={{ padding: 3 }}
          />
        </div>
      );
    });

    this.setState({
      guards: guardsCopy
    });
  };
  // api call to fetch guards and supervisors details
  async componentDidMount() {
    try {
      var res = await fetch(`http://13.234.147.114:3000/atm/assignList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ UserID: 13, RoleID: "SU" })
      });

      var data = await res.json();

      if (data.status === 200) {
        this.setState({
          supervisors: data.Supervisors
        });
      }
      this.handleArray();

      var resp = await fetch(`http://13.234.147.114:3000/atm/assignList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": ` ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ UserID: 13, RoleID: "GU" })
      });

      var data1 = await resp.json();

      if (data1.status === 200) {
        this.setState({
          guards: data1.Guards
        });
      }
      this.handleArrayGuards();
    } catch (e) {}
  }
  // handler to switch between guards and supervisors
  handleChangeTable = name => () => {
    if (name === "guard") {
      this.setState({
        table: 1,
        table1: "#ff9800",
        table2: "rgb(238, 238, 238)",
        text1: "white",
        text2: "rgba(0,0,0,0.8)"
      });
    } else {
      this.setState({
        table: 2,
        table2: "#ff9800",
        table1: "rgb(238, 238, 238)",
        text2: "white",
        text1: "rgba(0,0,0,0.8)"
      });
    }
  };

  render() {
    const {
      table,
      guards,
      supervisors,
      openA,
      openB,
      openC,
      openD,
      singleGuard,
      area,
      supArea,
      supName,
      supMobile,
      name,
      mobile,
      message,
      updateGuard,
      table1,
      table2,
      text1,
      text2,
      singleSupervisor
    } = this.state;
    return (
      <div>
        <Selection
          handleChangeTable={this.handleChangeTable}
          table={table}
          table1={table1}
          table2={table2}
          text1={text1}
          text2={text2}
        />

        {table === 1 && (
          <Guards
            guards={guards}
            openA={openA}
            openB={openB}
            name={name}
            mobile={mobile}
            area={area}
            singleGuard={singleGuard}
            handleCloseA={this.handleCloseA}
            handleCloseB={this.handleCloseB}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}

        {table === 2 && (
          <Supervisors
            supervisors={supervisors}
            openC={openC}
            handleCloseC={this.handleCloseC}
            handleCloseD={this.handleCloseD}
            handleSubmitSupervisor={this.handleSubmitSupervisor}
            supArea={supArea}
            supMobile={supMobile}
            supName={supName}
            handleChange={this.handleChange}
            singleSupervisor={singleSupervisor}
            openD={openD}
          />
        )}

        <Snackbar
          open={updateGuard}
          handleClose={this.handleCloseUpdateGuard}
          message={message}
        />
      </div>
    );
  }
}

export default withStyles(styles)(UserManagement);
