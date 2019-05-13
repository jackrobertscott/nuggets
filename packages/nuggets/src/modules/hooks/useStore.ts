import { useState, useEffect } from 'react';
import { Store, IStoreValue } from '../helpers/createStore';

export interface IuseStoreOptions<T> {
  store: Store<T>;
}

export type IuseStoreProps<T> = [T];

export const useStore = <T extends IStoreValue>({
  store,
}: IuseStoreOptions<T>): IuseStoreProps<T> => {
  const [value, update] = useState<T>(store.state());
  useEffect(() => {
    return store.attach((data: T) => update(data));
  }, []);
  return [value];
};
