import dbConnect from '@/db/dbConnect';
import Todo from '../../../../db/models/Todo';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const todoInfo = await Todo.findById(id);
      res.send(todoInfo);
      break;

    case 'PATCH':
      let newIndex = req.body.newIndex;
      const isDone = req.body.isDone;

      const todo = await Todo.findById(id);
      if (!todo) {
        res.status(404).send();
        return;
      }

      if (isDone) {
        const maxIndex = await Todo.find()
          .sort('-index')
          .limit(1)
          .then((todos) => (todos.length > 0 ? todos[0].index : 0));
        newIndex = maxIndex;
      } else if (isDone === false) {
        const maxNotDoneIndex = await Todo.find({ isDone: false })
          .sort('-index')
          .limit(1)
          .then((todos) => (todos.length > 0 ? todos[0].index : 0));
        newIndex = maxNotDoneIndex + 1;
      }

      if (newIndex > todo.index) {
        await Todo.updateMany(
          { index: { $gt: todo.index, $lte: newIndex } },
          { $inc: { index: -1 } }
        );
      } else if (newIndex < todo.index) {
        await Todo.updateMany(
          { index: { $lt: todo.index, $gte: newIndex } },
          { $inc: { index: 1 } }
        );
      }

      todo.index = newIndex;
      if (isDone !== undefined) {
        todo.isDone = isDone;
      }
      await todo.save();

      res.status(200).send(todo);
      break;

    case 'DELETE':
      const todoToDelete = await Todo.findById(id);
      if (!todoToDelete) {
        res.status(404).send();
        return;
      }

      const deletedIndex = todoToDelete.index;
      await Todo.findByIdAndDelete(id);

      await Todo.updateMany(
        { index: { $gt: deletedIndex } },
        { $inc: { index: -1 } }
      );

      res.status(204).send();
      break;

    default:
      res.status(404).send();
      break;
  }
}
