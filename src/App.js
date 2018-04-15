import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
// import logo from './logo.svg'
// import './App.css'

class App extends Component {
  render() {
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

export default App
