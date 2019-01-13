export interface IEventsObject {
  [name: string]: ({ event }: { event: any }) => any;
}

export interface IEventsMap {
  [name: string]: (event: any) => any;
}

export type IEventsProps<E> = E & {
  events?: E;
};

export type IEventsDigester<S> = (options: S) => IEventsObject;

export type IEventsDigesterArray<S> = Array<IEventsDigester<S>>;

export const createEvents = <E>(
  options: IEventsProps<E>,
  digests: IEventsDigesterArray<E>
): IEventsMap => {
  const events = options.events || {};
  return eventify(digests, { ...events, ...options });
};

const eventify = <E>(digests: IEventsDigesterArray<E>, options: E) => {
  return digests
    .map(digester => digester(options))
    .filter(exists => exists)
    .reduce((accum, next) => ({ ...accum, ...next }), {});
};
