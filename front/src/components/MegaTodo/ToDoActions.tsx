import { CardActions, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { memo, useContext } from 'react';

import { TodoContext } from './context';

const Actions: React.FC = () => {

  const { createAction } = useContext(TodoContext);

  return (
    <CardActions disableSpacing>
      <IconButton onClick={createAction} aria-label="Add">
        <AddIcon />
      </IconButton>
    </CardActions>
  );
}

export default memo(Actions);