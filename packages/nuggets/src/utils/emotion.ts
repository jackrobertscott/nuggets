import createEmotion from 'create-emotion';

export const tag = `nuggets`;

export const emotion = createEmotion({
  key: tag,
});

export const keyframes = emotion.keyframes;
