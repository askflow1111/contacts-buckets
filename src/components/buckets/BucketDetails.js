import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router, Link
} from "react-router-dom";
import { connect } from "react-redux";
import Contact from "../contacts/Contact";
import Select from 'react-select';

import {
	addContactsToBucket,
	deleteContactsFromBucket,
	areTwoArrSame,
	fetchUserContacts
} from "../../actions/contactuallyAppActions";


class BucketDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectArr: null,
		};
	}

	componentDidMount() {
		this.addBucketContactsToSelectArr();
	}
	componentDidUpdate() {
		this.addBucketContactsToSelectArr();
	}

	shouldComponentUpdate(newProps, newState) {
		let arr1 = this.props.contactuallyAppStore.contacts.data, arr2 = newProps.contactuallyAppStore.contacts.data;
		if (this.state.selectArr !== newState.selectArr || this.props.contactuallyAppStore.updateBucketContactsCounter !== newProps.contactuallyAppStore.updateBucketContactsCounter || !this.props.dispatch(areTwoArrSame(arr1, arr2))) {
			return true;
		} else {
			return false;
		}
	}

	addBucketContactsToSelectArr = () => {
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			let str = "";
			this.props.contactuallyAppStore.contacts.data.forEach(e => {
				if (e.extraData.buckets.some(e => e.id === this.props.match.params.id)) {
					str += `${e.id},`;
				}
			})
			str = str.substr(0, str.length - 1);
			this.setState({
				selectArr: str,
			})
		}
	}

	handleSelectChange = (selectArr) => {
		this.setState({ selectArr });
		let newContactsArr = selectArr.split(',');
		let oldContactstArr = this.props.contactuallyAppStore.contacts.data.filter(e => e.extraData.buckets.some(e => e.id === this.props.match.params.id));
		let newContactMap = {}, deleteBucketContacts = [], AddBucketContacts = [];
		newContactsArr.forEach(e => newContactMap[e] = true);
		oldContactstArr.forEach(e => {
			if (newContactMap[e.id] !== undefined) {
				delete newContactMap[e.id]
			} else {
				deleteBucketContacts.push(e.id)
			}
		})
		for (let key in newContactMap) {
			AddBucketContacts.push(key);
		}
		AddBucketContacts = AddBucketContacts.filter(x => x.length);
		deleteBucketContacts = deleteBucketContacts.filter(x => x.length);
		if (AddBucketContacts.length > 0) {
			this.props.dispatch(addContactsToBucket({ bucketId: this.props.match.params.id, contactsArr: AddBucketContacts }));
		}
		if (deleteBucketContacts.length > 0) {
			this.props.dispatch(deleteContactsFromBucket({ bucketId: this.props.match.params.id, contactsArr: deleteBucketContacts }));
		}
	}

	selectOptions = () => {
		let arr = [];
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			this.props.contactuallyAppStore.contacts.data.forEach(e => {
				arr.push({ "label": `${e.firstName} ${e.lastName}`, "value": e.id })
			});
		}
		return arr;
	}

	render() {
		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/buckets">Show Buckets</Link>
				</nav>
				<ul className="bucket-details-container">
					<Select
						className="select-bucket"
						closeOnSelect={false}
						multi
						onChange={this.handleSelectChange}
						options={this.selectOptions()}
						placeholder="Select Contact(s) To Add To This Bucket"
						removeSelected={true}
						simpleValue
						value={this.state.selectArr}
						backspaceRemoves={false}
						clearable={false}
					/>
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(BucketDetails));