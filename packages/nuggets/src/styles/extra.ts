export interface ITransitionDigester {
  transition?: number;
}

export const digestTransition = ({ transition }: ITransitionDigester) => {
  if (transition === undefined) {
    return {};
  }
  return { transition: `${transition}ms` };
};

export interface ICursorDigester {
  cursor?: string;
}

export const digestCursor = ({ cursor }: ICursorDigester) => {
  if (cursor === undefined) {
    return {};
  }
  return { cursor };
};
