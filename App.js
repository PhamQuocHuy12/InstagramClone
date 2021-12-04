import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, DarkTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

import SignIn from './app/screens/SignIn';
import SignUp from './app/screens/SignUp';
import Main from './app/screens/Main';
import TakePicture from './app/screens/TakePicture';
import AddCaption from './app/screens/AddCaption';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  const [loaded, setloaded] = useState(false);
  const [loggedIn, setloggedIn] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        setloaded(true);
        setloggedIn(false);
      } else {
        setloaded(true);
        setloggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator >
          <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
          <Stack.Screen name="TakePicture" component={TakePicture} />
          <Stack.Screen name="AddCaption" component={AddCaption} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
