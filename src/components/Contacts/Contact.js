import React, { Component } from 'react'
import {
	withRouter, Route, Switch, browserHistory, Redirect, BrowserRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
import {
	deleteContact,
	updateContact,
	addContactToBucket
} from "../../actions/contactsActions";
import Select from 'react-select';

class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isBeingEdited: false,
			firstName: this.props.item.firstName,
			lastName: this.props.item.lastName,
			email: this.props.item.email,
			selectArr: null,

		};
	}

	shouldComponentUpdate(newProps, newState) {
		if (this.state.isBeingEdited !== newProps.isBeingEdited ||
			this.props.firstName !== newProps.firstName ||
			this.props.lastName !== newProps.lastName ||
			this.props.email !== newProps.email) {
			return true;
		} else {
			return false;
		}
	}

	handleOnChangeValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	renderEditForm = () => {
		return (
			<form
				onSubmit={e => {
					e.preventDefault();
					if ((this.props.item.firstName !== this.state.firstName) ||
						(this.props.item.lastName !== this.state.lastName) ||
						(this.props.item.email !== this.state.email)) {
						let data = {
							id: this.props.item.id,
							firstName: e.target.firstName.value,
							lastName: e.target.lastName.value,
							email: e.target.email.value
						}
						this.props.dispatch(updateContact(data));
					}
					this.setState({ isBeingEdited: false });
				}}
			>
				<div >
					<h3 className="heading"><span> Update</span></h3>
					<input
						type="text"
						value={this.state.firstName}
						name="firstName"
						required
						placeholder="First Nmae!"
						className="search-box-input"
						onChange={this.handleOnChangeValue}
					/>
					<input
						type="text"
						name="lastName"
						required
						placeholder="Last Nmae!"
						value={this.state.lastName}
						onChange={this.handleOnChangeValue}
					/>
					<input
						type="email"
						name="email"
						required
						placeholder="email"
						value={this.state.email}
						onChange={this.handleOnChangeValue}
					/>
				</div>
				<button className="bttn search-form-bttn">Search</button>
			
			</form>
		)
	}

	handleSelectChange = (selectArr) => {
		// debugger
		this.setState({ selectArr });
	}

	handleSelectOnClose = () => {
		if (this.state.selectArr) {
			let bucketsArr = this.state.selectArr.split(',');
			// console.log(' this.state.selectArr',  bucketsArr);
			this.props.dispatch(addContactToBucket({contactId: this.props.item.id, bucketsArr}));
		}
	}

	selectOptions = () => {
		let arr = [];
		if (this.props.contactuallyAppStore.buckets.data !== null) {
			this.props.contactuallyAppStore.buckets.data.forEach(e => {		
				arr.push({"label": e.name, "value": e.id})
			});
		}
		return arr;
	}

	renderContact = () => {
		return (
			
			<li className="section ">
				<p >{this.props.item.id}</p>
				<p >{this.props.item.firstName}</p>
				<p >{this.props.item.lastName} </p>
				<p >{this.props.item.email} </p>
				<button onClick={() => this.setState({ isBeingEdited: true })}>Edit</button>
				<button onClick={() => this.props.dispatch(deleteContact(this.props.item.id))}>Delete</button>
				<Select
				className="select-bucket"
					closeOnSelect={false}
					// disabled={disabled}
					multi
					onClose={this.handleSelectOnClose}
					onChange={this.handleSelectChange}
					options={this.selectOptions()}
					placeholder="Select your favourite(s)"
					removeSelected={false}
					// rtl={this.state.rtl}
					simpleValue
					value={this.state.selectArr}
				/>
			</li>
		)
	}

	render() {

		if (!this.state.isBeingEdited) {
			return this.renderContact();
		} else {
			return this.renderEditForm();
		}
	}

}

function mapStateToProps({ contactuallyAppStore }) {
	return { contactuallyAppStore };
}

export default withRouter(connect(mapStateToProps)(Contact));