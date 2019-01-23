export interface ITransform3dDigester {
  x?: number | string;
  y?: number | string;
  z?: number | string;
}

export interface ITransformDigester {
  rotate?: number | string | ITransform3dDigester;
  scale?: number | ITransform3dDigester;
  translate?: number | ITransform3dDigester;
  transform?: {
    rotate?: number | string | ITransform3dDigester;
    scale?: number | ITransform3dDigester;
    translate?: number | ITransform3dDigester;
  };
}

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (
  rotate?: number | string | ITransform3dDigester
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    transforms = createTransform(
      'rotate',
      typeof rotate === 'number' ? `${rotate}deg` : rotate
    );
    if (!transforms) {
      const { x, y, z } = rotate as ITransform3dDigester;
      transforms = [
        transforms,
        createTransform('rotateX', typeof x === 'number' ? `${x}deg` : x),
        createTransform('rotateY', typeof y === 'number' ? `${y}deg` : y),
        createTransform('rotateZ', typeof z === 'number' ? `${z}deg` : z),
      ]
        .filter(exists => exists)
        .join(' ')
        .trim();
    }
  }
  return transforms;
};

const createScaleTransform = (
  scale?: number | ITransform3dDigester
): string => {
  let transforms = '';
  if (scale !== undefined) {
    transforms = createTransform('scale', scale);
    if (!transforms) {
      const { x, y, z } = scale as ITransform3dDigester;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};

const createTranslateTransform = (
  translate?: number | ITransform3dDigester
): string => {
  let transforms = '';
  if (translate !== undefined) {
    transforms = createTransform('translate', translate);
    if (!transforms) {
      const { x, y, z } = translate as ITransform3dDigester;
      const format = (value?: number | string) =>
        typeof value === 'string' ? value : `${value || 0}px`;
      transforms =
        z === undefined
          ? `translate(${format(x)}, ${format(y)})`
          : `translate3d(${format(x)}, ${format(y)}, ${format(z)})`;
    }
  }
  return transforms;
};

export const digestTransform = ({
  transform,
  rotate,
  scale,
  translate,
}: ITransformDigester) => {
  const css: string = [
    createRotateTransform(transform && transform.rotate),
    createRotateTransform(rotate),
    createScaleTransform(transform && transform.scale),
    createScaleTransform(scale),
    createTranslateTransform(transform && transform.translate),
    createTranslateTransform(translate),
  ]
    .filter(exists => exists)
    .join(' ')
    .trim();
  return css ? { transform: css } : {};
};
