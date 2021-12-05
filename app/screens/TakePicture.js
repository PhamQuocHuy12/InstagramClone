import React, {useState, useEffect} from 'react';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {Icon} from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  ToastAndroid,
} from 'react-native';

export default function TakePicture({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

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
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      navigation.navigate('AddCaption', {image: data.uri});
    }
  };

  const pickImage = async () => {
    try{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate('AddCaption', {image: result.uri});
    }
  }catch(error){
    ToastAndroid.show("Cannot select PNG file", ToastAndroid.SHORT);
  }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
      { isFocused &&<Camera
          ref={ref => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={'1:1'}
        />}
      </View>
      {/* {image && <Image source={{uri: image}} style={styles.image} />} */}
      <View style={styles.cameraControlContainer}>
        <TouchableOpacity onPress={() => pickImage()}>
          <Icon reverse name="photograph" type="fontisto" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.takePictureBtn}
          onPress={() => takePicture()}>
          <Icon reverse name="camera" type="evilicons" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            );
          }}>
          <Icon reverse name="flip-camera-android" type="materialicons" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  save: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  image: {
    aspectRatio: 1,
    flex: 2,
  },
  cameraControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
});
