/* @hash a9e834cf3e94a7b88d2093c28c3ebb5a */
// tslint:disable
/* eslint-disable */
import { DeveloperTools } from '../../neo-one';
import * as React from 'react';
import { createClient, createDeveloperClients, createLocalClients } from './client';
import { createOneSmartContract } from './One/contract';

const Context = React.createContext(undefined);

export const ContractsProvider = ({
  client: clientIn,
  developerClients: developerClientsIn,
  localClients: localClientsIn,
  children,
}) => {
  const client = clientIn === undefined ? createClient() : clientIn;
  const developerClients = developerClientsIn === undefined ? createDeveloperClients() : developerClientsIn;
  const localClients = localClientsIn === undefined ? createLocalClients() : localClientsIn;
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
