import { FunctionComponent, ReactElement } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import {
  createCSSFromDigests,
  ICSSObject,
  IDigestArray,
} from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';

export interface ILinearStyles {
  direction?: 'right' | 'left' | 'up' | 'down';
  overrides?: ICSSObject;
}

const digests: IDigestArray<ILinearStyles> = [
  () => ({
    flexGrow: 1,
    display: 'flex',
    overflow: 'auto',
  }),
  ({ direction }) => {
    let value;
    switch (direction) {
      default:
      case 'down':
        value = 'column';
        break;
      case 'up':
        value = 'column-reverse';
        break;
      case 'right':
        value = 'row';
        break;
      case 'left':
        value = 'row-reverse';
        break;
    }
    return { flexDirection: value };
  },
  ({ overrides }) => overrides !== undefined && overrides,
];

export type ILinearProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<ILinearStyles, IEvents>;

export const Linear: FunctionComponent<ILinearProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<ILinearStyles>(options, digests),
  });
};
