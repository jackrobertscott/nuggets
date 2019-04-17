import { useEffect, useState } from 'react';
import { createCSSFromProps } from '../../utils/styles';
import { digestTexts, ITextsDigester } from '../../styles/texts';
import { emotion } from '../../utils/emotion';

export interface IuseTextStylesOptions {
  [property: string]: any;
}

export interface IuseTextStylesProps {
  classname?: string;
}

export const useTextStyles = (
  options: IuseTextStylesOptions
): IuseTextStylesProps => {
  const [classname, change] = useState<string | undefined>(undefined);
  useEffect(
    () => {
      const css = createCSSFromProps<ITextsDigester>(options, digestTexts);
      const name = emotion.css(css);
      change(name);
    },
    [options]
  );
  return {
    classname,
  };
};
