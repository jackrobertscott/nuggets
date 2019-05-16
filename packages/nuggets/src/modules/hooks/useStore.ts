import { useState, useEffect } from 'react';
import { Store, IStoreValue } from '../helpers/createStore';

export interface IuseStoreOptions<T> {
  store: Store<T>;
}

export interface IuseStoreProps<T> {
  value: T;
}

export const useStore = <T extends IStoreValue>({
  store,
}: IuseStoreOptions<T>): IuseStoreProps<T> => {
  const [state, update] = useState<T>(store.state());
  useEffect(() => {
    return store.attach((data: T) => update(data));
  }, []);
  return {
    value: state,
  };
};
