import * as express from 'express';

import { toDoService } from './services/todo';

export const router = express.Router();

function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
};

router.get('/', async (req, res, next) => {
  res.status(200).json(toDoService.all());
});

router.get('/:id', async (req, res, next) => {
  res.status(200).json(toDoService.getItems(req.params.id));
});

router.post('/:id', async (req, res, next) => {
  await sleep(3000);
  const todo = toDoService.addItem(req.params.id, req.body);
  res.status(201).json(todo);
});

router.post('/:id/:todoId/check', async (req, res, next) => {
  const done = req.body.done;
  toDoService.checkItem(req.params.id, req.params.todoId, done);
  res.status(200).json();
});

router.delete('/:id/:todoId', async (req, res, next) => {
  toDoService.removeItem(req.params.id, req.params.todoId);
  res.status(200).json();
});

router.post('/', (req, res, next) => {
  const todo = toDoService.createList(req.body.title);
  res.status(201).json(todo);
});