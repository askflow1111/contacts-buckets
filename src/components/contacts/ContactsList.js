import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router, Link
} from "react-router-dom";
import { connect } from "react-redux";
import Contact from "./Contact";

import {
	areTwoArrSame
} from "../../actions/contactuallyAppActions";


class ContactsList extends Component {
	shouldComponentUpdate(newProps, newState) {
		let arr1 = this.props.contactuallyAppStore.contacts.data, arr2 = newProps.contactuallyAppStore.contacts.data;
		if (!this.props.dispatch(areTwoArrSame(arr1, arr2)) || this.props.contactuallyAppStore.contacts.contactsEdited !== newProps.contactuallyAppStore.contacts.contactsEdited) {
			return true;
		} else {
			return false;
		}
	}

	renderContactsList = () => {
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			return this.props.contactuallyAppStore.contacts.data.map((item) => {
				return (
					<Contact item={item} key={item.id} />
				)
			})
		} else {
			return <h1>loading</h1>
		}
	}

	render() {
		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/contacts/add">Add Contact</Link>
				</nav>
				<h1>Contacts</h1>
				<ul className="contact-lists-container">
					{this.renderContactsList()}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(ContactsList));