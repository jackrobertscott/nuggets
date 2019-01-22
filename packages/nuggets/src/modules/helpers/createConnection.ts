import { createDispatcher } from './createDispatcher';

export interface IConnectionValue {
  [name: string]: any;
}

export interface IConnectionError {
  thrown?: Error;
  message?: string;
}

export interface IcreateConnectionOptions {
  handler: (value: IConnectionValue) => Promise<IConnectionValue>;
}

export interface IConnectionCallbacks {
  defaults?: any;
  data: (data: IConnectionValue) => any;
  error: (error: IConnectionError) => any;
}

export type IConnection = (
  { data, error }: IConnectionCallbacks
) => [((value?: any) => any), (() => any), ...Array<(() => any)>];

export const createConnection = ({
  handler,
}: IcreateConnectionOptions): IConnection => {
  let previous: any;
  const dataDispatcher = createDispatcher<IConnectionValue>();
  const errorDispatcher = createDispatcher<IConnectionError>();
  return ({ defaults, data, error }) => {
    const runner = (value: any) => {
      handler(value)
        .then(data)
        .catch(thrown => ({ thrown, message: thrown.message }));
    };
    const execute = (value?: any) => {
      previous = {
        ...(defaults || {}),
        ...(value || {}),
      };
      runner(previous);
    };
    const refresh = () => runner(previous);
    return [
      execute,
      refresh,
      dataDispatcher.watch(data),
      errorDispatcher.watch(error),
    ];
  };
};
