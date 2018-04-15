export default function reducer(
    state = {
        userInfo: null,
        userInfoError: null,
    },
    action
) {
    switch (action.type) {
        case "FETCH_CURRENT_USER_INFO_FULFILLED": {
            return {
                ...state,
                userInfo: action.payload,
            };
        }

        case "FETCH_CURRENT_USER_INFO_REJECTED": {
            return {
                ...state,
                userInfoError: action.payload,
            };
        }

        default:
            return state;
    }
}