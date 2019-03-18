import { useState, useEffect } from 'react';
import { Store, IStoreValue } from '../helpers/createStore';

export interface IuseStoreOptions<T> {
  store: Store<T>;
}

export interface IuseStoreProps<T> {
  value: T;
  change: (data: T) => any;
}

export const useStore = <T extends IStoreValue>({
  store,
}: IuseStoreOptions<T>): IuseStoreProps<T> => {
  const [value, update] = useState<T>(store.state());
  useEffect(() => {
    return store.attach((data: T) => update(data));
  }, []);
  const change = (data: T) => store.change(data);
  return {
    value,
    change,
  };
};
