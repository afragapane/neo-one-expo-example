/* @hash f3f631c00718a0120c9f7a82035f9d34 */
// tslint:disable
/* eslint-disable */
/* @source-map-hash 495fdbd7c5e192a9423eaeaff21f6c64 */
import { OneClient } from '@neo-one/client-browserify';
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
