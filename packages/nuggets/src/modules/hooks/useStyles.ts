import { useEffect, useState } from 'react';
import {
  IStylesOptions,
  IStylesDigester,
  createCSSFromStyles,
} from '../../utils/styles';
import { emotion } from '../../utils/emotion';

export interface IuseFrameStylesProps {
  classname?: string;
}

export const useFrameStyles = (
  styles: IStylesOptions<IStylesDigester>
): IuseFrameStylesProps => {
  const [classname, change] = useState<string | undefined>(undefined);
  useEffect(
    () => {
      const css = createCSSFromStyles(styles);
      const name = emotion.css(css);
      change(name);
    },
    [styles]
  );
  return {
    classname,
  };
};