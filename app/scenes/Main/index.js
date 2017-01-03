import React, { Component} from 'react';
import {
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Drawer from 'react-native-drawer'
import ControlPanel from './ControlPanel'
import Page from './Page'
import UtilityMethods from 'services/utilityMethods';

export class Main extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type={UtilityMethods.drawerType}
        content={
          <ControlPanel closeDrawer={this.closeDrawer} navigator={this.props.navigator}/>
        }
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          this.setState({drawerOpen: false})
        }}
        captureGestures={false}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return (viewport.width/4)
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        negotiatePan
        tapToClose={true}
        >
        <Page openDrawer={this.openDrawer}/>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  }
})
