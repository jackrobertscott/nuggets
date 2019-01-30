import React from 'react';
import { Layer, Frame } from 'nuggets';
import { Center } from './components/Center';
import { Box } from './components/Box';
import { Sidebar } from './components/Sidebar';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer id="root">
    <Sidebar />
    <Center>
      <Box>
        <Frame styles={{ size: 30 }} />
      </Box>
    </Center>
  </Layer>
);
