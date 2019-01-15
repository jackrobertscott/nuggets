import React from 'react';
import { Canvas, Square, Text } from 'nuggets';

const BackgroundCard = () => (
  <Square
    color="black"
    corners={3}
    inside={10}
    border={{ color: 'green', thickness: 1 }}
  >
    <Text color="white">Hello</Text>
  </Square>
);

export default BackgroundCard;
