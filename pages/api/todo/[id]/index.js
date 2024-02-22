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
      const { newIndex } = req.body;

      const todo = await Todo.findById(id);
      if (!todo) {
        res.status(404).send();
        return;
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
      await todo.save();

      res.status(200).send(todo);
      break;

    case 'DELETE':
      await Todo.findByIdAndDelete(id);
      res.status(204).send();
      break;

    default:
      res.status(404).send();
      break;
  }
}
