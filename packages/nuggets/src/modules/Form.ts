import { FunctionComponent, ReactElement, createRef } from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests } from '../utils/styles';
import { CSSObject, css } from 'styled-components';
import { createEvents, IEvents, IEventParams } from '../utils/events';

export interface IFormStyles {
  overrides?: CSSObject;
}

const digests: Array<(options: IFormProps) => string | false> = [
  ({ overrides }) => {
    return overrides !== undefined && `${css(overrides)}`;
  },
];

export type IFormProps = {
  children?: ReactElement<any> | Array<ReactElement<any>>;
} & INugget<IFormStyles, IEvents>;

export const Form: FunctionComponent<IFormProps> = ({
  children,
  ...options
}) => {
  return createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<IFormStyles>(options, digests),
  });
};