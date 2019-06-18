import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Typography } from '@material-ui/core';
import React, { memo, useCallback, useContext, useState } from 'react';

import { TodoContext } from './context';

const AddToDo: React.FC = () => {

  const { closeDialogs, service, todo } = useContext(TodoContext);
  const [ todoText, setTodoText ] = useState('');
  const [ error, setError ] = useState('');

  const handleTextChange = useCallback((event: any) => setTodoText(event.target.value), [setTodoText]);
  const handleSave = useCallback(() => {
    setError('');

    if (todoText === '') {
      setError('Type the todo text');
      return;
    }

    closeDialogs();
    service.addItem(todoText).subscribe();
  }, [todoText, closeDialogs, service]);

  return (
    <Dialog open={true}>
      <DialogTitle>Create on {todo.title}</DialogTitle>
      <DialogContent>
        <Input autoFocus onChange={handleTextChange} value={todoText} />
        { error && <Typography>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogs}>
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )

}

export default memo(AddToDo);