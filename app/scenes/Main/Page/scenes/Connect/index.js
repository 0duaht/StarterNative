import React, { Component } from 'react';
import { View, ListView, ScrollView, Text, Navigator } from 'react-native';
import Styles from 'styles';
import routes from 'constants/routes';
import NavBar from 'components/navbar';

export class Connect extends Component {
  render(){
    return (
      <View style={[Styles.allScreen, {backgroundColor: 'white'}]}>
        <ScrollView style={{flex: 1}}>
          <NavBar onPress={this.props.drawer} />
          <View style={[Styles.allScreen, Styles.musicList]}>
          </View>
        </ScrollView>
      </View>
    )
  }
}