import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FromStream } from '@neo-one/react';

import Info from './Info';
import Participate from './Participate';

export default class ICO extends React.Component {
  render() {
    return (
    <View style={styles.container}>
      <Info/>
      <Participate/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingTop: 100,
  },
});
