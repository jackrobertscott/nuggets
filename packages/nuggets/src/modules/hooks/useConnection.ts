import { useState, useEffect } from 'react';
import {
  Connection,
  IConnectionValue,
  IConnectionError,
} from '../helpers/createConnection';

export interface IuseConnectionOptions<E, T> {
  connection: Connection<E, T>;
}

export interface IuseConnectionProps<T extends IConnectionValue> {
  value: T;
  error?: IConnectionError;
  loading: boolean;
}

export const useConnection = <T extends IConnectionValue>({
  connection,
  ...options
}: IuseConnectionOptions<unknown, T>): IuseConnectionProps<T> => {
  const [value, update] = useState<T>({} as any);
  const [error, updateError] = useState<IConnectionError | undefined>(
    undefined
  );
  const [loading, updateLoading] = useState<boolean>(false);
  useEffect(() => {
    return connection.attach({
      data: data => update(data),
      error: data => updateError(data),
      loading: data => updateLoading(data),
    });
  }, []);
  return {
    value,
    error,
    loading,
  };
};
