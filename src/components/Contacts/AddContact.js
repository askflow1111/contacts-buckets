import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";

import {
  createContact
} from "../../actions/contactuallyAppActions";


class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createContactFailed: false,
    };
  }

  shouldComponentUpdate(newProps, newState) {
    // debugger
    if (this.props.contactuallyAppStore.contacts.contactsAdded !== newProps.contactuallyAppStore.contacts.contactsAdded ||
      this.props.contactuallyAppStore.contacts.errorCount !== newProps.contactuallyAppStore.contacts.errorCount || this.props.createContactFailed !== newProps.createContactFailed) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps) {
    // this.updateURL();
    if (this.props.contactuallyAppStore.contacts.contactsAdded > prevProps.contactuallyAppStore.contacts.contactsAdded) {
      // debugger
      this.props.history.push(`/contacts/show`);
    } else if (this.props.contactuallyAppStore.contacts.error !== null && this.props.contactuallyAppStore.contacts.errorCount > prevProps.contactuallyAppStore.contacts.errorCount) {
      alert('failed')
      this.setState({ createContactFailed: true });
      // this.props.dispatch(playAuthFailedAnimation(this.refs.authFailed, "shake"));
    }
  }





  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <h3 ref="authFailed" className={"auth-failed " + (this.state.registrationFailed ? "show" : "")}>Username already exists</h3>
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          // debugger
          let data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value
          }
          // debugger
          this.props.dispatch(createContact(data));

        }}>
          <div >
            <h3 className="heading"><span> Search</span></h3>
            <input
              type="text"
              // id="thing"
              name="firstName"
              required
              placeholder="First Nmae!"
              // value={this.props.ebayAppStore.userInput.searchBoxValue}
              // onChange={this.handleSearchBoxValue}
              // ref="searchBox"
              className="search-box-input"
            />
            <input
              type="text"
              // id="thing"
              name="lastName"
              required
              placeholder="Last Nmae!"
              // value={this.props.ebayAppStore.userInput.searchBoxValue}
              // onChange={this.handleSearchBoxValue}
              // ref="searchBox"
              className="search-box-input"
            />
            <input
              type="email"
              // id="thing"
              name="email"
              required
              placeholder="email"
              // value={this.props.ebayAppStore.userInput.searchBoxValue}
              // onChange={this.handleSearchBoxValue}
              // ref="searchBox"
              className="search-box-input"
            />
          </div>
          <button className="bttn search-form-bttn">Search</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ contactuallyAppStore }) {
  return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(AddContact));