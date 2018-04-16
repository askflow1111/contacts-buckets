import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
import Contact from "../contacts/Contact";
import Select from 'react-select';
// import Bucket from "./Bucket";

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

	getBucketsContact = () => {

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
		// debugger

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
		// debugger
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
		// debugger
		return arr;
	}

	renderBucketDetails = () => {
		if (this.props.contactuallyAppStore.contacts.data !== null) {
			let contacts = this.props.contactuallyAppStore.contacts.data.filter(e => {
				return e.extraData.buckets.some(e => e.id === this.props.match.params.id)
			})
			return contacts.map((item) => {
				return (
					<li className="section " key={item.id}>
						<p >{item.id}</p>
						<p >{item.firstName}</p>
						<p >{item.lastName} </p>
						<p >{item.email} </p>
					</li>
				)
			})
		} else {
			return <div>Loading</div>
		}
		// add the case when contacts are  empty
	}

	render() {
		return (
			<div>
				<ul className="bucket-details-container">
					{/* {this.renderBucketDetails()} */}
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