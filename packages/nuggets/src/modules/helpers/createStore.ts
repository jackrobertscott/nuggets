import {
  createDispatcher,
  IDispatcherWatcher,
  Dispatcher,
} from './createDispatcher';

export interface IStoreValue {
  [name: string]: any;
}

export interface IStoreOptions<T> {
  defaults: T;
}

export class Store<T extends IStoreValue> {
  private defaults: T;
  private value: T;
  private dispatcher: Dispatcher<T>;

  constructor({ defaults }: IStoreOptions<T>) {
    this.defaults = defaults;
    this.value = defaults;
    this.dispatcher = createDispatcher<T>();
  }

  public change(data?: T): void {
    this.value = {
      ...this.defaults,
      ...this.value,
      ...(data || {}),
    };
    this.dispatcher.dispatch(this.value);
  }

  public attach(watcher: IDispatcherWatcher<T>): () => void {
    return this.dispatcher.watch(watcher);
  }

  public state(): T {
    return { ...this.value };
  }

  public reset(): void {
    this.value = { ...this.defaults };
  }
}

export const createStore = <T>({ defaults }: IStoreOptions<T>): Store<T> => {
  return new Store({ defaults });
};
