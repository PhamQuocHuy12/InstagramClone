import React, {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../../redux/actions/index';

export class Home extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    const {currentUser} = this.props;
    console.log(currentUser);
    return (
      <View>
        <Text>User is logged in</Text>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchProps = dispatch => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);
