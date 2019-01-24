import React from 'react';
import { Piece, Out, useToggle } from 'nuggets';

export const Button = () => {
  const { on, off, active } = useToggle();
  return (
    <Piece
      events={{
        click: () => console.log('you'),
        mouseEnter: on,
        mouseLeave: off,
      }}
      styles={{
        frame: {
          space: 30,
        },
        shape: {
          color: 'green',
          borders: {
            color: 'red',
            thickness: 5,
            sides: ['south'],
          },
          corners: {
            radius: 20,
            points: ['south'],
          },
          hover: {
            color: 'blue',
            corners: {
              radius: 20,
              points: ['north'],
            },
            borders: {
              thickness: 5,
              sides: ['north'],
            },
          },
        },
        texts: {
          color: 'white',
        },
        extra: {
          transition: 200,
        },
      }}
    >
      <Out value={String(active)} />
    </Piece>
  );
};
