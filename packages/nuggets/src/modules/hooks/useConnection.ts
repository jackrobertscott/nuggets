import { useState, useEffect } from 'react';
import {
  Connection,
  IConnectionValue,
  IConnectionError,
  IConnectionDefaults,
} from '../helpers/createConnection';

export interface IuseConnectionOptions<E, T> {
  connection: Connection<E, T>;
}

export interface IuseConnectionProps<T extends IConnectionValue> {
  value?: T;
  error?: IConnectionError;
  loading: boolean;
  execute: (data?: IConnectionDefaults) => Promise<T>;
  refresh: () => any;
}

export const useConnection = <T extends IConnectionValue>({
  connection,
}: IuseConnectionOptions<unknown, T>): IuseConnectionProps<T> => {
  const [value, update] = useState<T | undefined>(undefined);
  const [error, updateError] = useState<IConnectionError | undefined>(
    undefined
  );
  const [loading, updateLoading] = useState<boolean>(false);
  useEffect(() => {
    return connection.attach({
      data: values => update(values),
      error: updateError,
      loading: updateLoading,
    });
  }, []);
  const execute = (data?: IConnectionDefaults): Promise<T> =>
    connection.execute(data);
  const refresh = () => connection.refresh();
  return {
    value,
    error,
    loading,
    execute,
    refresh,
  };
};
