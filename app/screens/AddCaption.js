import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import {uploadImage} from '../services/FirebaseService';

export default function AddCaption(props) {
  const [caption, setCaption] = useState('');
  console.log(props.route.params);
  const captionInput = useRef(null);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text onPress={() => onUploadPost()}>Post</Text>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const onUploadPost = async () => {
    try {
      uploadImage(props.route.params.image, caption);
      ToastAndroid.show('Posting', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Failed upload post', ToastAndroid.SHORT);
    }
  };

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
    marginTop: 5,
  },
});
