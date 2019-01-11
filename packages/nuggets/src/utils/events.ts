export interface IEventParams {
  event: any;
}

export interface IEventProps<E> {
  events?: E;
}

export interface IEvents {
  click?: ({ event }: IEventParams) => any;
  change?: ({ event }: IEventParams) => any;
}

const transfromEvent = (cb: ({ event }: IEventParams) => any) => {
  return (event: any) => cb({ event });
};

export const createEvents = ({
  events,
  ...others
}: IEvents & IEventProps<IEvents>) => {
  const { click, change } = { ...events, ...others };
  const callbacks: any = {
    onClick: click && transfromEvent(click),
    onChange: change && transfromEvent(change),
  };
  return Object.keys(callbacks).reduce((accum: any, key) => {
    if (callbacks[key]) {
      accum[key] = callbacks[key];
    }
    return accum;
  }, {});
};
