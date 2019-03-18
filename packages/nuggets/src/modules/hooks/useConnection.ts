import { useState, useEffect } from 'react';
import {
  Connection,
  IConnectionValue,
  IConnectionError,
} from '../helpers/createConnection';

export interface IConnectionDefaults {
  [name: string]: any;
}

export interface IuseConnectionOptions<E, T> {
  connection: Connection<E, T>;
}

export interface IuseConnectionProps<T> {
  value?: T;
  error?: IConnectionError;
  loading: boolean;
  execute: (value?: any) => any;
  refresh: () => any;
}

export const useConnection = <T extends IConnectionValue>({
  connection,
}: IuseConnectionOptions<any, T>): IuseConnectionProps<T> => {
  const [value, update] = useState<T | undefined>(undefined);
  const [error, updateError] = useState<IConnectionError | undefined>(
    undefined
  );
  const [loading, updateLoading] = useState<boolean>(false);
  useEffect(() => {
    return connection.attach({
      data: values => update(values as any),
      error: updateError,
      loading: updateLoading,
    });
  }, []);
  const execute = (data: T) => connection.execute(data);
  const refresh = () => connection.refresh();
  return {
    value,
    error,
    loading,
    execute,
    refresh,
  };
};
