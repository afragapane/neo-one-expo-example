/* @hash 3073415ac0f4e36b538754d5927d512a */
// tslint:disable
/* eslint-disable */
import { DeveloperTools } from '@neo-one/client-browserify';
import * as React from 'react';
import { createClient, createDeveloperClients, createLocalClients } from './client';
import { createOneSmartContract } from './One/contract';

const Context = React.createContext(undefined);

export const ContractsProvider = ({
  client: clientIn,
  developerClients: developerClientsIn,
  localClients: localClientsIn,
  host,
  children,
}) => {
  const client = clientIn === undefined ? createClient(host) : clientIn;
  const developerClients = developerClientsIn === undefined ? createDeveloperClients(host) : developerClientsIn;
  const localClients = localClientsIn === undefined ? createLocalClients(host) : localClientsIn;
  DeveloperTools.enable({ client, developerClients, localClients });

  return (
    <Context.Provider
      value={{
        client,
        developerClients,
        localClients,
        one: createOneSmartContract(client),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const WithContracts = ({ children }) => <Context.Consumer>{children}</Context.Consumer>;
