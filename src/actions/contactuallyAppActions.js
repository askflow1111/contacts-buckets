import { ApiClient } from '../lib/contactually-api'
const apiClient = new ApiClient()

export function fetchCurrentUserInfo() {
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

export function fetchUserContacts() {
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

export function createContact(obj) {
  return function (dispatch) {
    apiClient.post('contacts', {
      data: {
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
      },
      onSuccess: ({ data }) => {
        if (!data) {
          dispatch({ type: "CREATE_CONTACT_REJECTED", payload: "Contact Already Exist" });
        } else {
          dispatch({ type: "CREATE_CONTACT_FULFILLED", payload: data });
        }
      },
      onError: (error) => {
        dispatch({ type: "CREATE_CONTACT_REJECTED", payload: error });
      }
    })
  };
}

