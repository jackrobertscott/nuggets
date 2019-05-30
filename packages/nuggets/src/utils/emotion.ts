import createEmotion from 'create-emotion';
import { standardize } from './clean';

export const prefix = `nuggets`;

export const emotion = createEmotion({
  key: prefix,
});

export const keyframes = emotion.keyframes;

export const cleanClassname = `${prefix}-${Math.random()
  .toString()
  .slice(-7)}`;

emotion.sheet.insert(`.${cleanClassname} {${standardize}}`);
