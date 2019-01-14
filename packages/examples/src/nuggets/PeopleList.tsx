import React, { FunctionComponent } from 'react';
import { Linear, Square, Text, Circle, ITextStylesProps } from 'nuggets';

const people: Array<{ name: string }> = [
  { name: 'atlantis' },
  { name: 'atlantis' },
  { name: 'atlantis' },
  { name: 'atlantis' },
];

const textStyle: ITextStylesProps = {
  color: 'yellow',
  family: 'monospace',
  align: 'right',
};

const PeopleList: FunctionComponent = () => (
  <Linear>
    {people.map(({ name }, index) => (
      <Square
        key={name + index}
        color="green"
        press={{ color: 'blue' }}
        border={{
          color: 'blue',
          thickness: 5,
          style: 'dashed',
          sides: ['bottom', 'top'],
        }}
        orbit={30}
        shadow={{ blur: 5 }}
        corners={{ radius: 20 }}
        into={{
          onClick: () => console.log('square', name, index),
        }}
      >
        <Circle diameter={30} color="blue" orbit={30} />
        <Text color="yellow" style={textStyle}>
          {name}: {index}
        </Text>
      </Square>
    ))}
  </Linear>
);

export default PeopleList;
