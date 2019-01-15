import React from 'react';
import { Canvas, Square, Text, Circle, Linear } from 'nuggets';

const BackgroundCard = () => (
  <Canvas color="white">
    <Linear direction="down">
      <Square
        color="black"
        corners={3}
        inside={10}
        outside={20}
        border={[
          {
            color: 'yellow',
            thickness: 3,
            sides: ['top', 'bottom'],
          },
          {
            color: 'green',
            sides: ['right', 'left'],
          },
        ]}
      >
        <Linear direction="down">
          <Linear direction="right">
            <Text color="white">Free before 11</Text>
            <Text color="white" align="right">
              Open 9pm to 4am
            </Text>
          </Linear>
          <Linear direction="right">
            <Text
              color="white"
              align="center"
              decoration={{
                lines: ['underline', 'overline'],
                color: 'yellow',
                style: 'dotted',
              }}
            >
              Rapture
            </Text>
          </Linear>
          <Linear direction="right">
            <Square>
              <Text color="white">78 James St.</Text>
              <Text color="white">Northbridge 6003 Australia</Text>
            </Square>
            <Text color="white">Next to the Brass Monkey</Text>
          </Linear>
        </Linear>
      </Square>
    </Linear>
  </Canvas>
);

export default BackgroundCard;
