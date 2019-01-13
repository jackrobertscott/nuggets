import {
  FunctionComponent,
  useState,
  createElement,
  useEffect,
  ReactNode,
} from 'react';
import { INugget } from '../utils/dom';
import { IDigestArray } from '../utils/styles';
import { FormProvider, IFormContext, IFormValue } from '../utils/form';
import { digestOverrides, IOverridesDigest } from '../utils/digests';

export type IFormProps = {
  children?: ReactNode;
  value?: IFormValue;
  change?: (value: IFormValue) => any;
} & INugget<IFormStyles, {}>;

export const Form: FunctionComponent<IFormProps> = ({
  children,
  ...options
}) => {
  const [value, change] = useState<IFormValue>(options.value || {});
  useEffect(
    () => {
      change(options.value || {});
    },
    [options.value]
  );
  const context: IFormContext = {
    value,
    update: data => {
      const state = { ...value, ...data };
      change(state);
      if (options.change) {
        options.change(state);
      }
    },
  };
  return createElement(FormProvider, { value: context, children });
};

Form.displayName = 'Form';

export type IFormStyles = IOverridesDigest;

const digests: IDigestArray<IFormStyles> = [digestOverrides];
