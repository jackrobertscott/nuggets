# nuggets

> 📯 New Default Types

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then in 1997 and 1998 they brought out CSS2 and CSS3 respectively. Both are powerful languages. However, since their creation, our demands for more intricate functionality has increased without seeing a similar improvement of the technologies. Although there has been movement in the area of web development tooling, there leaves a lot to be desired.

Until now...

```jsx
import { Arrange, Square, Out } from 'nuggets';

export default ({ textColor = 'blue', clickButton }) => (
  <Arrange direction="down">
    <Square
      events={{
        click: clickButton,
      }}
      styles={{
        shape: {
          color: 'green',
          hover: { color: 'red' },
          press: { color: 'yellow' },
        },
        texts: {
          color: textColor,
        }
      }}
    >
      <Out value={'Hello world!'} />
    </Square>
  </Arrange>
);
```

Think less, build more.

## Install

Using [npm](https://www.npmjs.com/package/nuggets):

```shell
npm i --save nuggets react@next react-dom@next
```

Using [yarn](https://yarnpkg.com/en/):

```shell
yarn add nuggets react@next react-dom@next
```

Then import the helper classes where needed.

```jsx
import { Canvas, Square, Linear } from 'nuggets';
```

## Components

### `<Layer />`

The layer element prepares the browser window for a new level components. It fills the entire screen and acts similar layers which are use in design tools.

```jsx
import { Layer } from 'nuggets';
import { Modal } from './mycomponents';

export default () => (
  <Layer>
    <Modal message="Hello nuggets!" />
  </Layer>
);
```

### `<Square />`

This provides a component with 4 sides which may be styled.

```jsx
import { Square } from 'nuggets';

export default ({ children, color = 'white' }) => (
  <Square
    events={{
      click: () => console.log('clicked!'),
    }}
    styles={{
      shape: {
        color,
        height: 100,
        width: 300,
      },
      texts: {
        color: 'black',
        hover: { color: 'yellow' },
        press: { color: 'black' },
      },
      shade: {
        color: 'black',
        blur: 10,
        down: 3,
      },
    }}
  >
    {children}
  </Square>
);
```

### `<Circle />`

This provides a circular component which may be styled.

```jsx
import { Circle } from 'nuggets';

export default ({ children, color = 'white' }) => (
  <Circle
    events={{
      click: () => console.log('clicked!'),
    }}
    styles={{
      shape: {
        color,
        diameter: 100,
      },
      shade: {
        color: 'black',
        blur: 10,
        down: 3,
        hover: { color: 'yellow' },
        press: { color: 'blue' }
      },
    }}
  >
    {children}
  </Circle>
);
```

### `<Arrange />`

This determines the arrangement and spacing of all the components within this component.

```jsx
import { Arrange } from 'nuggets';
import { PersonListItem } from './mycomponents';

export default ({ people }) => (
  <Arrange styles={{ direction: 'right' }}>
    {people.map(({ name }) => (
      <PersonListItem value={name} />
    ))}
  </Arrange>
);
```

### `<Out />`

This component is used to render and format text.

```jsx
import { Out } from 'nuggets';

export default ({ color = 'black' }) => (
  <Out
    value={'Hello nuggets!'}
    format={value => value.toUpperCase()}
  />
);
```

### `<In />`

This is a simple interface for recording user keyboard input. Styles may be applied to the text created by this component (similar to `<Text />`).

```jsx
import { In } from 'nuggets';

export default ({ value, change }) => (
  <In
    wrap={true}
    value={value}
    change={change}
    format={value => stringToLowerCase(value)}
  />
);
```

## Hooks

### `useMedia()`

This provides easy access to the width of the browser window.

```jsx
import { useMedia, Square, Out } from 'nuggets';

export default () => {
  const { width, height } = useMedia();
  return (
    <Square
      styles={{
        shape: {
          color: width > 600 ? 'green' : 'blue',
        }
        border: {
          color: 'black',
          thickness: height > 500 ? 3 : 10,
        },
      }}
    >
      <Out value={'This text changes color with the size of the window.'} />
    </Square>
  );
};
```

### `useSimple()`

This manages a simple value such as a number or string.

```jsx
import { useSimple, Square, Text, Insert } from 'nuggets';
import { NiceSquare } from './mycomponents';

export default ({
  update,
  name = 'address.city',
}) => {
  const { value, change, format } = useSimple({
    format: value => value.toUpperCase(),
    change: update,
  });
  return (
    <NiceSquare>
      <In
        value={value}
        change={change}
        format={format}
      />
      {issue && <Out>{issue}</Out>}
    </NiceSquare>
  );
};
```

### `useComplex()`

This manages a object with sub properties - similar to a form.

```jsx
import { useComplex } from 'nuggets';
import { CustomButton, FieldText, FieldEmail, FieldPassword } from '../mycomponents';

export default ({ person, change, savePerson }) => {
  const { connection, value } = useComplex({
    value: person,
    change,
  });
  return (
    <Square value={updatedPerson} change={setPerson}>
      <FieldText change={value => connection('password').change(value)} />
      <FieldEmail change={connection('email').change} />
      <FieldPassword {...connection('password')} />
      <CustomButton events={{ click: () => savePerson(value) }}>
        Save
      </CustomButton>
    </Square>
  );
};
```

### `useToggle()`

This provides a set of state and state changers for managing a toggled value.

```jsx
import { useToggle, Text } from 'nuggets';

export default ({ value, change }) => {
  const { active, off, on } = useToggle({ value, change });
  return (
    <Circle
      events={{
        click: active ? off : on,
      }}
      styles={{
        shape: {
          color: active ? 'green' : 'blue',
        },
      }}
    />
  );
};
```

There is also a simple `toggle` property which makes it a little easier.

```jsx
import { useToggle, Text } from 'nuggets';

export default ({ value, change }) => {
  const { toggle, active } = useToggle({ value, change });
  return (
    <Circle
      events={{ click: toggle }}
      styles={{
        shape: {
          color: active ? 'green' : 'blue',
        },
      }}
    />
  );
};
```

### `useDatetime()`

This provides an easy to use interface for recording datetimes.

```jsx
import { useDatetime, Square, In } from 'nuggets';

export default ({ value, change }) => {
  const { date, month, year, hour, minute, second, millisecond } = useDatetime({ value, change });
  return (
    <Square>
      <In
        value={date.value}
        change={date.change}
        format={date.format}
      />
      <In
        value={month.value}
        change={month.change}
        format={month.format}
      />
      <In {...year} />
      <In {...hour} />
      <In {...minute} />
      <In {...second} />
      <In {...millisecond} />
    </Square>
  );
};
```

### `useArray()`

This is an interface for collecting an array of values.

```jsx
import { useArray, Square, Out } from 'nuggets';

export default ({ value, change, listOfPeople = [] }) => {
  const { includes, add, remove } = useArray({ value, change });
  return listOfPeople.map(({ id, name }) => (
    <Square
      key={id}
      events={{
        click: () => includes(id) ? add(id) : remove(id),
      }}
      styles={{
        shape: {
          color: includes(id) ? 'green' : 'blue',
        }
      }}
    >
      <Out value={name} />
    </Square>
  );
};
```

There is also a simple `toggle` attribute which makes the above code a little easier.

```jsx
import { useArray, Square, Out } from 'nuggets';

export default ({ value, change, listOfPeople = [] }) => {
  const { includes, toggle } = useArray({ value, change });
  return listOfPeople.map(({ id, name }) => (
    <Square
      key={id}
      events={{ click: () => toggle(id) }}
      styles={{
        shape: {
          color: includes(id) ? 'green' : 'blue',
        }
      }}
    >
      <Out value={name} />
    </Square>
  );
};
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding projects.