export interface IStoreValue {
  [name: string]: any;
}

export interface IcreateStoreOptions {
  defaults: IStoreValue;
}

export type IWatcher = (value: IStoreValue) => any;

export type IStore = (
  watcher: IWatcher
) => [((data?: IStoreValue) => any), (() => any)];

export const createStore = ({ defaults }: IcreateStoreOptions) => {
  let value: IStoreValue = defaults || {};
  const watchers = new Map<number, IWatcher>();
  const change = (data?: IStoreValue) => {
    value = {
      ...(defaults || {}),
      ...(value || {}),
      ...(data || {}),
    };
    watchers.forEach(watcher => watcher(value));
  };
  const store: IStore = watcher => {
    let id: number;
    do {
      id = Math.random();
    } while (watchers.has(id));
    watchers.set(id, watcher);
    const unwatch = () => {
      if (watchers.has(id)) {
        watchers.delete(id);
      }
    };
    return [change, unwatch];
  };
  return store;
};
