import React, { FunctionComponent } from 'react';
import { Square, Text } from 'nuggets';

const niceShadow = [
  { down: -100, color: 'blue', blur: 20, grow: 10 },
  { down: -100, color: 'rgba(0, 0, 0, 0.3)', blur: 20, grow: 30 },
  { down: -100, color: 'yellow', blur: 20, grow: 50 },
];

const HelloForm: FunctionComponent = () => (
  <Square color="green" shadow={niceShadow}>
    <Text color="yellow">Dan Scott</Text>
  </Square>
);

export default HelloForm;
