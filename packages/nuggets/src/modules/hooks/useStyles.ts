import { css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { FunctionHook } from '../../utils/types';
import { useEffect, useState } from 'react';
import { createCSSFromStyles } from '../../utils/styles';

export interface IuseStylesOptions {
  [name: string]: any;
}

export interface IuseStylesProps {
  name?: string;
  styles?: string;
}

export const useStyles: FunctionHook<
  IuseStylesOptions,
  IuseStylesProps
> = styles => {
  const [data, change] = useState<{ name?: string; styles?: string }>({});
  const sheet = new StyleSheet({
    key: '',
    container: document.head,
  });
  useEffect(
    () => {
      const css = createCSSFromStyles(styles);
      const things = emotion(css);
      sheet.insert(`.${things.name} {${things.styles}}`);
      change(things);
      return () => sheet.flush();
    },
    [data.styles]
  );
  return {
    ...data,
  };
};
