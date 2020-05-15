/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { Grid } from "@material-ui/core";

const data1 = [
  {
    id:1,
    first:'viram',
    last: 'shah',
    age: '20'
  },
  {
    id:2,
    first:'rashmil',
    last: 'shah1',
    age: '23'
  },
  {
    id:3,
    first:'sid',
    last: 'shah',
    age: '23'
  },
]

const data2 = [
  {
    id:1,
    first:'viram1',
    last: 'shah',
    age: '45'
  },
  {
    id:2,
    first:'rashmil1',
    last: 'shah1',
    age: '23'
  },
  {
    id:3,
    first:'sid1',
    last: 'shah',
    age: '23'
  },

]

const styles = theme => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "13px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "300",
      lineHeight: "1"
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    // '&:hover': {
    //   backgroundColor: 'white',
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '98%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function searchFor(term){
  return function(x){
    return x.first.includes(term) || x.last.includes(term) || x.age.includes(term) || !term;
  }
}

class Notifications extends React.Component {
  state={
    people: data1,
    people2: data2,
    term: '',
    selected: 'primary',
    unselected: 'inhereit',
    content: 1
  }

  handleSwitch1 = () =>{
    this.setState({
      content: 1,
      selected:'primary',
      unselected: 'inhereit'
    })
  }
  handleSwitch2 = () =>{
    this.setState({
      content: 2,
      unselected:'primary',
      selected: 'inhereit'
    })
  }
  handleChange =(event) =>{
    this.setState({
      term: [event.target.value]
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={4} sm={4} md={8} style={{paddingLeft: 10}}>
          <Button variant="contained" color={this.state.selected} onClick={this.handleSwitch1}>SOS</Button>
          <Button variant="contained" color={this.state.unselected}  onClick={this.handleSwitch2}>Notification</Button>
          </Grid>
          <Grid item xs={4} sm={4} md={4} style={{paddingRight: 10}}>
                   
         <div className={classes.search} >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
              value={this.state.term}
              onChange={this.handleChange}
            />
          </div>
          </Grid>
        </Grid>

 
          
      {this.state.content===1 && this.state.people.filter(searchFor(this.state.term)).map((person)=>
        <div key={person.id} style={{display:'flex'}}> 
            <Card style={{display: 'flex',margin:10}}>
              <Grid container style={{padding: 10}}>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1" >{person.id} </Typography  > 
                </Grid>
                <Grid item xs={3} sm={3} md={3} >
                <Typography variant="body1" >{person.first} </Typography  >
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1"  >{person.last} </Typography  >
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1"  >{person.age}</Typography  >
                </Grid>
               </Grid>
            </Card>
          </div>
      )}

{this.state.content===2 && this.state.people2.filter(searchFor(this.state.term)).map((person)=>
        <div key={person.id} style={{display:'flex'}}> 
            <Card style={{display: 'flex',margin:10}}>
              <Grid container style={{padding: 10}}>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1" >{person.id} </Typography  > 
                </Grid>
                <Grid item xs={3} sm={3} md={3} >
                <Typography variant="body1" >{person.first} </Typography  >
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1"  >{person.last} </Typography  >
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                <Typography variant="body1"  >{person.age}</Typography  >
                </Grid>
               </Grid>
            </Card>
          </div>
    
      )}
         
      
    
     
      </div>

   
    );
  }
}

export default withStyles(styles)(Notifications);
