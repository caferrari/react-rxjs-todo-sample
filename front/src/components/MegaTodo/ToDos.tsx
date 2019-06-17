import { Grid, makeStyles } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { useObservable } from 'react-use-observable';
import { todoService } from 'services/todo';

import ToDo from './ToDo';
import Loader from 'shared/components/Loader';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(1)
  }
}));

const ToDos: React.FC = () => {
  const classes = useStyles();

  useEffect(todoService.load, []);

  const [ todos ] = useObservable(() => todoService.list(), []);
  const [ isLoading ] = useObservable(() => todoService.isLoading(), []);

  return (
    <Grid container spacing={1}>
      {
        !!todos && !isLoading
          ? todos.map(todo =>
            <Grid key={todo.id} item xs={12} sm={6} md={3}>
              <div className={classes.item}>
                <ToDo todo={todo} />
              </div>
            </Grid>
          )
          : <Loader />
      }
    </Grid>
  );
}

export default memo(ToDos);