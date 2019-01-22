# nuggets

> 📯 New Default Types

A collection of essential components which compose modern web experiences.

## Overview

In 1980, physicist Tim Berners-Lee proposed a new markup language called HTML. Then in 1997 and 1998 they brought out CSS2 and CSS3 respectively. Both are powerful languages. However, since their creation, our demands for more intricate functionality has increased without seeing a similar improvement of the technologies. Although there has been movement in the area of web development tooling, there leaves a lot to be desired.

Until now...

```tsx
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
    <Circle
      styles={{
        shape: {
          color: 'blue',
          diameter: 100,
        },
      }}
    />
  </Arrange>
);
```

Nuggets helps you think less and build more.

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

```tsx
import { Canvas, Square, Linear } from 'nuggets';
```

## Components

### `<Layer />`

The layer element prepares the browser window for a new level components. It fills the entire screen and acts similar layers which are use in design tools.

```tsx
import { Layer } from 'nuggets';
import { Modal } from './mycomponents';

export default () => (
  <Layer attach={document.getElementById('root')}>
    <Modal message="Hello nuggets!" />
  </Layer>
);
```

### `<Square />`

This provides a component with 4 sides which may be styled.

```tsx
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

```tsx
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

```tsx
import { Arrange } from 'nuggets';
import { PersonListItem } from './mycomponents';

export default ({ people }) => (
  <Arrange
    structure={{
      direction: 'right',
      space: 10,
    }}
  >
    {people.map(({ name }) => (
      <PersonListItem value={name} />
    ))}
  </Arrange>
);
```

### `<Out />`

This component is used to render and adjust text.

```tsx
import { Out } from 'nuggets';

export default ({ color = 'black' }) => (
  <Out
    value={'Hello nuggets!'}
    adjust={value => value.toUpperCase()}
  />
);
```

### `<In />`

This is a simple interface for recording user keyboard input. Styles may be applied to the text created by this component (similar to `<Out />`).

```tsx
import { In } from 'nuggets';

export default ({ value, change }) => (
  <In
    wrap={true}
    value={value}
    change={change}
    adjust={value => stringToLowerCase(value)}
  />
);
```

## Hooks

### `useMedia()`

This provides easy access to the width of the browser window.

```tsx
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

### `useAddress()`

This gives you access to the current url of the page.

```tsx
import { useAddress, Square, Out } from 'nuggets';

export default () => {
  const { change, backward, forward, pathname, search } = useAddress();
  return (
    <Arrange>
      <Square
        styles={{
          texts: { color: 'blue' }
        }}
      >
        <Out value={`Pathname and search: ${pathname} ${search}`} />
      </Square>
      <Square events={{ click: () => change('/hello-nuggets') }}>
        <Out value={'Go to hello nuggets'} />
      </Square>
      <Square events={{ click: backward }}>
        <Out value={'Go back'} />
      </Square>
      <Square events={{ click: forward }}>
        <Out value={'Go forward'} />
      </Square>
    </Arrange>
  );
};
```

The `useAddress()` hook can be used to create a routers.

```tsx
import { useAddress } from 'nuggets';
import { Dashboard, Settings, Login, SignUp, NotFound } from './mycomponents';

export default () => {
  const { match } = useAddress();
  const { route } = [
    { path: '/dashboard', exact: true, route: <Dashboard /> },
    { path: '/settings', route: <Settings /> },
    { path: '/login', route: <Login /> },
    { path: '/sign-up', route: <SignUp /> },
  ].find(({ path, exact }) => match({ path, exact }));
  return route || <NotFound />;
};
```

#### `const { ...properties } = useAddress();`

Properties

- `change(address: string)` change location to address.
- `shift(entries: number)` move forward or backward in history.
- `forward()` move forward in history by one.
- `backward()` move backward in history by one.
- `pathname: string` the location path.
- `search: string` the query params of the location.
- `hash: string` the hash fragment in the location.
- `entries: number` the number of locations in the location history.

### `useStyles()`

Compile styles into css and attach to the document. It returns the class name which can be added to components which are not in the nuggets lib.

```tsx
import { useStyle } from 'nuggets';
import { Editor } from 'some-code-editor';

export default () => {
  const { css, name } = useStyles({
    shape: {
      height: 100,
      color: 'green',
    },
    texts: {
      color: 'blue',
    },
  });
  return <Editor className={name} />;
};
```

#### `const { ...properties } = useStyles({ ...styles });`

Properties

- `css: object` an object containing css properties.
- `name: string` the class name associated with the css properties.

### `useString()`

This manages a simple value such as a number or string.

```tsx
import { useString, Square, Out, In } from 'nuggets';
import { NiceSquare } from './mycomponents';

export default ({ valueChange }) => {
  const { value, change, adjust } = useString({
    adjust: data => data.toUpperCase(),
    change: valueChange,
  });
  return (
    <NiceSquare>
      <In
        value={value}
        change={change}
        adjust={adjust}
      />
      {/* validations */}
      {value.length < 5 && <Out>Value is not long enough.</Out>}
      {hasBadChars(value) && <Out>Value contains some bad characters.</Out>}
    </NiceSquare>
  );
};
```

#### `const { ...properties } = useString({ ...options });`

Options

- `value: string` use this value to update override the current value.
- `change(value: string)` this is run when the value changes.
- `adjust(value: string): string` perform adjustments on the value before updating.

Properties

- `value: string` the current string value.
- `change(value: string)` set a new string value.

### `useNumber()`

This manages a simple value such as a number or string.

```tsx
import { useNumber, Square, Out, In } from 'nuggets';
import { NiceSquare } from './mycomponents';

