import React, {
  FunctionComponent,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import { Frame, Layer, useToggle, Out } from 'nuggets';
import colors from '../colors';

export interface IItemProps {
  title: string;
  active: boolean;
}

export const Item: FunctionComponent<IItemProps> = ({ title, active }) => {
  const [on, change] = useState<boolean>(false);
  useEffect(
    () => {
      let start: number | undefined;
      if (on !== active) {
        if (active) {
          start = Date.now();
          setTimeout(() => {
            if (start) {
              change(active);
              start = undefined;
            }
          }, 1000);
        } else {
          change(active);
        }
      }
    },
    [active]
  );
  return (
    <Frame
      styles={{
        direction: 'east',
        align: 'center',
        space: 15,
        between: 30,
        cursor: 'pointer',
        hover: {
          gradient: {
            color: [colors.noticeTint, colors.strong],
            angle: 125,
          },
        },
      }}
    >
      <Frame
        styles={{
          color: colors.white,
          circle: true,
          size: 30,
          transition: 1000,
        }}
      />
      {on && (
        <Frame
          styles={{
            width: 160,
          }}
        >
          <Out
            value={title}
            styles={{
              color: colors.white,
              thickness: 600,
            }}
          />
        </Frame>
      )}
    </Frame>
  );
};

export interface ISidebarProps {
  children?: ReactElement<any>;
}

export const Sidebar: FunctionComponent<ISidebarProps> = ({ children }) => {
  const { on, off, active } = useToggle();
  return (
    <Layer id="modals">
      <Frame
        events={{
          mouseEnter: on,
          mouseLeave: off,
        }}
        styles={{
          grow: true,
          collapse: true,
          between: 150,
          gradient: {
            color: [colors.noticeTint, colors.notice],
            angle: 125,
          },
        }}
      >
        <Frame
          styles={{
            space: 15,
          }}
        >
          <Frame
            styles={{
              color: colors.white,
              circle: true,
              size: 30,
            }}
          />
        </Frame>
        <Frame>
          <Item title="Search" active={active} />
          <Item title="Imports" active={active} />
          <Item title="Settings" active={active} />
        </Frame>
      </Frame>
    </Layer>
  );
};
