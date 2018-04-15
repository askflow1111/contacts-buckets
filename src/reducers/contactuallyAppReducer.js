export default function reducer(
	state = {
		userInfo: { data: null, error: null },
		contacts: { data: null, error: null, contactsAdded: 0, errorCount: 0, contactsEdited: 0 },
		buckets: { data: null },
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
				contacts: { ...state.contacts, data: [action.payload, ...state.contacts.data], contactsAdded: state.contacts.contactsAdded + 1, error: null },
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

		case "UPDATE_CONTACT_FULFILLED": {
			// let arr = [...state.contacts.data.filter(item => item.id !== action.payload.id), action.payload];
			// arr = arr.sort((a,b) => a.createdAt>b.createdAt);
			let arr = [...state.contacts.data]; // created new arr
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id === action.payload.id) {
					arr[i] = action.payload;
					break;
				}
			}
			return {
				...state,
				contacts: {
					...state.contacts, error: null,
					data: arr,
					contactsEdited: state.contacts.contactsEdited + 1,
				},
			};
		}

		case "UPDATE_CONTACT_REJECTED": {
			return {
				...state,
				contacts: {
					...state.contacts, error: action.payload
				},
			};
		}

		case "FETCH_BUCKETS_FULFILLED": {
			return {
				...state,
				buckets: {
					...state.buckets, data: action.payload,
				},
			};
		}

		case "FETCH_BUCKETS_REJECTED": {
			return {
				...state,
				buckets: {
					...state.buckets, error: action.payload,
				},
			};
		}


		default:
			return state;
	}
}