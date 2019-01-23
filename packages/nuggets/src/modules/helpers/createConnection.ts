import { createDispatcher } from './createDispatcher';

export interface IConnectionValue {
  [name: string]: any;
}

export type IConnectionError =
  | {
      thrown?: Error;
      message?: string;
    }
  | undefined;

export interface IcreateConnectionOptions {
  handler: (value: IConnectionValue) => Promise<IConnectionValue>;
}

export interface IConnectionCallbacks {
  defaults?: any;
  data: (data: IConnectionValue) => any;
  error: (error: IConnectionError) => any;
  loading: (loading: boolean) => any;
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
  const loadingDispatcher = createDispatcher<boolean>();
  return ({ defaults, ...executors }) => {
    const runner = (value: any) => {
      loadingDispatcher.dispatch(true);
      handler(value)
        .then(data => {
          dataDispatcher.dispatch(data);
          loadingDispatcher.dispatch(false);
        })
        .catch(error => {
          errorDispatcher.dispatch({
            thrown: error,
            message: error.message,
          });
          loadingDispatcher.dispatch(false);
        });
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
      dataDispatcher.watch(executors.data),
      errorDispatcher.watch(executors.error),
      loadingDispatcher.watch(executors.loading),
    ];
  };
};
