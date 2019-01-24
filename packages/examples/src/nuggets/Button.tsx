import React from 'react';
import { Frame, Out, useToggle } from 'nuggets';

export const Button = () => {
  const { on, off, active } = useToggle();
  return (
    <Frame
      events={{
        click: () => console.log('you'),
        mouseEnter: on,
        mouseLeave: off,
      }}
      styles={{
        shape: {
          color: 'green',
          space: 30,
          hover: {
            color: 'yellow',
          },
        },
        texts: {
          color: 'white',
        },
        borders: {
          color: 'red',
          thickness: 5,
          sides: ['bottom'],
        },
        extra: {
          transition: 200,
        },
      }}
    >
      <Out value={String(active)} />
    </Frame>
  );
};
