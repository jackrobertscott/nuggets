import React from 'react';
import { useStyles } from 'nuggets';

export default () => {
  const { name } = useStyles({
    shape: { color: 'green' },
  });
  return <div className={name}>{name}</div>;
};
