import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import PostCard from '../components/PostCard';

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (
      props.usersLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
    }
  }, [props.usersLoaded, props.feed, props.users, props.currentUser]);

  console.log(props.feed.length + ' & ' + props.feedLoaded);

  if (props.feedLoaded !== true) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {props.feed.length > 0 ? (
          <View style={styles.containerGallery}>
            <FlatList
              numColumns={1}
              horizontal={false}
              data={posts}
              extraData={props.users}
              renderItem={({item}) => (
                <PostCard post={item} navigation={props.navigation}></PostCard>
              )}
            />
          </View>
        ) : (
          <View style={styles.loading}>
            <Text>Look like its empty here. Please follow someone</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
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
  following: store.userState.following,
  feed: store.usersState.feed,
  usersLoaded: store.usersState.usersLoaded,
  users: store.usersState.users,
  feedLoaded: store.usersState.feedLoaded,
});
export default connect(mapStateToProps, null)(Feed);
