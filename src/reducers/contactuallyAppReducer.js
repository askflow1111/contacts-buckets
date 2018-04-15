export default function reducer(
	state = {
		userInfo: { data: null, error: null },
		contacts: { data: null, error: null, contactsAdded: 0, errorCount: 0 },
	},
	action
) {
	switch (action.type) {
		case "FETCH_CURRENT_USER_INFO_FULFILLED": {
			return {
				...state,
				userInfo: { data: action.payload, error: null },
			};
		}

		case "FETCH_CURRENT_USER_INFO_REJECTED": {
			return {
				...state,
				userInfo: { error: action.payload, data: null, },
			};
		}

		case "FETCH_USER_CONTACTS_FULFILLED": {
			return {
				...state,
				contacts: { ...state.contacts, data: action.payload, error: null, },
			};
		}

		case "FETCH_USER_CONTACTS_REJECTED": {
			return {
				...state,
				contacts: { ...state.contacts, data: null, error: action.payload },
			};
		}

		case "CREATE_CONTACT_FULFILLED": {
			return {
				...state,
				contacts: { ...state.contacts, data: [...state.contacts.data, action.payload], contactsAdded: state.contacts.contactsAdded + 1, error: null },
			};
		}

		case "CREATE_CONTACT_REJECTED": {
			return {
				...state,
				contacts: { ...state.contacts, error: action.payload, errorCount: state.contacts.errorCount + 1 },
			};
		}

		case "DELETE_CONTACT_FULFILLED": {
			return {
				...state,
				contacts: {
					...state.contacts, error: null,
					data: state.contacts.data.filter(item => item.id !== action.payload.id)
				},
			};
		}

		default:
			return state;
	}
}