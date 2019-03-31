import {
  createDispatcher,
  IDispatcherWatcher,
  Dispatcher,
} from './createDispatcher';

export interface IStoreValue {
  [name: string]: any;
}

export interface IStoreOptions<T> {
  local?: string;
  defaults: T;
}

export class Store<T extends IStoreValue> {
  private value: T;
  private defaults: T;
  private dispatcher: Dispatcher<T>;
  private local?: string;

  constructor({ defaults, local }: IStoreOptions<T>) {
    this.value = defaults;
    this.defaults = defaults;
    this.dispatcher = createDispatcher<T>();
    this.local = local;
    if (this.local) {
      try {
        const data = localStorage.getItem(this.local);
        this.value = data ? JSON.parse(data) : this.value;
      } catch (e) {
        console.error(e);
        localStorage.removeItem(this.local);
      }
    }
  }

  public change(data?: T): void {
    this.value = {
      ...this.defaults,
      ...this.value,
      ...(data || {}),
    };
    if (this.local) {
      try {
        const update = JSON.stringify(this.value);
        localStorage.setItem(this.local, update);
      } catch (e) {
        console.error(e);
        localStorage.removeItem(this.local);
      }
    }
    this.dispatcher.dispatch(this.value);
  }

  public reset(): void {
    this.value = { ...this.defaults };
    if (this.local) {
      try {
        const update = JSON.stringify(this.value);
        localStorage.setItem(this.local, update);
      } catch (e) {
        console.error(e);
        localStorage.removeItem(this.local);
      }
    }
    this.dispatcher.dispatch(this.value);
  }

  public attach(watcher: IDispatcherWatcher<T>): () => void {
    return this.dispatcher.watch(watcher);
  }

  public state(): T {
    return { ...this.value };
  }
}

export const createStore = <T>({
  defaults,
  local,
  ...args
}: IStoreOptions<T>): Store<T> => {
  return new Store({ defaults, local, ...args });
};
