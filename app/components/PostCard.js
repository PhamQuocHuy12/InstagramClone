import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

export default function PostCard({post, navigation}) {
  if (post.user == undefined) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.postContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', {uid: post.user.uid})}
        style={styles.userContainer}>
        <Avatar
          size={50}
          title={post.user.userName[0]}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
          rounded
        />
        <Text style={styles.container}>{post.user.userName}</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={{uri: post.downloadURL}} />
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          size={30}
          name="hearto"
          type="antdesign"
          color="#fff"
        />
        <Icon
          style={styles.icon}
          size={30}
          name="chatbubble-outline"
          type="ionicon"
          color="#fff"
        />
        <Icon
          style={styles.icon}
          size={30}
          name="paper-plane-outline"
          type="ionicon"
          color="#fff"
        />
      </View>
      <View style={styles.postInfoContainer}>
        <Text>17 likes</Text>
        <Text>
          <Text style={{fontWeight: 'bold'}}>{post.user.userName}</Text>{' '}
          {post.caption}
        </Text>
        <View style={styles.commentContainer}>
          <Text
            onPress={() => {
              navigation.navigate('Comment', {postId: post.id, uid: post.user.uid});
            }}
            stlye={styles.commentInput}>
            View Comments...
          </Text>
          <Icon
            style={styles.icon}
            size={30}
            name="checkmark-outline"
            type="ionicon"
            color="#fff"
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    margin: 5,
  },
  postInfoContainer: {
    flex: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
