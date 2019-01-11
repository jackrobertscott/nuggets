import {
  FunctionComponent,
  ReactElement,
  createElement,
  cloneElement,
} from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests } from '../utils/styles';
import { CSSObject, css } from 'styled-components';
import { createEvents, IEvents } from '../utils/events';
import { FormConsumer, IFormContext } from '../utils/form';

export interface IInputStyles {
  overrides?: CSSObject;
}

const digests: Array<(options: IInputStyles) => string | false> = [
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type IInputProps = {
  name: string;
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<IInputStyles, IEvents>;

export const Input: FunctionComponent<IInputProps> = ({
  children,
  name,
  ...options
}) => {
  const InterInput = createDomPiece({
    children,
    options,
    attrs: {
      ...createEvents(options),
      name,
    },
    css: createCSSFromDigests<IInputStyles>(options, digests),
    type: 'input',
  });
  const render = ({ data, change }: IFormContext) =>
    cloneElement(InterInput, {
      value: data[name],
      onChange: ({ target }: any) => change({ name, value: target.value }),
    });
  return createElement(FormConsumer, {
    children: render as any,
  });
};
