import { ICSSObject } from '../utils/styles';

export interface ICornersObjectDigester {
  radius: number;
}

export interface ICornersDigester {
  corners?: number | ICornersObjectDigester;
}

export const digestCorners = ({ corners }: ICornersDigester) => {
  const css: ICSSObject = {};
  if (corners !== undefined) {
    if (typeof corners === 'number') {
      css.borderRadius = `${corners}px`;
    } else {
      const { radius = 0 } = corners;
      css.borderRadius = `${radius}px`;
    }
  }
  return css;
};