export default ({ valueChange }) => {
  const { value, change } = useNumber({
    adjust: data => data % 100,
    change: valueChange,
  });
  return (
    <NiceSquare>
      <In
        value={value}
        change={change}
      />
      {/* validations */}
      {value.length < 5 && <Out>Value is not long enough.</Out>}
      {hasBadChars(value) && <Out>Value contains some bad characters.</Out>}
    </NiceSquare>
  );
};
```

#### `const { ...properties } = useNumber({ ...options });`

Options

- `value: number` use this value to update override the current value.
- `change(value: number)` this is run when the value changes.
- `adjust(value: number): number` perform adjustments on the value before updating.

Properties

- `value: number` the current number value.
- `change(value: number)` set a new number value.

### `useComplex()`

This manages a object with sub properties - similar to a form.

```tsx
import { useComplex } from 'nuggets';
import { CustomButton, FieldText, FieldEmail, FieldPassword } from './mycomponents';

export default ({ person, valueChange, savePerson }) => {
  const { operate, value } = useComplex({
    value: person,
    change: valueChange,
  });
  return (
    <Square>
      <FieldText change={data => operate('password').change(data)} />
      <FieldEmail change={operate('email').change} />
      <FieldPassword {...operate('password')} />
      <CustomButton events={{ click: () => savePerson(value) }}>
        Save
      </CustomButton>
    </Square>
  );
};
```

#### `const { ...properties } = useComplex({ ...options });`

Options

- `value: object` use this value to update override the current value.
- `change(value: object)` this is run when the value changes.

Properties

- `value: object` the current number value.
- `operate(property: string)` get operators for changing a sub property.
- `change(value: object)` patch the entire object.
- `override(value: object)` set the entire object.

### `useToggle()`

This provides a set of state and state changers for managing a toggled value.

```tsx
import { useToggle, Circle } from 'nuggets';

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

```tsx
import { useToggle, Circle } from 'nuggets';

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

#### `const { ...properties } = useToggle({ ...options });`

Options

- `value: boolean` use this value to update override the current value.
- `change(value: boolean)` this is run when the value changes.

Properties

- `active: boolean` the current toggle state.
- `on()` set the state to `true`.
- `off()` set the state to `false`.
- `toggle()` toggle the current active state.

### `useDatetime()`

Manage a datetime by setting sub-properties.

```tsx
import { useDatetime, Square, In } from 'nuggets';

export default ({ value, change }) => {
  const { date, month, year, hour, minute, second, millisecond } = useDatetime({ value, change });
  return (
    <Square>
      <In
        value={date.value}
        change={date.change}
      />
      <In
        value={month.value}
        change={month.change}
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

#### `const { ...properties } = useDatetime({ ...options });`

Options

- `value: Date` use this value to update override the current value.
- `change(value: Date)` this is run when the value changes.

Properties

- `const { value, change } = date | month | year | ...etc;`
  - `date`
  - `month`
  - `year`
  - `hour`
  - `minute`
  - `second`
  - `millisecond`

### `useArray()`

Manage an array of values.

```tsx
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

```tsx
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

#### `const { ...properties } = useArray({ ...options });`

Options

- `value: any[]` use this value to update override the current value.
- `change(value: any[])` this is run when the value changes.

Properties

- `includes(value: any): boolean` detects whether an item is in the array.
- `add(value: any)` add the item to the array.
- `remove(value: any)` remove the value from the array.
- `toggle(value: any)` toggle (add or remove) the value in the array.

### `createStore()` & `useStore()`

Share data across multiple components.

```tsx
import { createStore } from 'nuggets';

export interface IAuthStore {
  userId: string;
}

export const authStore = createStore<IAuthStore>({
  defaults: {
    userId: null,
  },
});
```

```tsx
import { useStore, Square, Out } from 'nuggets';
import { authStore } from './stores';

export default () => {
  const { value, change } = useStore({ store: authStore });
  return (
    <Arrange>
      <Out value={`Auth id: ${value.userId}`} />
      <Square events={{ click: () => change({ userId: null }) }}>
        <Out value={'Reset your auth.'} />
      </Square>
    </Arrange>
  );
};
```

#### `const { ...properties } = useStore({ ...options });`

Options

- `store` a store - created using `createStore`.

Properties

- `value: object` the value of the store.
- `change(value: object)` patch the store with new values.

### `createConnection()` & `useConnection()`

Easily connect to and manage external data sources.

```tsx
import { createConnection } from 'nuggets';
import apollo from '../utils/apollo';

export interface IQueryConnection {
  query: string;
  variables: {
    [name: string]: string | number | boolean | undefined;
  }
}

export const queryConnection = createConnection<IQueryConnection>({
  handler: ({ query, variables }) => {
    return apollo.query({ query, variables })
      .then(({ data }) => data);
  }
});
```

```tsx
import { useConnection, Square, Out } from 'nuggets';
import { queryConnection } from './connections';

interface IGetUser {
  user: {
    id: string;
    name: string;
  };
}

const query = `
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
    }
  }
`;

export default ({ id }) => {
  const { value, error, execute, refresh } = useConnection<IGetUser>({
    connection: queryConnection,
    defaults: { query }
  });
  useEffect(() => execute({ variables: { id } }));
  return (
    <Arrange>
      <Square styles={{ texts: { color: 'blue' } }}>
        <Out value={`User name and id: ${value.user.name} ${value.user.id}`} />
      </Square>
      <ErrorHandler error={error} />
      <SimpleButton click={refresh} />
    </Arrange>
  );
};
```

## Authors

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding and startups.