import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router, Link
} from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div className="home-container">
				<Link to="/contacts/show">Contacts</Link>
				<Link to="/buckets">Buckets</Link>
			</div>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(Home));