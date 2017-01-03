import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigator, UIManager, Platform, AsyncStorage } from 'react-native';
import store from './store';
import routes from 'constants/routes';
import { Main } from './scenes';
import { checkPermission, requestPermission } from 'react-native-android-permissions';
import StorageHelper from 'services/storage_helper';
import { persistStore } from 'redux-persist';
import LoadingScreen from 'components/loading_screen';
const PERMISSION_LIST = [
  "android.permission.INTERNET",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE",
];

export default class StarterNative extends Component {
  constructor(props){
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount(){
    persistStore(store, {
      storage: AsyncStorage,
      debounce: 5000
    }, () => {
      this.setState({ rehydrated: true })
    })
    if (Platform.OS.toLowerCase() === 'ios') return;
    PERMISSION_LIST.forEach(permission => {
      setTimeout(() => {
        checkPermission(permission).then((result) => {
        }, (result) => {
          setTimeout(() => {
            requestPermission(permission)
          }, 0);
        });
      }, 0);
    });
  }

  render(){
    if(!this.state.rehydrated){
      return <LoadingScreen />
    }
    return (
      <Provider store={store} >
        <Navigator
          initialRoute={this.initialRoute()}
          renderScene={this.renderScene}
          configureScene={() => ({
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
            gestures: {}
          })}
        />
      </Provider>
    )
  }

  initialRoute = () => {
    return {id: routes.MAIN}
  }

  renderScene = (route, navigator) => {
    switch(route.id){
      case routes.MAIN: {
        return (
          <Main
            navigator={navigator}
          />
        )
      }
    }
  }
}
