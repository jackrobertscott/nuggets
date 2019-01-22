import { createDispatcher, IWatcher } from './createDispatcher';

export interface IStoreValue {
  [name: string]: any;
}

export interface IcreateStoreOptions {
  defaults: IStoreValue;
}

export type IStore = (
  watcher: IWatcher<IStoreValue>
) => [((data?: IStoreValue) => any), (() => any)];

export const createStore = ({ defaults }: IcreateStoreOptions): IStore => {
  let value: IStoreValue = { ...(defaults || {}) };
  const dispatcher = createDispatcher<IStoreValue>();
  const change = (data?: IStoreValue) => {
    value = {
      ...(defaults || {}),
      ...(value || {}),
      ...(data || {}),
    };
    dispatcher.dispatch(value);
  };
  return watcher => {
    return [change, dispatcher.watch(watcher)];
  };
};
