import { ApiClient } from '../lib/contactually-api'
const apiClient = new ApiClient();

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
    apiClient.get('contacts?order=created_at', {
      onSuccess: ({ data }) => {
        dispatch({ type: "FETCH_USER_CONTACTS_FULFILLED", payload: data.reverse() });
      },
      onError: (error) => {
        dispatch({ type: "FETCH_USER_CONTACTS_REJECTED", payload: error });
      }
    })
  };
}

export function fetchBuckets() {
  return function (dispatch) {
    apiClient.get('buckets', {
      onSuccess: ({ data }) => {
        data = data.sort((a, b) => a.id > b.id);
        dispatch({ type: "FETCH_BUCKETS_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "FETCH_BUCKETS_REJECTED", payload: error });
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

export function deleteContact(id) {
  return function (dispatch) {
    apiClient.delete(`contacts/${id}`, {
      data: {
        id: id.split('_')[1],
      },
      onSuccess: ({ data }) => {
        dispatch({ type: "DELETE_CONTACT_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "DELETE_CONTACT_REJECTED", payload: error });
      }
    })
  };
}

export function updateContact(obj) {
  return function (dispatch) {
    apiClient.put(`contacts/${obj.id}`, {
      data: {
        id: obj.id.split('_')[1],
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
      },
      onSuccess: ({ data }) => {
        dispatch({ type: "UPDATE_CONTACT_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "UPDATE_CONTACT_REJECTED", payload: error });
      }
    })
  };
}

export function addContactToBuckets(obj) {
  return function (dispatch) {
    obj.bucketsArr.forEach(id => {
      apiClient.post(`contacts/${obj.contactId}/buckets`, {
        data: {
          id,
        },
        onSuccess: ({ data }) => {
          dispatch(fetchUserContacts())
          dispatch(fetchBuckets())
        }
      })
    });
  };
}

export function deleteContactFromBuckets(obj) {
  return function (dispatch) {
    obj.bucketsArr.forEach(id => {
      apiClient.delete(`contacts/${obj.contactId}/buckets`, {
        data: {
          id,
        },
        onSuccess: ({ data }) => {
          dispatch(fetchUserContacts());
          dispatch(fetchBuckets());
        }
      })
    });
  };
}

export function areTwoArrSame(arr1, arr2) {
  // In this algorithm, it is assumed that ids are going to be unique.
  return function () {
    let mapOne = {}, mapTwo = {}, counter = 0;
    if (arr1 !== arr2) { //In case if both arrays are null
      if (!arr1 || !arr2 || arr1.length !== arr2.length) return false; // In case if either array is null
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
          if (mapOne[arr2[i].id]) {
            counter--;
          } else {
            mapTwo[arr2[i].id] = true;
            counter++;
          }
          if (mapTwo[arr1[i].id]) {
            counter--;
          } else {
            mapOne[arr1[i].id] = true;
            counter++;
          }
        }
      }
    }
    return counter === 0;
  }
}

export function fetchBucketInfo(id) {
  return function (dispatch) {
    apiClient.get(`buckets/${id}`)
  };
}

export function addContactsToBucket(obj) {
  return function (dispatch) {
    obj.contactsArr.forEach(id => {
      apiClient.post(`contacts/${id}/buckets`, {
        data: {
          id: obj.bucketId,
        },
        onSuccess: ({ data }) => {
          dispatch(fetchUserContacts())
          dispatch(fetchBuckets())
        }
      })
    });
  };
}

export function deleteContactsFromBucket(obj) {
  return function (dispatch) {
    obj.contactsArr.forEach(id => {
      apiClient.delete(`contacts/${id}/buckets`, {
        data: {
          id: obj.bucketId,
        }
        ,
        onSuccess: ({ data }) => {
          dispatch(fetchUserContacts())
          dispatch(fetchBuckets())
        }
      })
    });
  };
}
