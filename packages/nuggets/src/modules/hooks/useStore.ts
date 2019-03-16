import { useState, useEffect } from 'react';
import { IStore, IStoreValue } from '../helpers/createStore';

export interface IuseStoreOptions {
  store: IStore;
}

export interface IuseStoreProps {}

export const useStore = (options: IuseStoreOptions): IuseStoreProps => {
  const [value, update] = useState<IStoreValue>({});
  const [change, unwatch] = options.store((data: IStoreValue) => {
    update(data);
  });
  useEffect(() => unwatch);
  return {
    value,
    change,
  };
};
