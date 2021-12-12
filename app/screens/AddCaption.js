import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {uploadImage} from '../services/FirebaseService';

export default function AddCaption(props) {
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);
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
    setIsPosting(true);
    await uploadImage(props.route.params.image, caption);
    setIsPosting(false);
    props.navigation.popToTop();
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
