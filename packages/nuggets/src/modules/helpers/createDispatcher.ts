export type IWatcher<T> = (value: T) => any;

export const createDispatcher = <T>() => {
  const watchers = new Map<number, IWatcher<T>>();
  const watch = (watcher: IWatcher<T>) => {
    let id: number;
    do {
      id = Math.random();
    } while (watchers.has(id));
    watchers.set(id, watcher);
    return () => {
      if (watchers.has(id)) {
        watchers.delete(id);
      }
    };
  };
  const dispatch = (value: T) => {
    watchers.forEach(watcher => watcher(value));
  };
  return {
    watch,
    dispatch,
  };
};
