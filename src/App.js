import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
// import logo from './logo.svg'
// import './App.css'
import ContactsList from "./components/contacts/ContactsList";
import AddContact from "./components/contacts/AddContact";
import BucketsList from "./components/buckets/BucketsList";
import BucketDetails from "./components/buckets/BucketDetails";
import { fetchUserContacts } from "./actions/contactsActions";
import { fetchCurrentUserInfo } from "./actions/currentUserActions";
import { fetchBuckets, fetchBucketInfo } from "./actions/bucketsActions";

// import logo from './logo.svg'
// import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUserInfo());
    this.props.dispatch(fetchUserContacts());
    this.props.dispatch(fetchBuckets());
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
          <Route exact path="/contacts/show" component={ContactsList} />

          <Route exact path="/contacts/add" component={AddContact} />

          <Route
            path="/buckets/:id"
            render={({ match }) => {
              // debugger
              this.props.dispatch(fetchBucketInfo(match.params.id));
              return <BucketDetails />
            }}
          />

          <Route path="/buckets" component={BucketsList} />

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