import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  Button,
  ToastAndroid
} from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function AddCaption(props) {
  const [caption, setCaption] = useState('');
  console.log(props.route.params);
  const captionInput = useRef(null);


  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <TouchableOpacity><Text onPress={() => uploadImage()}>Post</Text></TouchableOpacity>,
    });
  }, [props.navigation]);

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${auth().currentUser.uid}/${Math.random().toString(36)}`;
    console.log(childPath)

    Keyboard.dismiss();
    captionInput.current.editable = false;
    ToastAndroid.show("Posting", ToastAndroid.SHORT);


    const response = await fetch(uri);
    const blob = await response.blob();

    const task = storage()
        .ref()
        .child(childPath)
        .put(blob);

    const taskProgress = snapshot => {
        console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
            savePostData(snapshot);
            console.log(snapshot)
        })
    }

    const taskError = snapshot => {
        console.log(snapshot)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted);
}

const savePostData = (downloadURL) => {

    firestore()
        .collection('posts')
        .doc(auth().currentUser.uid)
        .collection("userPosts")
        .add({
            downloadURL,
            caption,
            likesCount: 0,
            creation: firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
}

  return (
    <View style={styles.container}>
      <TextInput
        ref={captionInput}
        multiline={true}
        placeholder="Write a caption . . ."
        onChangeText={caption => setCaption(caption)}
      />
      <Image style={styles.image} source={{uri: props.route.params.image}} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    marginTop:5
  },
});
