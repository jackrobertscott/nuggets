export interface IEventParams {
  event: any;
}

export interface IEvents {
  click?: ({ event }: IEventParams) => any;
}

export const createEvents = ({ click }: IEvents) => {
  return {
    onClick: click,
  };
};
