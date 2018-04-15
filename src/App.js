import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
// import logo from './logo.svg'
// import './App.css'
import Contacts from "./components/Contacts";
import {
  fetchCurrentUserInfo,
  fetchUserContacts
} from "./actions/contactuallyAppActions";

// import logo from './logo.svg'
// import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUserInfo());
    this.props.dispatch(fetchUserContacts());
  }

  render() {
    console.log('this.props', this.props);
    return (
      <Router >
        <Switch>
          <Route
            exact path="/"
            render={({ match }) => {
              return <div>Home</div>
            }}
          />
          <Route
            exact path="/contacts"
            render={({ match }) => {
              return <Contacts />
            }}
          />
          <Route
            exact path="/buckets/:id"
            render={({ match }) => {
              return <div>buckets</div>
            }}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps({ contactuallyAppStore }) {
  return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(App));