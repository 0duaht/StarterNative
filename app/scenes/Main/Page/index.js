import React, { Component} from 'react';
import {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageBackground from 'components/image_background';
import FullContainer from 'components/full_container';
import NavBar from 'components/navbar';
import { Connect, Forum } from './scenes';
import { bindActionCreators } from 'redux';
import { setMainIndex } from 'actions/index';
import { connect } from 'react-redux';
const CONNECT_INDEX = 0;
const FORUM_INDEX = 1;

class Page extends Component {
  renderBasedOnIndex = index => {
    switch(index){
      case CONNECT_INDEX: {
        return <Connect drawer={this.props.openDrawer}/>
      }
      case FORUM_INDEX: {
        return <Forum drawer={this.props.openDrawer}
                resetIndex={() => this.props.setMainIndex(0)}/>
      }
    }
  }

  render() {
    return (
      <FullContainer>
        {this.renderBasedOnIndex(this.props.index)}
      </FullContainer>
    )
  }
}

mapStateToProps = state => {
  return {
    index: state.main.index
  }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setMainIndex
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
