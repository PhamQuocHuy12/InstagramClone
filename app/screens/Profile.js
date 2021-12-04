import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserPosts, fetchUser} from '../../redux/actions';

function Profile(props) {
  const {currentUser, posts} = props;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{currentUser.userName}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>
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
    color: 'black',
  },
  email: {
    color: 'black',
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
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const mapDispatchProps = dispatch =>
  bindActionCreators({fetchUser, fetchUserPosts}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Profile);
