import { useEffect, useState } from 'react';
import { css as emotion } from '@emotion/core';
import { StyleSheet } from '@emotion/sheet';
import { createCSSFromProps } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';
import { tag } from '../../utils/emotion';

export interface IuseFrameStylesOptions {
  [property: string]: any;
}

export interface IuseFrameStylesProps {
  name?: string;
  styles?: string;
}

export const useFrameStyles = (
  options: IuseFrameStylesOptions
): IuseFrameStylesProps => {
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
      const css = createCSSFromProps<IShapeDigester>(options, digestShape);
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
