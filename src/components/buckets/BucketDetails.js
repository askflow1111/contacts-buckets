import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
// import Bucket from "./Bucket";

// import {
// 	areTwoArrSame
// } from "../../actions/contactsActions";


class BucketDetails extends Component {
	// shouldComponentUpdate(newProps, newState) {
	// 	let arr1 = this.props.contactuallyAppStore.contacts.data, arr2 = newProps.contactuallyAppStore.contacts.data;
	// 	if (!this.props.dispatch(areTwoArrSame(arr1, arr2)) || this.props.contactuallyAppStore.contacts.contactsEdited !== newProps.contactuallyAppStore.contacts.contactsEdited) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	renderBucketDetails = () => {
		// if (this.props.contactuallyAppStore.buckets.data !== null) {
		// return this.props.contactuallyAppStore.buckets.data.map((item) => {
		return (
			<h1>bucket details</h1>
		)
		// })
		// add the case when buckets are  empty
		// } else {
		// 	return <h1>loading</h1>
		// }
	}

	render() {
		return (
			<div>
				<ul>
					{this.renderBucketDetails()}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(BucketDetails));