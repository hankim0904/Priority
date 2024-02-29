import dbConnect from '@/db/dbConnect';
import Todo from '../../../../db/models/Todo';
import { getMaxIndex, updateTodoIndex } from './utils';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'PATCH':
      let newIndex = req.body.newIndex;
      const isDoneInput = req.body.isDone;

      const todo = await Todo.findById(id);
      if (!todo) {
        res.status(404).send();
        return;
      }

      const maxDoneIndex = await getMaxIndex(true);
      const maxNotDoneIndex = await getMaxIndex(false);

      if (isDoneInput === undefined) {
        if (newIndex > maxDoneIndex && maxDoneIndex !== 0) {
          res.status(200).send(todo);
          return;
        }
        if (newIndex > maxNotDoneIndex) {
          res.status(200).send(todo);
          return;
        }
      }

      if (todo.isDone === true && newIndex < maxNotDoneIndex) {
        res.status(200).send(todo);
        return;
      }

      if (isDoneInput === false) {
        newIndex = maxNotDoneIndex + 1;
      }

      if (newIndex > todo.index) {
        await updateTodoIndex(
          { index: { $gt: todo.index, $lte: newIndex } },
          -1
        );
      } else if (newIndex < todo.index) {
        await updateTodoIndex(
          { index: { $lt: todo.index, $gte: newIndex } },
          1
        );
      }

      todo.index = newIndex;
      if (isDoneInput !== undefined) {
        todo.isDone = isDoneInput;
      }
      await todo.save();

      res.status(200).send(todo);
      break;

    default:
      res.status(404).send();
      break;
  }
}
