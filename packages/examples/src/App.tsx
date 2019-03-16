import React from 'react';
import { Layer, Text } from 'nuggets';
import { Center } from './components/Center';
import { Box } from './components/Box';
import { Sidebar } from './components/Sidebar';
import { List } from './components/List';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer id="root">
    <Sidebar />
    <Center>
      <List>
        <Box hover={true} styles={{ size: 100, space: 10 }}>
          <Text
            value={'This is a small piece of text that has a lot of words...'}
          />
        </Box>
        <Box hover={true} shade="electric" styles={{ size: 100, space: 10 }}>
          <Text
            value={'This is a small piece of text that has a lot of words...'}
          />
        </Box>
        <Box hover={true} shade="strong" styles={{ size: 100 }} />
      </List>
    </Center>
  </Layer>
);
