import {
  FunctionComponent,
  ReactElement,
  useState,
  createElement,
} from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import {
  createCSSFromDigests,
  ICSSObject,
  IDigestArray,
} from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import { FormProvider } from '../utils/form';

export interface IFormStyles {
  overrides?: ICSSObject;
}

const digests: IDigestArray<IFormStyles> = [
  ({ overrides }) => overrides !== undefined && overrides,
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
