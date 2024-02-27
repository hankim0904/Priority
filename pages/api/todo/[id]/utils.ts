import { FilterQuery } from 'mongoose';
import Todo from '../../../../db/models/Todo';

export const getMaxIndex = async (isDone: boolean) => {
  return await Todo.find({ isDone })
    .sort('-index')
    .limit(1)
    .then((todos) => (todos.length > 0 ? todos[0].index : 0));
};

export const updateTodoIndex = async (
  condition: FilterQuery<any> | undefined,
  increment: any
) => {
  await Todo.updateMany(condition, { $inc: { index: increment } });
};
