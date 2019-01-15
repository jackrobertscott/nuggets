import React from 'react';
import { Canvas, Square, Text } from 'nuggets';

const BackgroundCard = () => (
  <Canvas color="white">
    <Square color="black" corners={3} inside={10} outside={20}>
      <Text color="white">Hello</Text>
    </Square>
  </Canvas>
);

export default BackgroundCard;
