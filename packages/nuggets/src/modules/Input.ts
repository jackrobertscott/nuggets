import {
  FunctionComponent,
  ReactElement,
  createElement,
  cloneElement,
} from 'react';
import { createDomPiece, INugget } from '../utils/dom';
import { createCSSFromDigests, IDigestArray } from '../utils/styles';
import { createEvents, IEvents } from '../utils/events';
import { FormConsumer, IFormContext } from '../utils/form';
import { digestOverrides, IOverridesDigest } from '../utils/digests';

export type IInputStyles = IOverridesDigest;

const digests: IDigestArray<IInputStyles> = [digestOverrides];

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
