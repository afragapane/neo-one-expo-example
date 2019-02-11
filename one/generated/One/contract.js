/* @hash 15a07433e5f348c4c357557d98cd4187 */
// tslint:disable
/* eslint-disable */
import { oneABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AQZxPbR5BMUbgt7bnc7Ed4n5RNeDwUMFGL',
    },
  },
  abi: oneABI,
  sourceMaps,
};

export const createOneSmartContract = (client) => client.smartContract(definition);
