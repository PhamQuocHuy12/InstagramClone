import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Signed in!');
    });
};

export const signUp = (email, password, fullName, userName) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      firestore().collection('users').doc(auth().currentUser.uid).set({
        fullName,
        email,
        userName,
      });
      console.log('User account created & signed in!');
    });
};

export const uploadImage = async (image, caption) => {
  const uri = image;
  const childPath = `post/${auth().currentUser.uid}/${Math.random().toString(
    36,
  )}`;
  console.log(childPath);

  const response = await fetch(uri);
  const blob = await response.blob();

  const task = storage().ref().child(childPath).put(blob);

  const taskProgress = snapshot => {
    console.log(`transferred: ${snapshot.bytesTransferred}`);
  };

  const taskCompleted = () => {
    task.snapshot.ref.getDownloadURL().then(snapshot => {
      uploadPost(snapshot, caption);
      console.log(snapshot);
    });
  };
  const taskError = snapshot => {
    console.log(snapshot);
  };

  task.on('state_changed', taskProgress, taskError, taskCompleted);
};

export const uploadPost = (downloadURL, caption) => {
  firestore()
    .collection('posts')
    .doc(auth().currentUser.uid)
    .collection('userPosts')
    .add({
      downloadURL,
      caption,
      likesCount: 0,
      creation: firestore.FieldValue.serverTimestamp(),
    });
};

export const searchUsers = search => {
  const foundUser = firestore()
    .collection('users')
    .where('userName', '>=', search)
    .get()
    .then(snapshot => {
      let users = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });
      return users;
    });
  return foundUser;
};

export const getUser = uid => {
  const user = firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        return snapshot._data;
      } else {
        console.log('User doesnt exist');
      }
    });
  return user;
};

export const getUserPosts = async uid => {
  const postList = await firestore()
    .collection('posts')
    .doc(uid)
    .collection('userPosts')
    .orderBy('creation', 'asc')
    .get()
    .then(snapshot => {
      let posts = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {id, ...data};
      });
      return posts;
    });
  return postList;
};

export const getUserFollowing = async uid => {
  const followingList = await firestore()
    .collection('following')
    .doc(uid)
    .collection('userFollowing')
    .get()
    .then(snapshot => {
      let following = snapshot.docs.map(doc => {
        const id = doc.id;
        return id;
      });
      return following;
    });
  return followingList;
};

export const getUserFollower = async uid => {
  const followerList = await firestore()
    .collection('follower')
    .doc(uid)
    .collection('userFollower')
    .get()
    .then(snapshot => {
      let follower = snapshot.docs.map(doc => {
        const id = doc.id;
        return id;
      });
      return follower;
    });
  return followerList;
};
export const onFollowing = FollowId => {
  firestore()
    .collection('following')
    .doc(auth().currentUser.uid)
    .collection('userFollowing')
    .doc(FollowId)
    .set({});
  firestore()
    .collection('follower')
    .doc(FollowId)
    .collection('userFollower')
    .doc(auth().currentUser.uid)
    .set({});
};

export const onUnfollowing = UnfollowId => {
  firestore()
    .collection('following')
    .doc(auth().currentUser.uid)
    .collection('userFollowing')
    .doc(UnfollowId)
    .delete({});
  firestore()
    .collection('follower')
    .doc(UnfollowId)
    .collection('userFollower')
    .doc(auth().currentUser.uid)
    .delete({});
};

export const signOut = () => {
  auth().signOut();
};

export const getPostComments = () => {};

export const addComment = () => {};
