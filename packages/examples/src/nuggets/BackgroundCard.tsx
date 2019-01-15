import React from 'react';
import { Canvas, Square, Text, Linear } from 'nuggets';

const BackgroundCard = () => (
  <Canvas color="white">
    <Linear direction="down">
      <Square
        color="black"
        outside={30}
        corners={3}
        inside={10}
        rotate={{
          y: 60,
          z: '1rad',
          x: 20,
        }}
      >
        <Text color="white">Hello</Text>
      </Square>
    </Linear>
  </Canvas>
);

export default BackgroundCard;
