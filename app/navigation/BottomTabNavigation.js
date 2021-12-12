import React, {useEffect, useState, Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  fetchUserFollower,
  clearData,
} from '../../redux/actions/index';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export class BottomTabNavigation extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
    this.props.fetchUserFollower();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="MainAdd"
          component={EmptyScreen}
          listeners={({navigation}) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('TakePicture');
            },
          })}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          listeners={({navigation}) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('Profile', {uid: auth().currentUser.uid});
            },
          })}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = dispatch =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
      fetchUserFollowing,
      fetchUserFollower,
      clearData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchProps)(BottomTabNavigation);
