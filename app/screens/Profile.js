import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {Avatar} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Profile(props) {
  const [userPost, setUserPost] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {currentUser, posts, following, follower} = props;
    setIsLoading(true);

    if (props.route.params.uid === auth().currentUser.uid) {
      setUser(currentUser);
      setUserPost(posts);
      setFollowing(following);
      setFollower(follower);
    } else {
      firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            setUser(snapshot._data);
          } else {
            console.log('User doesnt exist');
          }
        });
      firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .onSnapshot(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setUserPost(posts);
        });
      firestore()
        .collection('following')
        .doc(props.route.params.uid)
        .collection('userFollowing')
        .onSnapshot(snapshot => {
          let following = snapshot.docs.map(doc => {
            const id = doc.id;
            return id;
          });
          setFollowing(following);
        });
      firestore()
        .collection('follower')
        .doc(props.route.params.uid)
        .collection('userFollower')
        .onSnapshot(snapshot => {
          let follower = snapshot.docs.map(doc => {
            const id = doc.id;
            return id;
          });
          setFollower(follower);
        });
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
    setIsLoading(false);
  }, [props.route.params.uid, props.posts, props.following, props.follower]);

  const handleFollow = () => {
    if (!isFollowing) {
      firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid)
        .set({});
      firestore()
        .collection('follower')
        .doc(props.route.params.uid)
        .collection('userFollower')
        .doc(auth().currentUser.uid)
        .set({});
      ToastAndroid.show(`Followed ${user.userName}`, ToastAndroid.SHORT);
    } else {
      firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('userFollowing')
        .doc(props.route.params.uid)
        .delete({});
      firestore()
        .collection('follower')
        .doc(props.route.params.uid)
        .collection('userFollower')
        .doc(auth().currentUser.uid)
        .delete({});
      ToastAndroid.show(`Unfollowed ${user.userName}`, ToastAndroid.SHORT);
    }
  };

  const onLogout = () => {
    auth().signOut();
  }

  if (isLoading || user == undefined) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user.userName}</Text>
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          title={user.userName[0]}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          rounded
        />
        <View style={styles.infoContainer}>
          <View style={styles.statisticsContainter}>
            <View style={styles.stat}>
              <Text style={styles.number}>{userPost.length}</Text>
              <Text>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.number}>{follower.length}</Text>
              <Text>Follower</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.number}>{following.length}</Text>
              <Text>Following</Text>
            </View>
          </View>
          {props.route.params.uid !== auth().currentUser.uid ? (
            <TouchableOpacity
              onPress={() => handleFollow()}
              style={styles.followBtn}>
              <Text>{isFollowing ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onLogout()}
              style={styles.followBtn}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: item.downloadURL}} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  userName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  galleryContainer: {},
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    margin: 2,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  avatarContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  statisticsContainter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    margin: 12,
  },
  stat: {
    alignItems: 'center',
    margin: 5,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16.5,
    marginBottom: 2,
  },
  followBtn: {
    backgroundColor: '#00BFFF',
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
  follower: store.userState.follower,
});

export default connect(mapStateToProps, null)(Profile);
