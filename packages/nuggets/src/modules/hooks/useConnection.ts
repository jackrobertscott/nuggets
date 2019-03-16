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

export interface IuseConnectionProps {
  value: IConnectionValue;
  error?: IConnectionError;
  loading: boolean;
  execute: (value?: any) => any;
  refresh: () => any;
}

export const useConnection: FunctionHook<
  IuseConnectionOptions,
  IuseConnectionProps
> = options => {
  const [value, update] = useState<IConnectionValue>({});
  const [error, updateError] = useState<IConnectionError | undefined>(
    undefined
  );
  const [loading, updateLoading] = useState<boolean>(false);
  const [execute, refresh, ...unwatch] = options.connection({
    defaults: options.defaults,
    data: update,
    error: updateError,
    loading: updateLoading,
  });
  /**
   * The double function is for accessing the "unmount" hook.
   * () => () => unmount()
   */
  useEffect(() => () => unwatch.forEach(run => run()));
  return {
    value,
    error,
    loading,
    execute,
    refresh,
  };
};
