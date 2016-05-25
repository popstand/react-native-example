/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import Relay from 'react-relay';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app';

class ExampleApp extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={App.PostList}
        route={App.queries}
      />
    );
  }
}

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
