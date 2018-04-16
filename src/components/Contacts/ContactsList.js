import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
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
					<Contact item={item} />
				)
			})
			// add the case when contacts are  empty
		} else {
			return <h1>loading</h1>
		}
	}

	render() {
		return (
			<div>
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