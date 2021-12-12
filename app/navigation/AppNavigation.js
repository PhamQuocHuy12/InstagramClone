import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import BottomTabNavigation from './BottomTabNavigation';
import TakePicture from '../screens/TakePicture';
import AddCaption from '../screens/AddCaption';
import Comment from '../screens/Comment';

import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
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

    if(!loggedIn){
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{
              title: 'Instagram',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily:'Grestal', 
              },
            }}
          />
          <Stack.Screen name="TakePicture" component={TakePicture} />
          <Stack.Screen name="AddCaption" component={AddCaption} />
          <Stack.Screen name="Comment" component={Comment} />
        </Stack.Navigator>
    )

}
