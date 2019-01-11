# nuggets

> 📯 New Default Types.

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then came CSS3 in 1998. Both are powerful languages. However, since their creation, modern web development has significantly progressed and we now long for more functionality from these languages. Although there has been movement in this area, there leaves a lot to be desired in terms of functionality.

Until now...

```jsx
import { Square, Text, Linear, List } from 'nuggets';

const Button = ({
  textColor = 'blue',
}) => (
  <Square
    color="green"
    space={{ sides: 10, verts: 14 }}
    click={() => console.log('clicked!')}
  >
    <Text color={textColor}>{children}</Text>
  </Square>
);

const Persons = ({
  people = []
  selectPerson = () => {},
}) => (
  <Linear direction="down">
    <List items={people}>
      {({ id, name }) => (
        <Square key={id} color="grey">
          <Text>{name}<Text>
          <Button click={selectPerson}>Start message with {name}</Button>
        </Square>
      )}
    </List>
  </Linear>
);
```

We found that the biggest problem with HTML and CSS is that it's given all the elements *too much* power. You can use almost any element to do anything.

But thats not good...

This freedom and power means that we have a million different ways to create the same code. This means every time we attempt to create something, we have to think. And when you have to think about your code, the code becomes inconsistent and takes a lot more time to create. Nuggets aims to remove this thinking so that there is a simple a best way to make everything.

## Install

Using [npm](https://www.npmjs.com/package/nuggets):

```shell
npm i --save nuggets
```

Using [yarn](https://yarnpkg.com/en/):

```shell
yarn add nuggets
```

Then import the helper classes where needed.

```jsx
import { Canvas, Square, Linear } from 'nuggets';
```

## Components

### Canvas

The canvas element prepares the browser window for components. It will fill the entire screen. It is also effective for building modals.

```jsx
import { Canvas } from 'nuggets';

const Creation = ({
  color = 'white'
}) => (
  <Canvas color={color}>
    {/* code */}
  </Canvas>
);
```

### Square

This provides a box component which may be styled.

```jsx
import { Square } from 'nuggets';

const Creation = ({
  color = 'white'
}) => (
  <Square
    height={100}
    width={300}
    color={color}
    shadow={{
      color: 'black',
      blur: 10,
      down: 3,
    }}
    hover={{ color: 'yellow' }}
    press={{ color: 'blue' }}
    click={() => console.log('clicked!')}
  >
    {/* code */}
  </Square>
);
```

### Circle

This provides a circular component which may be styled.

```jsx
import { Circle } from 'nuggets';

const Creation = ({
  color = 'white'
}) => (
  <Circle
    diameter={100}
    color={color}
    shadow={{
      color: 'black',
      blur: 10,
      down: 3,
    }}
    hover={{ color: 'yellow' }}
    press={{ color: 'blue' }}
    click={() => console.log('clicked!')}
  >
    {/* code */}
  </Circle>
);
```

### Linear

This arranges all direct child components in a linear layout.

```jsx
const Creation = () => (
  <Linear direction="right">
    {/* code */}
  </Linear>
);
```

### List

This iterates over an array of values and takes a function as the child.

```jsx
const people = [
  { id: 1, name: 'Bob' },
  { id: 2, name: 'Sally' },
];

const Creation = () => (
  <List items={people}>
    {({ id, name }) => (
      <Text key={id}>{name}</Text>
    )}
  </List>
);
```

### Media

This provides easy access to the width of the browser window.

```jsx
const Creation = () => (
  <Media>
    {({ width }) => (
      <Text color={width > 500 ? 'green' : 'blue'}>
        Small Screen
      </Text>
    )}
  </Media>
);
```

### Form

```jsx
const Creation = () => (
  <Form>
    {/* code */}
  </Form>
);
```

### Input

```jsx
const Creation = () => (
  <Input>
    {/* code */}
  </Input>
);
```

### Router

```jsx
const Creation = () => (
  <Router>
    {/* code */}
  </Router>
);
```

### Route

```jsx
const Creation = () => (
  <Route>
    {/* code */}
  </Route>
);
```

### Link

```jsx
const Creation = () => (
  <Link>
    {/* code */}
  </Link>
);
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding projects.