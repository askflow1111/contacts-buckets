import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
import Bucket from "./Bucket";

class BucketsList extends Component {
	shouldComponentUpdate(newProps, newState) {
		if (JSON.stringify(this.props.contactuallyAppStore.buckets.data) !== JSON.stringify(newProps.contactuallyAppStore.buckets.data)) {
			return true;
		} else {
			return false;
		}
	}

	renderBucketsList = () => {
		if (this.props.contactuallyAppStore.buckets.data !== null) {
			return this.props.contactuallyAppStore.buckets.data.map((item) => {
				return (
					<Bucket item={item} />
				)
			})
		} else {
			return <h1>loading</h1>
		}
	}

	render() {
		return (
			<ul className="buckets-container">
				{this.renderBucketsList()}
			</ul>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(BucketsList));