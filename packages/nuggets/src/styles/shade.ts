export interface IShadowObjectDigester {
  color?: string;
  blur?: number;
  grow?: number;
  down?: number;
  across?: number;
}

export interface IShadowDigester {
  shadow?: IShadowObjectDigester | IShadowObjectDigester[];
}

export const digestShadow = ({ shadow }: IShadowDigester) => {
  if (shadow === undefined) {
    return {};
  }
  const shadows = Array.isArray(shadow) ? shadow : [shadow];
  const shade = shadows
    .map((item: IShadowObjectDigester) => {
      const { color = '#000', blur = 0, grow = 0, down = 0, across = 0 } = item;
      return `${across}px ${down}px ${blur}px ${grow}px ${color}`;
    })
    .join(', ');
  return {
    boxShadow: shade,
  };
};
