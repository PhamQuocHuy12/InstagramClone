import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import UserCard from '../components/UserCard';
import { searchUsers } from '../services/FirebaseService';

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async search => {
    try{
      setUsers(await searchUsers(search));
      setLoading(false)
    }catch(error){
      ToastAndroid.show('Cannot search users', ToastAndroid.SHORT);
      setLoading(true)
    }
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
