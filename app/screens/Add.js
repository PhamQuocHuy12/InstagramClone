import React, {useState, useEffect} from 'react';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';

export default function Add({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera != null) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.flexRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>
      <Button title={'Take a picture'} onPress={() => takePicture()} />
      <Button title={'Pick image from gallery'} onPress={() => pickImage()} />
      <Button
        title={'Save'}
        onPress={() => navigation.navigate('Save', {image})}
      />
      {image && <Image source={{uri: image}} style={{flex: 1}} />}
      <Button
        style={styles.button}
        title={'Flip Camera'}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
          );
        }}>
        <Text style={styles.text}> Flip </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  flexRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
  },
});
