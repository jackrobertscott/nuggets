import { createDispatcher, Dispatcher } from './createDispatcher';

export interface IConnectionDefaults {
  [name: string]: any;
}

export interface IConnectionValue {
  [name: string]: any;
}

export interface IConnectionError {
  message?: string;
  thrown?: Error;
}

export interface IConnectionOptions<E extends IConnectionDefaults, T> {
  handler: (value: E) => Promise<T>;
  defaults: E;
}

export interface IConnectionCallbacks<T extends IConnectionValue> {
  data: (data: T) => any;
  error: (error: IConnectionError) => any;
  loading: (loading: boolean) => any;
}

export class Connection<
  E extends IConnectionDefaults,
  T extends IConnectionValue
> {
  private handler: (value: E) => Promise<T>;
  private defaults: E;
  private previous: E;
  private dataDispatcher: Dispatcher<T>;
  private errorDispatcher: Dispatcher<IConnectionError>;
  private loadingDispatcher: Dispatcher<boolean>;

  constructor({ handler, defaults }: IConnectionOptions<E, T>) {
    this.handler = handler;
    this.defaults = defaults;
    this.previous = this.defaults;
    this.dataDispatcher = createDispatcher<T>();
    this.errorDispatcher = createDispatcher<IConnectionError>();
    this.loadingDispatcher = createDispatcher<boolean>();
  }

  public execute(value?: E): Promise<T> {
    this.previous = {
      ...this.defaults,
      ...(value || {}),
    };
    return this.dooer(this.previous);
  }

  public refresh(): Promise<T> {
    return this.dooer(this.previous);
  }

  public attach({ ...executors }: IConnectionCallbacks<T>): () => void {
    const tasks = [
      this.dataDispatcher.watch(executors.data),
      this.errorDispatcher.watch(executors.error),
      this.loadingDispatcher.watch(executors.loading),
    ];
    return () => {
      tasks.forEach(unwatch => unwatch());
    };
  }

  public async dooer(value: E): Promise<T> {
    this.loadingDispatcher.dispatch(true);
    try {
      const data = await this.handler(value);
      this.dataDispatcher.dispatch(data);
      this.loadingDispatcher.dispatch(false);
      return data;
    } catch (error) {
      this.errorDispatcher.dispatch({
        thrown: error,
        message: error.message,
      });
      this.loadingDispatcher.dispatch(false);
      throw error;
    }
  }
}

export const createConnection = <E extends IConnectionDefaults>({
  handler,
}: {
  handler: (value: E) => Promise<any>;
}) => {
  return <T>(defaults: E): Connection<E, T> => {
    return new Connection<E, T>({ handler, defaults });
  };
};
