import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Save(props) {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${auth().currentUser.uid}/${Math.random().toString(
      36,
    )}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage().ref().child(childPath).put(blob);
    const taksProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = snapshot => {
      console.log(snapshot);
    };

    task.on('state_changed', taksProgress, taskError, taskCompleted);
  };

  const savePostData = downloadURL => [
    firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadURL,
        caption,
        creation: firestore.FieldValue.serverTimestamp(),
      }).then(
          props.navigation.popToTop()
      )
  ];

  return (
    <View style={styles.container}>
      <Image source={{uri: props.route.params.image}} />
      <TextInput
        placeholder="Write a caption . . ."
        onChangeText={caption => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
