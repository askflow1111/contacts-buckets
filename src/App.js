import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
// import logo from './logo.svg'
// import './App.css'

class App extends Component {
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
              return <div>Contacts</div>
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