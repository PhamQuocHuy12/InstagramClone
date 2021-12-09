import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {signUp} from '../services/FirebaseService';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');

  const OnSignUpPress = () => {
    try {
      signUp(email, password, fullName, userName);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
      }
      if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
      }
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#ad52de', '#017afe']} style={styles.container}>
        <View style={styles.loginSection}>
          <View style={styles.addIcon}>
            <Icon name="add" type="ionicon" color="#fff" size={70} />
            <Text style={[styles.boldText, {color: '#fff'}]}>Photo</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={email => setEmail(email)}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            secureTextEntry={true}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Fullname"
            onChangeText={fullName => setFullName(fullName)}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={userName => setUserName(userName)}></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => OnSignUpPress()}>
            <Text style={styles.boldText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomHelpText}>
          Already have an account ?
          <Text
            style={styles.boldText}
            onPress={() => navigation.navigate('SignIn')}>
            Sign in.
          </Text>
        </Text>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addIcon: {
    marginTop: 40,
    marginBottom: 15,
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  loginSection: {
    width: '90%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1);',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5f64f6',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default SignUp;
