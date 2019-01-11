import React, { FunctionComponent } from 'react';
import { Linear, List, Square, Text, ITextStyles } from 'nuggets';

const people: Array<{ name: string }> = [
  { name: 'atlantis' },
  { name: 'atlantis' },
  { name: 'atlantis' },
  { name: 'atlantis' },
];

const textStyle: ITextStyles = {
  color: 'yellow',
  family: 'monospace',
  align: 'right',
};

const textOverrides = {
  fontSize: '30px',
};

const PeopleList: FunctionComponent = () => (
  <Linear>
    <List items={people}>
      {({ name }, index) => (
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
          shadow={{ blur: 5 }}
          corners={{ radius: 20 }}
          into={{
            onClick: () => console.log('square', name, index),
          }}
        >
          <Text color="yellow" style={textStyle} overrides={textOverrides}>
            {name}: {index}
          </Text>
        </Square>
      )}
    </List>
  </Linear>
);

export default PeopleList;
