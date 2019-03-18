import { createDispatcher, Dispatcher } from './createDispatcher';

export interface IConnectionValue {
  [name: string]: any;
}

export interface IConnectionError {
  message?: string;
  thrown?: Error;
}

export interface IConnectionOptions<E> {
  handler: (value: any) => Promise<any>;
  defaults: E;
}

export interface IConnectionCallbacks {
  data: (data: IConnectionValue) => any;
  error: (error: IConnectionError) => any;
  loading: (loading: boolean) => any;
}

export class Connection<E, T extends IConnectionValue> {
  private handler: (value: E) => Promise<T>;
  private defaults: E;
  private previous: any;
  private dataDispatcher: Dispatcher<T>;
  private errorDispatcher: Dispatcher<IConnectionError>;
  private loadingDispatcher: Dispatcher<boolean>;

  constructor({ handler, defaults }: IConnectionOptions<E>) {
    this.handler = handler;
    this.defaults = defaults;
    this.previous = {};
    this.dataDispatcher = createDispatcher<T>();
    this.errorDispatcher = createDispatcher<IConnectionError>();
    this.loadingDispatcher = createDispatcher<boolean>();
  }

  public execute(value?: T): Promise<void | T> {
    this.previous = {
      ...this.defaults,
      ...(value || {}),
    };
    return this.dooer(this.previous);
  }

  public refresh(): Promise<void | T> {
    return this.dooer(this.previous);
  }

  public attach({ ...executors }: IConnectionCallbacks): () => void {
    const tasks = [
      this.dataDispatcher.watch(executors.data),
      this.errorDispatcher.watch(executors.error),
      this.loadingDispatcher.watch(executors.loading),
    ];
    return () => {
      tasks.forEach(unwatch => unwatch());
    };
  }

  public async dooer(value: E): Promise<void | T> {
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
    }
  }
}

export const createConnection = <E>({
  handler,
}: {
  handler: (value: E) => Promise<any>;
}) => {
  return <T>(defaults: E): Connection<E, any> => {
    return new Connection<E, T>({ handler, defaults });
  };
};
