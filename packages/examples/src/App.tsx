import React from 'react';
import { Layer } from 'nuggets';
import { Button } from './nuggets/Button';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer>
    <Button />
  </Layer>
);
