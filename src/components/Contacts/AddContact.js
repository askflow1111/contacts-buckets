import React, { Component } from 'react'
import {
  withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router, Link
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
    if (this.props.contactuallyAppStore.contacts.contactsAdded !== newProps.contactuallyAppStore.contacts.contactsAdded ||
      this.props.contactuallyAppStore.contacts.errorCount !== newProps.contactuallyAppStore.contacts.errorCount || this.props.createContactFailed !== newProps.createContactFailed) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.contactuallyAppStore.contacts.contactsAdded > prevProps.contactuallyAppStore.contacts.contactsAdded) {
      this.props.history.push(`/contacts/show`);
    } else if (this.props.contactuallyAppStore.contacts.error !== null && this.props.contactuallyAppStore.contacts.errorCount > prevProps.contactuallyAppStore.contacts.errorCount) {
      alert('failed')
      this.setState({ createContactFailed: true });
    }
  }

  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contacts/show">Show Contacts</Link>
        </nav>
        <form className="form" onSubmit={(e) => {
          e.preventDefault();
          let data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value
          }
          this.props.dispatch(createContact(data));
        }}>
          <div >
            <h3 className="heading"><span> Add</span></h3>
            <input
              type="text"
              name="firstName"
              required
              placeholder="First Nmae!"
            />
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Nmae!"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="email"
            />
          </div>
          <button className="bttn search-form-bttn">Add</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ contactuallyAppStore }) {
  return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(AddContact));