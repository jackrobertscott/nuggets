export interface ICSS {
  [name: string]: string | number | ICSS | undefined;
}

export type IDigester<M> = (options: M) => ICSS;

export type FunctionHook<P, R> = (args: P) => R;

export type IEventsExecuter<T> = (value: T, event?: any) => any;
