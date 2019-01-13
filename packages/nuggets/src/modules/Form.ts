import {
  FunctionComponent,
  ReactElement,
  useState,
  createElement,
} from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import { FormProvider } from '../utils/form';
import { digestOverrides, IOverridesDigest } from '../utils/digests';

export type IFormStyles = IOverridesDigest;

const digests: IDigestArray<IFormStyles> = [digestOverrides];

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
