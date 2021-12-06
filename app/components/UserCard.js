import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

export default function UserCard({user, navigation}) {
  return (
    <TouchableOpacity style={styles.container}
      onPress={() => navigation.navigate('Profile', {uid: user.id})}>
      <Avatar  size={40} title={user.userName[0]} activeOpacity={0.7} rounded />
      <Text style={styles.name}>{user.userName}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
        marginLeft: 15, 
        marginRight: 15,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor:'gray',
        padding: 8,
    },
    name:{
      marginLeft: 15
    },
})