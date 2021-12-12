import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {signIn} from '../services/FirebaseService';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const OnLoginPress = async () => {
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
  };

  return (
    <LinearGradient colors={['#ad52de', '#017afe']} style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <View style={styles.loginSection}>
        <Text style={styles.title}>Instagram</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={email => setEmail(email)}></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => OnLoginPress()}>
          <Text style={styles.boldText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          Forgot your password ?{' '}
          <Text style={styles.boldText}>Get help singing in.</Text>
        </Text>
      </View>
      <Text style={styles.bottomHelpText}>
        Don's have an account ?
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={styles.boldText}>
          {' '}
          Sign up.
        </Text>
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginSection: {
    width: '90%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Grestal',
    textAlign: 'center',
    fontSize: 40,
    marginTop: 25,
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SignIn;
