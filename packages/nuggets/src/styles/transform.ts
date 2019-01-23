import { IDigester } from '../utils/styles';

export interface ITransform3dOptions {
  x?: number | string;
  y?: number | string;
  z?: number | string;
}

export interface ITransformDigester {
  rotate?: number | string | ITransform3dOptions;
  scale?: number | ITransform3dOptions;
  translate?: number | ITransform3dOptions;
}

export const digestTransform: IDigester<ITransformDigester> = ({
  rotate,
  scale,
  translate,
}: ITransformDigester) => {
  const transforms: string[] = [];
  if (rotate !== undefined) {
    transforms.push(createRotateTransform(rotate));
  }
  if (scale !== undefined) {
    transforms.push(createScaleTransform(scale));
  }
  if (translate !== undefined) {
    transforms.push(createTranslateTransform(translate));
  }
  if (transforms.length) {
    return {
      transform: transforms
        .filter(exists => exists)
        .join(' ')
        .trim(),
    };
  }
  return {};
};

const createTransform = (name: string, value: any): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${name}(${value})`;
  }
  return '';
};

const createRotateTransform = (
  rotate?: number | string | ITransform3dOptions
): string => {
  let transforms = '';
  if (rotate !== undefined) {
    transforms = createTransform(
      'rotate',
      typeof rotate === 'number' ? `${rotate}deg` : rotate
    );
    if (!transforms) {
      const { x, y, z } = rotate as ITransform3dOptions;
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

const createScaleTransform = (scale?: number | ITransform3dOptions): string => {
  let transforms = '';
  if (scale !== undefined) {
    transforms = createTransform('scale', scale);
    if (!transforms) {
      const { x, y, z } = scale as ITransform3dOptions;
      transforms =
        z === undefined
          ? `scale(${x || 1}, ${y || 1})`
          : `scale3d(${x || 1}, ${y || 1}, ${z || 1})`;
    }
  }
  return transforms;
};

const createTranslateTransform = (
  translate?: number | ITransform3dOptions
): string => {
  let transforms = '';
  if (translate !== undefined) {
    transforms = createTransform('translate', translate);
    if (!transforms) {
      const { x, y, z } = translate as ITransform3dOptions;
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
