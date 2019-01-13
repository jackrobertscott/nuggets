export type IEventsExecuter = ({ event }: { event: any }) => any;

export interface IEventsObject {
  [name: string]: IEventsExecuter | undefined;
}

export type IDOMEvent = (event: any) => any;

export interface IEventsMapper {
  [name: string]: IDOMEvent | undefined;
}

export type IEventsProps<E> = E & {
  events?: E;
};

export type IEventsDigester<E> = (options: E) => IEventsObject;

export type IEventsDigesterArray<E> = Array<IEventsDigester<E>>;

export const createEvents = <E>(
  options: IEventsProps<E>,
  digests: IEventsDigesterArray<E>
): IEventsMapper => {
  const events = options.events || {};
  return eventify(digests, { ...events, ...options });
};

const eventify = <E>(digests: IEventsDigesterArray<E>, options: E) => {
  return digests
    .map(digester => digester(options))
    .filter(exists => exists)
    .reduce((accum, next) => ({ ...accum, ...next }), {});
};
