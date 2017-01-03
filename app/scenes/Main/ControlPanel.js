import React, { Component} from 'react';
import {
  PropTypes,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from 'styles';
import { connect } from 'react-redux';
import routes from 'constants/routes';
import { bindActionCreators } from 'redux';
import { setMainIndex } from 'actions'
import ImageBackground from 'components/image_background'
import UtilityMethods from 'services/utilityMethods';
import Icon from 'react-native-vector-icons/FontAwesome';
import drawerArray from 'constants/drawer';

class ControlPanel extends Component {
  selected = (index, title) => {
    this.props.setMainIndex(index);
    this.props.closeDrawer();
  }

  constructor(props){
    super(props);
  }
  renderComponent() {
    let {closeDrawer} = this.props
    return (
      <ImageBackground>
        <View style={styles.drawerHeading}>
          <Image source={styles.logoImage} style={styles.drawerHeadingLogo}></Image>
          <Text style={styles.drawerHeadingText}>{UtilityMethods.applyLetterSpacing("Starter Native", 3)}</Text>
        </View>
        <View style={styles.drawerMarginTop}></View>
        <View style={[styles.scrollContainer, styles.drawerContent]}>
          {
            drawerArray.map((row) => {
              return (
                <TouchableOpacity key={row.index} onPress={() => this.selected(row.index, row.name)}>
                  <View style={this.stylingView(row.index)}>
                    <Icon name={row.icon} style={this.stylingIcon(row.index)} />
                    <Text style={this.stylingText(row.index)}>{row.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </View>
        <View style={styles.drawerBottom}></View>
      </ImageBackground>
    )
  }

  stylingView = (index) => {
    if (this.props.index === index){
      return styles.drawerList
    }else{
      return [styles.drawerList, {backgroundColor: 'white'}]
    }
  }

  stylingIcon = (index) => {
    if (this.props.index === index){
      return [styles.drawerIcon, {color: 'white'}]
    }else{
      return styles.drawerIcon
    }
  }

  stylingText = (index) => {
    if (this.props.index === index){
      return {color: 'white'}
    }
    else{
      return {color: 'black'}
    }
  }

  render() {
    return (
      <View style={styles.full}>
        {this.renderComponent()}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)

