import { useEffect, useState } from 'react';
import { css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { createCSSFromProps } from '../../utils/styles';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { tag } from '../../utils/emotion';

export interface IuseTextStylesOptions {
  [property: string]: any;
}

export interface IuseTextStylesProps {
  name?: string;
  styles?: string;
}

export const useTextStyles = (
  options: IuseTextStylesOptions
): IuseTextStylesProps => {
  const [{ styles, name }, change] = useState<{
    name?: string;
    styles?: string;
  }>({});
  const sheet = new StyleSheet({
    key: tag,
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
