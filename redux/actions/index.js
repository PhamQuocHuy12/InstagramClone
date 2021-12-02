import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USER_STATE_CHANGE} from '../constants/index';

export function fetchUser() {

  return dispatch => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot._data});
        } else {
          console.log('User doesnt exist');
        }
      });
  };
}
