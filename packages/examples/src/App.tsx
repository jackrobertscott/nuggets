import React from 'react';
import { Layer, Piece } from 'nuggets';
import { Sidebar } from './components/Sidebar';
import { Search } from './components/Search';
import { Heading } from './components/Heading';
import { Code } from './components/Code';

/**
 * Hooks don't work on the root component...
 */
export default () => (
  <Layer>
    <Sidebar>
      <Search />
      <Heading value="Results">
        <Piece
          styles={{
            frame: {
              direction: 'east',
              between: 15,
            },
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Piece>
      </Heading>
      <Heading value="Albums">
        <Piece
          styles={{
            frame: {
              direction: 'east',
              between: 15,
            },
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Piece>
      </Heading>
      <Heading value="Snippets">
        <Piece
          styles={{
            frame: {
              direction: 'east',
              between: 15,
            },
          }}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Code key={num} />
          ))}
        </Piece>
      </Heading>
    </Sidebar>
  </Layer>
);
