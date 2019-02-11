/* @hash 0acfbd7da025be63990ad4a53ebf8622 */
// tslint:disable
/* eslint-disable */
/* @source-map-hash cc70096f3d2aed44b488a9ff9fd1f3ae */
import { OneClient } from '../../neo-one';
import { projectID } from './projectID';

let sourceMapsIn = Promise.resolve({});

if (process.env.NODE_ENV !== 'production' || process.env.NEO_ONE_DEV === 'true') {
  sourceMapsIn = Promise.resolve().then(async () => {
    const client = new OneClient(40101);
    const result = await client.request({
      plugin: '@neo-one/server-plugin-project',
      options: { type: 'sourceMaps', projectID },
    });

    return result.response;
  });
}

export const sourceMaps = sourceMapsIn;
