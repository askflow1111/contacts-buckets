export default function reducer(
    state = {
        userInfo: { data: null, error: null },
        contacts: { data: [], error: null },
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
                userInfo: { error: action.payload, data: null },
            };
        }

        case "FETCH_USER_CONTACTS_FULFILLED": {
            return {
                ...state,
                contacts: { data: action.payload, error: null },
            };
        }

        case "FETCH_USER_CONTACTS_REJECTED": {
            return {
                ...state,
                contacts: { error: action.payload, data: null },
            };
        }

        default:
            return state;
    }
}