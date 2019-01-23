import { css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { FunctionHook, ICSS } from '../../utils/types';
import { useEffect, useState } from 'react';

export interface IuseStylesOptions {
  [name: string]: any;
}

export interface IuseStylesProps {
  css: ICSS;
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
  const css = styles; // Todo: compile styles...
  useEffect(
    () => {
      const things = emotion(css);
      sheet.insert(`.${things.name} {${things.styles}}`);
      change(things);
      return () => sheet.flush();
    },
    [data.styles]
  );
  return {
    css,
    ...data,
  };
};
