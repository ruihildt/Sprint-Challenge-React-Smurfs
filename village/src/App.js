import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const smurfAPI = 'http://localhost:3333/smurfs/';

export default class App extends Component {
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


  render() {
    return (

    <Router>
      <StyledContainer>
        <StyledNav>
          <NavLink to="/">Smurf Village</NavLink>
          <NavLink to="/smurf-form">Create Your Own Smurf</NavLink>
        </StyledNav>

        <Route
        path="/"
        exact
        render={props => <Smurfs {...props}  smurfs={this.state.smurfs} />}
        />

        <Route
        path = '/smurf-form'
        render={props => <SmurfForm {...props} postNewSmurf={this.postNewSmurf}/>}
        />
      </StyledContainer>
    </Router>
    );
  }
}

// Style

const StyledContainer = styled.div`
max-width:1000px;
margin: 0 auto;
text-align:center;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;

  max-width:500px;
  margin: 0 auto;

  & a {
    padding: 1rem;
    text-decoration:none;
    color: hsl(209, 50%, 50%);
    font-weight:800;
    text-transform:uppercase;
  }
`