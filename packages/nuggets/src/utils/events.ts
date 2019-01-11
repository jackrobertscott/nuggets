export interface IEventParams {
  event: any;
}

export interface IEventProps<E> {
  events?: E;
}

export interface IEvents {
  click?: ({ event }: IEventParams) => any;
}

export const createEvents = ({
  events,
  ...others
}: IEvents & IEventProps<IEvents>) => {
  const { click } = { ...events, ...others };
  return {
    onClick: click,
  };
};
