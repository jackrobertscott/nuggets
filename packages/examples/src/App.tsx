import React from 'react';
import { Layer } from 'nuggets';
import { Center } from './components/Center';
import { Sidebar } from './components/Sidebar';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer id="root">
    <Center>
      <Sidebar />
    </Center>
  </Layer>
);
