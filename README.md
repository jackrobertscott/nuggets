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
  <Arrange styles={{ direction: 'right' }}>
    {people.map(({ name }) => (
      <PersonListItem value={name} />
    ))}
  </Arrange>
);
```

### `<Out />`

This component is used to render and format text.

```tsx
import { Out } from 'nuggets';

export default ({ color = 'black' }) => (
  <Out
    value={'Hello nuggets!'}
    format={value => value.toUpperCase()}
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
    format={value => stringToLowerCase(value)}
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
import { useAddress, Square, Out } from 'nuggets';

export default () => {
  const { match, change } = useAddress();
  const { route } = [
    { path: '/dashboard', exact: true, route: <Dashboard /> },
    { path: '/settings', route: <Settings /> },
    { path: '/login', route: <Login /> },
    { path: '/sign-up', route: <SignUp /> },
  ].find(({ path, exact }) => match({ path, exact }));
  return route || <NotFound navigateHome={() => change('/dashboard')} />;
};
```

### `useSimple()`

This manages a simple value such as a number or string.

```tsx
import { useSimple, Square, Out, In } from 'nuggets';
import { NiceSquare } from './mycomponents';

export default ({
  update,
}) => {
  const { value, change, format } = useSimple({
    format: value => Number(value),
    change: update,
  });
  return (
    <NiceSquare>
      <In
        value={value}
        change={change}
        format={format}
      />
      {/* validations */}
      {value.length < 5 && <Out>Value is not long enough.</Out>}
      {hasBadChars(value) && <Out>Value contains some bad characters.</Out>}
    </NiceSquare>
  );
};
```

### `useComplex()`

This manages a object with sub properties - similar to a form.

```tsx
import { useComplex } from 'nuggets';
import { CustomButton, FieldText, FieldEmail, FieldPassword } from '../mycomponents';

export default ({ person, change, savePerson }) => {
  const { setter, value } = useComplex({
    value: person,
    change,
  });
  return (
    <Square value={updatedPerson} change={setPerson}>
      <FieldText change={value => setter('password').change(value)} />
      <FieldEmail change={setter('email').change} />
      <FieldPassword {...setter('password')} />
      <CustomButton events={{ click: () => savePerson(value) }}>
        Save
      </CustomButton>
    </Square>
  );
};
```

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

- Jack Scott [@jacrobsco](https://twitter.com/jacrobsco) - I tweet about my coding projects.