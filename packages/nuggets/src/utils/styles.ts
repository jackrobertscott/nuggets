import { createElement } from 'react';
import styled from 'styled-components';

export interface IStyledPiece {
  children?: any;
  css: string;
}

export const createStyledPiece = ({ children, css }: IStyledPiece) => {
  const styledPiece = styled.div`
    ${css}
  `;
  return createElement(styledPiece, { children });
};

export interface ITransitionProps<T> {
  style?: T;
  hover?: T;
  press?: T;
  visited?: T;
}

export type IStyledNugget<T> = T & ITransitionProps<T>;

export type IDigest<T> = (options: T) => string | false;

export type IDigestArray<T> = Array<IDigest<T>>;

export const createCSSFromDigests = <T>(
  options: IStyledNugget<T>,
  digests: IDigestArray<T>
): string => {
  const { style, hover, press, visited, ...others } = options;
  const stylize = (config: T) =>
    digests
      .map(rule => rule(config))
      .filter(exists => exists)
      .join('\n');
  const substylize = (access: string, data?: T): string => {
    if (data) {
      return `
      ${access} {
        ${stylize(data)}
      }
    `;
    }
    return '';
  };
  const css = stylize({ ...style, ...others } as any);
  return `
    ${css}
    ${substylize('&:hover', hover)}
    ${substylize('&:active', press)}
    ${substylize('&:visited', visited)}
  `;
};
