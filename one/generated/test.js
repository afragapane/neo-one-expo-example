/* @hash a529f9c9473d50138000aca8db8757f3 */
// tslint:disable
/* eslint-disable */
import { withContracts as withContractsBase } from '@neo-one/smart-contract-test';
import * as path from 'path';

export const withContracts = async (test, options) =>
  withContractsBase([{ name: 'One', filePath: path.resolve(__dirname, '../contracts/One.ts') }], test, options);
