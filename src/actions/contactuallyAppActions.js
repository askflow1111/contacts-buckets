import { ApiClient } from '../lib/contactually-api'
const apiClient = new ApiClient()

export function fetchCurrentUserInfo(value) {
  return function (dispatch) {
    apiClient.get('me', {
      onSuccess: ({ data }) => {
        dispatch({ type: "FETCH_CURRENT_USER_INFO_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "FETCH_CURRENT_USER_INFO_REJECTED", payload: error });
      }
    })
  };
}

export function fetchUserContacts(value) {
  return function (dispatch) {
    apiClient.get('contacts', {
      onSuccess: ({ data }) => {
        dispatch({ type: "FETCH_USER_CONTACTS_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "FETCH_USER_CONTACTS_REJECTED", payload: error });
      }
    })
  };
}