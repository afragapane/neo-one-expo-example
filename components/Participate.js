import React from 'react';
import BigNumber from 'bignumber.js';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { FromStream } from '@neo-one/react';
import { concat, defer, of } from 'rxjs';

import { WithContracts } from '../one/generated';
import { Hash256 } from '@neo-one/client-browserify';
import { black } from 'ansi-colors';

export default class Participate extends React.Component {
  state = {
      amount: new BigNumber(0),
      loading: false,
  }

  render() {
    return (
        <WithContracts>
          {({ one }) => (
            <View style={styles.participateView}>
                <TextInput style={styles.inputBox} placeholder="Send NEO" onChangeText={(newText) => this.updateAmount(newText)}/>
                {this.state.loading ? 
                    <ActivityIndicator/> 
                        : 
                    <TouchableOpacity style={styles.contributeButton} onPress={() => this.sendNEO(one, this.state.amount)}>
                        <Text style={styles.contributeText}>Contribute</Text>
                    </TouchableOpacity>
                }
            </View>
          )}
        </WithContracts>
      );
  }

  updateAmount(newAmount) {
      this.setState({ amount: new BigNumber(newAmount) })
  }

  sendNEO(one, amount) {
    this.setState({loading: true})

    one
    .mintTokens({
      sendTo: [
        {
          asset: Hash256.NEO,
          amount,
        },
      ],
    })
    .then((result) => {
        result.confirmed().then(() => {
            this.setState({ loading: false })
        })
    })
  }
}

const styles = StyleSheet.create({
    participateView: {
      paddingTop: 24,
      flexDirection: 'row',
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#00d180',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 8,
    },
    contributeButton: {
        backgroundColor: '#00d180',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 8,
    },
    contributeText: {
        color: 'white',
        padding: 4,
    }
  });