import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserPosts, fetchUser} from '../../redux/actions';
import {Icon, Avatar} from 'react-native-elements';

function Profile(props) {
  const {currentUser, posts} = props;
  console.log('1');

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{currentUser.userName}</Text>
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          title={currentUser.userName[0]}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          rounded
        />
        <View style={styles.statisticsContainter}>
          <View style={styles.stat}>
            <Text style={styles.number}>{posts.length}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.number}>69</Text>
            <Text>Follower</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.number}>96</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
    marginTop: 40,
  },
  infoContainer: {
    margin: 10,
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
    margin: 18,
  },
  stat:{
    alignItems:'center'
  },
  number:{
    fontWeight: "bold",
     fontSize: 20
  }
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const mapDispatchProps = dispatch =>
  bindActionCreators({fetchUser, fetchUserPosts}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Profile);
