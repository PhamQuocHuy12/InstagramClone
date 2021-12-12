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
import {
  getUser,
  getUserPosts,
  getUserFollowing,
  getUserFollower,
  onFollowing,
  onUnfollowing,
  signOut,
} from '../services/FirebaseService';

function Profile(props) {
  const [userPost, setUserPost] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const userId = props.route.params.uid;
    getUserInformation(userId);
    if (props.following.indexOf(userId) > -1) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [props.route.params.uid, props.posts, props.following, props.follower]);

  const getUserInformation = async uid => {
    const {currentUser, posts, following, follower} = props;
    if (uid === auth().currentUser.uid) {
      setUser(currentUser);
      setUserPost(posts);
      setFollowing(following);
      setFollower(follower);
    } else {
      setUser(await getUser(uid));
      setUserPost(await getUserPosts(uid));
      setFollowing(await getUserFollowing(uid));
      setFollower(await getUserFollower(uid));
    }
  };

  const handleFollow = async () => {
    if (!isFollowing) {
      onFollowing(props.route.params.uid);
      ToastAndroid.show(`Followed ${user.userName}`, ToastAndroid.SHORT);
      setFollower(await getUserFollower(props.route.params.uid));
      setIsFollowing(true);
      console.log(isFollowing);
    } else {
      onUnfollowing(props.route.params.uid);
      ToastAndroid.show(`Unfollowed ${user.userName}`, ToastAndroid.SHORT);
      setFollower(await getUserFollower(props.route.params.uid));
      setIsFollowing(false);
      console.log(isFollowing);
    }
  };

  const onLogout = () => {
    try {
      signOut();
      ToastAndroid.show(`Signed out!`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(`Signing out failed`, ToastAndroid.SHORT);
    }
  };

  console.log(following, follower);
  if (user === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
  follower: store.userState.follower,
});

export default connect(mapStateToProps, null)(Profile);
