import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = search => {
    setLoading(true);
    firestore()
      .collection('users')
      .where('userName', '>=', search)
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setUsers(users);
        setLoading(false);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="Type Here..."
        onChangeText={search => fetchUsers(search)}
      />
      {loading && <ActivityIndicator />}

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Profile', {uid: item.id})
            }>
            <Text>{item.userName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
