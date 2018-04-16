import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";

class Bucket extends Component {
	shouldComponentUpdate(newProps, newState) {
		if (JSON.stringify(this.props.item) !== JSON.stringify(newProps.item)) {
			return true;
		} else {
			return false;
		}
	}

	renderBucket = () => {
		return (
			<li
				key={this.props.item.id}
				onClick={() => this.props.history.push(`/buckets/${this.props.item.id}`)}
			>
				<p >createdAt:{this.props.item.createdAt}</p>
				<p >Name:{this.props.item.name}</p>
				<p >contact:{this.props.item.extraData.contactCount}  </p>
				<p >days: {this.props.item.reminderInterval} </p>
			</li>
		)
	}

	render() {
		return (	
			 this.renderBucket()
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(Bucket));