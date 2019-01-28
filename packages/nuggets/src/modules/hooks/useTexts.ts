import { useEffect, useState } from 'react';
import { css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { FunctionHook } from '../../utils/types';
import { createCSSFromProps } from '../../utils/styles';
import { digestTexts, ITextsDigester } from '../../styles/texts';

export interface IuseTextsOptions {
  [property: string]: any;
}

export interface IuseTextsProps {
  name?: string;
  styles?: string;
}

export const useTexts: FunctionHook<
  IuseTextsOptions,
  IuseTextsProps
> = options => {
  const [{ styles, name }, change] = useState<{
    name?: string;
    styles?: string;
  }>({});
  const sheet = new StyleSheet({
    key: '',
    container: document.head,
  });
  useEffect(
    () => {
      const css = createCSSFromProps<ITextsDigester>(options, digestTexts);
      const things = emotion(css);
      sheet.insert(`.${things.name} {${things.styles}}`);
      change(things);
      return () => sheet.flush();
    },
    [styles]
  );
  return {
    styles,
    name,
  };
};
