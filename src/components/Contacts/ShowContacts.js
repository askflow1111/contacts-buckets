import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
import {
	deleteContact,
	areTwoArrSame
} from "../../actions/contactuallyAppActions";


class ShowContacts extends Component {
	shouldComponentUpdate(newProps, newState) {
		let arr1 = this.props.contactuallyAppStore.contacts.data, arr2 = newProps.contactuallyAppStore.contacts.data;
		    if(!this.props.dispatch(areTwoArrSame(arr1, arr2))) { 
				return true;
			} else {
				return false;
			}

	}
	renderContacts = () => {
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			return this.props.contactuallyAppStore.contacts.data.map((item) => {
				console.log('Item', item);

				return (
					<li >
						<p >{item.firstName}</p>
						<p >{item.lastName} </p>
						<p >{item.email} </p>
						<button onClick={() => this.props.dispatch(deleteContact(item.id))}>Delete</button>
					</li>
				)
			})

			// add the case when contacts are  empty
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

export default withRouter(connect(mapStateToProps)(ShowContacts));