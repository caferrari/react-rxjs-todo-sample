import { Avatar, CardHeader, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React, { memo, useContext } from 'react';

import { TodoContext } from './context';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: red[500]
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();

  const { todo } = useContext(TodoContext);

  return (
    <CardHeader
      avatar={
        <Avatar className={classes.avatar}>
          {todo.title.substring(0, 1)}
        </Avatar>
      }
      title={todo.title}
    />
  );
}

export default memo(Header);