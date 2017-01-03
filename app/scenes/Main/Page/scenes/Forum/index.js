import React, { Component } from 'react';
import Webview from 'components/webview';
import Styles from 'styles'

export class Forum extends Component {
  render() {
    return (
      <Webview
        uri='https://reddit.com'
        callBack={this.props.resetIndex}
      />
    )
  }
}