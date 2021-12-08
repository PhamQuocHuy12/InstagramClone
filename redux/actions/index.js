import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USER_FOLLOWER_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA
} from '../constants/index';

export function clearData(){
  return ((dispatch) => {
    dispatch({type: CLEAR_DATA})
  })
}

export function fetchUser() {
  return dispatch => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(snapshot => {
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
          return {id, ...data};
        });
        dispatch({type: USER_POSTS_STATE_CHANGE, posts});
      });
  };
}

export function fetchUserFollowing() {
  return dispatch => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot(snapshot => {
        let following = snapshot.docs.map(doc => {
          const id = doc.id;
          return id;
        });
        dispatch({type: USER_FOLLOWING_STATE_CHANGE, following});
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i], true));
        }
      });
  };
}

export function fetchUserFollower() {
  return dispatch => {
    firestore()
      .collection('follower')
      .doc(auth().currentUser.uid)
      .collection('userFollower')
      .onSnapshot(snapshot => {
        let follower = snapshot.docs.map(doc => {
          const id = doc.id;
          return id;
        });
        dispatch({type: USER_FOLLOWER_STATE_CHANGE, follower});
      });
  };
}

export  function fetchUsersData(uid, getPosts) {
  return async (dispatch, getState) => {
    const found = getState().usersState.users.some(el => el.uid === uid);
     if (!found) {
        await firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then( (snapshot) => {
          if (snapshot.exists) {
            let user = snapshot._data;
            user.uid = uid;
            dispatch({type: USERS_DATA_STATE_CHANGE, user});
            console.log('state2: ' + JSON.stringify(getState()))

          } else {
            console.log('does not exist');
          }
        });
      if (getPosts) {
        dispatch(fetchUsersFollowingPosts(uid));
      }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then(snapshot => {
        const uid = snapshot.query._collectionPath._parts[1];
        const user = getState().usersState.users.find(el => el.uid === uid);
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data, user};
        });
        dispatch({type: USERS_POSTS_STATE_CHANGE, posts, uid});
        console.log('state1: ' + JSON.stringify(getState()))
      });
  };
}
