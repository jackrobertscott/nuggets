import { useEffect, useState } from 'react';
import { createCSSFromProps } from '../../utils/styles';
import { digestShape, IShapeDigester } from '../../styles/shape';
import { emotion } from '../../utils/emotion';

export interface IuseFrameStylesOptions {
  [property: string]: any;
}

export interface IuseFrameStylesProps {
  classname?: string;
}

export const useFrameStyles = (
  options: IuseFrameStylesOptions
): IuseFrameStylesProps => {
  const [classname, change] = useState<string | undefined>(undefined);
  useEffect(
    () => {
      const css = createCSSFromProps<IShapeDigester>(options, digestShape);
      const name = emotion.css(css);
      change(name);
    },
    [options]
  );
  return {
    classname,
  };
};
