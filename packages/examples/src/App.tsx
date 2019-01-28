import React from 'react';
import { Layer, Frame } from 'nuggets';
import { Sidebar } from './components/Sidebar';
import { Search } from './components/Search';
import { Heading } from './components/Heading';
import { Code } from './components/Code';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer id="root">
    <Sidebar>
      <Search />
      <Heading value="Results">
        <Frame
          styles={{
            direction: 'east',
            between: 15,
            overflow: 'auto',
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Frame>
      </Heading>
      <Heading value="Albums">
        <Frame
          styles={{
            direction: 'east',
            between: 15,
            overflow: 'auto',
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Frame>
      </Heading>
      <Heading value="Snippets">
        <Frame
          styles={{
            direction: 'east',
            between: 15,
            overflow: 'auto',
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Frame>
      </Heading>
    </Sidebar>
  </Layer>
);
