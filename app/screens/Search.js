import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UserCard from '../components/UserCard';

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = search => {
    if(search === ''){
      setLoading(false)
    }
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
        style={styles.searchBox}
        placeholder="Enter User Name ..."
        onChangeText={search => fetchUsers(search)}
      />
      {loading && <ActivityIndicator />}

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
          <UserCard user={item} navigation={props.navigation}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox:{
    backgroundColor:'gray',
    margin: 15,
    borderRadius: 15,
  }
});
