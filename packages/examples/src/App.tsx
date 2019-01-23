import React from 'react';
import { Square, Out, Layer, useMedia } from 'nuggets';

export default () => {
  const { width } = useMedia();
  return (
    <Layer>
      <Square
        events={{
          click: () => console.log('you'),
          mouseEnter: () => console.log('hello'),
          mouseLeave: () => console.log('there'),
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
        <Out value={'Name'} />
      </Square>
    </Layer>
  );
};
