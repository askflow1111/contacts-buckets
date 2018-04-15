import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";

class Contacts extends Component {

	renderContacts = () => {
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			return this.props.contactuallyAppStore.contacts.data.map((item) => {
				return (
					<li >
						<p >{item.firstName}</p>
						<p >{item.lastName} </p>
						<p >{item.email} </p>
					</li>
				)
			})
		} else {
			return <h1>loading</h1>
		}
	}

	render() {
		console.log('this.props', this.props);
		return (
			<div>
				<ul>
					{this.renderContacts()}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(Contacts));