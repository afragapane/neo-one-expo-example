import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BigNumber from 'bignumber.js';
import { FromStream } from '@neo-one/react';
import { formatDistanceStrict } from 'date-fns';
import _ from 'lodash';
import { combineLatest, concat, of, timer } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { WithContracts } from '../one/generated';


const TIMER = 100;
function TimeAgo({ startTimeMS, durationMS, nowMS, ...props }: TimeAgoProps): JSX.Element {
  if (startTimeMS === undefined || durationMS === undefined || nowMS === undefined) {
    return (
      <>
        <Text style={styles.textLine}>Countdown:</Text>
      </>
    );
  }
  const endTimeMS = startTimeMS + durationMS;

  return (
    <FromStream
      props={[nowMS, startTimeMS, durationMS, endTimeMS]}
      createStream={() =>
        concat(of(0), timer(0, TIMER)).pipe(
          map((inc) => {
            const currentNow = nowMS + Math.floor(inc * TIMER);

            const countdown = startTimeMS > currentNow;
            const complete = endTimeMS < currentNow;
            const value = countdown
              ? formatDistanceStrict(new Date(startTimeMS), currentNow)
              : complete
                ? undefined
                : formatDistanceStrict(currentNow, new Date(endTimeMS));

            return { countdown, value };
          }),
          distinctUntilChanged((a, b) => _.isEqual(a, b)),
        )
      }
    >
      {({ countdown, value }) => (
          <Text style={styles.textLine}>
            {countdown ? 'Countdown: ' : 'Time Left: '}
            {value === undefined ? 'Ended' : value }
          </Text>
      )}
    </FromStream>
  );
}

export default class Info extends React.Component {
  render() {
    return  (
        <WithContracts>
            {({ client, one }) => (
            <FromStream
                props={[client, one]}
                createStream={() =>
                concat(
                    of(undefined),
                    combineLatest(client.block$, client.currentUserAccount$, client.currentNetwork$).pipe(
                    switchMap(async ([{ block }, account, network]) => {
                        const [
                        startTimeSeconds,
                        durationSeconds,
                        amountPerNEO,
                        totalSupply,
                        remaining,
                        balance,
                        ] = await Promise.all([
                        one.icoStartTimeSeconds(),
                        one.icoDurationSeconds(),
                        one.amountPerNEO(),
                        one.totalSupply(),
                        one.remaining(),
                        account === undefined ? Promise.resolve(new BigNumber(0)) : one.balanceOf(account.id.address),
                        ]);

                        return {
                        startTimeMS: startTimeSeconds.toNumber() * 1000,
                        durationMS: durationSeconds.toNumber() * 1000,
                        amountPerNEO,
                        totalSupply,
                        remaining,
                        nowMS: block.time * 1000,
                        balance,
                        address: one.definition.networks[network].address,
                        };
                    }),
                    ),
                )
                }
            >
                {(value) => (
                <View>
                    <TimeAgo
                    startTimeMS={value === undefined ? undefined : value.startTimeMS}
                    durationMS={value === undefined ? undefined : value.durationMS}
                    nowMS={value === undefined ? undefined : value.nowMS}
                    />
                    <Text style={styles.textLine}>NEO Contributed: {value === undefined ? '' : value.totalSupply.div(value.amountPerNEO).toFormat()}</Text>
                    <Text style={styles.textLine}>Remaining: {value === undefined ? '' : value.remaining.toFormat()}</Text>
                    <Text style={styles.textLine}>Your Balance: {value === undefined ? '' : value.balance.toFormat()}</Text>
                    <Text style={styles.textLine}>ONE Address: {value === undefined ? '' : value.address}</Text>
                </View>
                )}
            </FromStream>
            )}
        </WithContracts>
    );
  }
}

const styles = StyleSheet.create({
    textLine: {
        padding: 4,
    }
  });
