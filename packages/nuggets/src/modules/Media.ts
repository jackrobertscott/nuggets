import {
  FunctionComponent,
  ReactNode,
  useState,
  ReactElement,
  useEffect,
} from 'react';

export interface IMediaChildren {
  width: number;
  height: number;
}

export interface IMediaProps {
  children: ({ width, height }: IMediaChildren) => ReactNode;
}

export const Media: FunctionComponent<IMediaProps> = ({ children }) => {
  const [sizes, change] = useState<IMediaChildren>({
    width: 0,
    height: 0,
  });
  const update = () =>
    change({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });
  return children(sizes) as ReactElement<any>;
};

Media.displayName = 'Media';
