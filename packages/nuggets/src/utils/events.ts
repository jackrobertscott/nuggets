export interface IEventsPayload {
  event?: any;
}

export type IEventsExecuter<T> = (value: T, { event }: IEventsPayload) => any;

export interface IEventsObject {
  [name: string]: IEventsExecuter<any> | undefined;
}

export type IDOMEvent = (event: any) => any;

export interface IEventsMapper {
  [name: string]: IEventsObject | undefined;
}

export type IEventsProps<E> = E & {
  events?: E;
};

export type IEventsDigester<E> = (options: E) => IEventsObject;

export type IEventsDigesterArray<E> = Array<IEventsDigester<E>>;

const eventify = <E>(digests: IEventsDigesterArray<E>, options: E) => {
  return digests
    .map(digester => digester(options) as IEventsObject)
    .filter(exists => exists)
    .reduce((accum, next) => ({ ...accum, ...next }), {}) as IEventsMapper;
};

export const createEvents = <E>(
  options: IEventsProps<E>,
  digests: IEventsDigesterArray<E>
): IEventsMapper => {
  const events = options.events || {};
  const eventsOptions = { ...events, ...options };
  return eventify<E>(digests, eventsOptions);
};
