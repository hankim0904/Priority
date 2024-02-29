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
      const { title, content } = req.body;
      if (!title && !content) {
        res.status(400).send('Title or content must be provided');
        return;
      }

      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
      if (!updatedTodo) {
        res.status(404).send();
        return;
      }

      res.send(updatedTodo);
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
