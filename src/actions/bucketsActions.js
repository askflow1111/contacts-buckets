import { ApiClient } from '../lib/contactually-api'
const apiClient = new ApiClient()
// debugger
export function fetchBuckets() {
  return function (dispatch) {
    apiClient.get('buckets', {
      onSuccess: ({ data }) => {
        console.log('data', data);
        data = data.sort((a, b) => a.id > b.id);
        dispatch({ type: "FETCH_BUCKETS_FULFILLED", payload: data });
      },
      onError: (error) => {
        dispatch({ type: "FETCH_BUCKETS_REJECTED", payload: error });
      }
    })
  };
}

export function fetchBucketInfo(id) {
  debugger
  return function (dispatch) {
    apiClient.get(`buckets/${id}`, {
      onSuccess: ({ data }) => {
        console.log('data', data);
        debugger
        // dispatch({ type: "FETCH_BUCKETS_FULFILLED", payload: data });
      },
      onError: (error) => {
        // dispatch({ type: "FETCH_BUCKETS_REJECTED", payload: error });
      }
    })

    // apiClient.post(`contacts/contact_7259164/buckets` , {
    //   data: {
    //     id: "bucket_1702380",
    //   },
    // })
  };
}

// export function createContact(obj) {
//   return function (dispatch) {
//     apiClient.post('contacts', {
//       data: {
//         firstName: obj.firstName,
//         lastName: obj.lastName,
//         email: obj.email,
//       },
//       onSuccess: ({ data }) => {
//         if (!data) {
//           dispatch({ type: "CREATE_CONTACT_REJECTED", payload: "Contact Already Exist" });
//         } else {
//           dispatch({ type: "CREATE_CONTACT_FULFILLED", payload: data });
//         }
//       },
//       onError: (error) => {
//         dispatch({ type: "CREATE_CONTACT_REJECTED", payload: error });
//       }
//     })
//   };
// }

// export function deleteContact(id) {
//   return function (dispatch) {
//     apiClient.delete(`contacts/${id}`, {
//       data: {
//         id: id.split('_')[1],
//       },
//       onSuccess: ({ data }) => {
//         dispatch({ type: "DELETE_CONTACT_FULFILLED", payload: data });
//       },
//       onError: (error) => {
//         dispatch({ type: "DELETE_CONTACT_REJECTED", payload: error });
//       }
//     })
//   };
// }

// export function updateContact(obj) {
//   return function (dispatch) {
//     apiClient.put(`contacts/${obj.id}`, {
//       data: {
//         id: obj.id.split('_')[1],
//         firstName: obj.firstName,
//         lastName: obj.lastName,
//         email: obj.email,
//       },
//       onSuccess: ({ data }) => {
//         dispatch({ type: "UPDATE_CONTACT_FULFILLED", payload: data });
//       },
//       onError: (error) => {
//         dispatch({ type: "UPDATE_CONTACT_REJECTED", payload: error });
//       }
//     })
//   };
// }

// export function areTwoArrSame(arr1, arr2) {
//   // In this algorithm, it is assumed that ids are going to be unique.
//   return function () {
//     let mapOne = {}, mapTwo = {}, counter = 0;
//     if (arr1 !== arr2) { //In case if both arrays are null
//       if (!arr1 || !arr2 || arr1.length !== arr2.length) return false; // In case if either array is null
//       for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i].id !== arr2[i].id) {
//           if (mapOne[arr2[i].id]) {
//             counter--;
//           } else {
//             mapTwo[arr2[i].id] = true;
//             counter++;
//           }
//           if (mapTwo[arr1[i].id]) {
//             counter--;
//           } else {
//             mapOne[arr1[i].id] = true;
//             counter++;
//           }
//         }
//       }
//     }
//     return counter === 0;
//   }
// }
