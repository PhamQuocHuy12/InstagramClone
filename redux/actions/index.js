import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE} from '../constants/index';

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

export function fetchUserPosts() {
  return dispatch => {
    firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data}
        })
          dispatch({type: USER_POSTS_STATE_CHANGE, posts});
      });
  };
}
