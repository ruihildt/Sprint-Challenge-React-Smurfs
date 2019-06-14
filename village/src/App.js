import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const smurfAPI = 'http://localhost:3333/smurfs/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  fetchFriend = async () => {
    try {
      const axiosData = await axios.get(smurfAPI);
      this.setState({ smurfs: axiosData.data });
    } catch (err) {
        this.setState({
          errorMessage: err.message
        });
    } finally {
      //Confirm data is loaded
      // this.state.smurfs && console.log('Smurf data successfully loaded');
    }
  }

  componentDidMount() {
    this.fetchFriend();
  }

  getAllSmurfs = () => {
    axios.get(smurfAPI)
    .then(res => {
      this.setState({ smurfs: res.data });
    })
  }

  postNewSmurf = (newSmurf) => {
    axios.post(smurfAPI, newSmurf)
    .then(() => this.getAllSmurfs())
    .catch(err => console.log(err));
  }


  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (

    <Router>
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form">Add new Smurf to village</NavLink>
        </nav>

        <Route
        path="/"
        exact
        render={props => <Smurfs {...props}  smurfs={this.state.smurfs} />}
        />

        <Route
        path = '/smurf-form'
        render={props => <SmurfForm {...props} postNewSmurf={this.postNewSmurf}/>}
        />
      </div>
    </Router>
    );
  }
}

export default App;