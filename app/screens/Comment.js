import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsersData} from '../../redux/actions';

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    function matchUserToComment(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }

        const user = props.users.find(x => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }
    if (props.route.params.postId !== postId) {
      firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .doc(props.route.params.postId)
        .collection('comments')
        .onSnapshot(snapshot => {
          let comments = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setComments(comments);
        });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComment(comments);
    }
  }, [props.route.params.postId, comments, props.users]);

  const onCommentSend = () => {
    firestore()
      .collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .doc(props.route.params.postId)
      .collection('comments')
      .add({
        creator: auth().currentUser.uid,
        text,
      });
  };

  return (
    <View style={{flex: 1, margin:10}}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.user !== undefined ? (
                <Text style={{fontWeight: 'bold'}}>{item.user.userName}</Text>
              ) : (
                <Text>Instagram User</Text>
              )}
              {' '}{item.text}
            </Text>
          </View>
        )}
      />
      <View style={{flexDirection:'row', justifyContent:'space-between', margin: 10}}>
        <TextInput
          placeholder={'Add comment ...'}
          onChangeText={text => setText(text)}
        />
        <Icon
          //   style={styles.icon}
          size={30}
          name="checkmark-outline"
          type="ionicon"
          color="#fff"
          onPress={() => onCommentSend()}
        />
      </View>
    </View>
  );
}

const mapStateToProps = store => ({
  users: store.usersState.users,
});
const mapDispatchProps = dispatch =>
  bindActionCreators({fetchUsersData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
