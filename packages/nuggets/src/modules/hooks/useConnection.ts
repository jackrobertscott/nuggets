import { useState, useEffect } from 'react';
import { FunctionHook } from '../../utils/types';
import {
  IConnection,
  IConnectionValue,
  IConnectionError,
} from '../helpers/createConnection';

export interface IConnectionDefaults {
  [name: string]: any;
}

export interface IuseConnectionOptions {
  connection: IConnection;
  defaults: IConnectionDefaults;
}

export interface IuseConnectionProps {}

export const useConnection: FunctionHook<
  IuseConnectionOptions,
  IuseConnectionProps
> = options => {
  const [value, update] = useState<IConnectionValue>({});
  const [error, catche] = useState<IConnectionError | undefined>(undefined);
  const [execute, refresh, ...unwatch] = options.connection({
    defaults: options.defaults,
    data: (data: IConnectionValue) => update(data),
    error: (issue: IConnectionError) => catche(issue),
  });
  useEffect(() => {
    return () => unwatch.forEach(run => run());
  });
  return {
    value,
    error,
    execute,
    refresh,
  };
};
