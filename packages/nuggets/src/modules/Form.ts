import {
  FunctionComponent,
  ReactElement,
  createRef,
  useState,
  createElement,
} from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests } from '../utils/styles';
import { CSSObject, css } from 'styled-components';
import { createEvents, IEvents, IEventParams } from '../utils/events';
import { FormProvider } from '../utils/form';

export interface IFormStyles {
  overrides?: CSSObject;
}

const digests: Array<(options: IFormStyles) => string | false> = [
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
  const [data, change] = useState({});
  const InterForm = createDomPiece({
    children,
    options,
    attrs: createEvents(options),
    css: createCSSFromDigests<IFormStyles>(options, digests),
  });
  const provider = {
    data,
    change: ({ name, value }: { name: string; value: any }) => {
      change({ ...data, [name]: value });
    },
  };
  return createElement(FormProvider, { value: provider }, InterForm);
};
