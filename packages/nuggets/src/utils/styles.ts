import { createElement } from 'react';
import styled, { css, CSSObject } from 'styled-components';

export interface IStyledPiece {
  children?: any;
  overrides?: CSSObject;
  digests: Array<string | undefined>;
}

export const createStyledPiece = ({
  children,
  overrides,
  digests,
}: IStyledPiece) => {
  const styledPiece = styled.div`
    ${digests.filter(exists => exists).join('\n')}
    ${overrides ? css(overrides) : ''}
  `;
  return createElement(styledPiece, { children });
};
