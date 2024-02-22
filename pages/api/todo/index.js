import dbConnect from '@/db/dbConnect';
import Todo from '../../../db/models/Todo';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const cursorIndex = req.query.cursorIndex;
      const limit = parseInt(req.query.size, 10);

      let query = {};
      if (cursorIndex) {
        query.index = { $gt: parseInt(cursorIndex, 10) };
      }

      const todos = await Todo.find(query).limit(limit).sort({ index: 1 });
      const totalCount = await Todo.countDocuments();

      res.json({
        todos,
        cursorIndex:
          todos.length >= limit ? todos[todos.length - 1].index : null,
        totalCount,
      });
      break;

    case 'POST':
      const maxIndex = await Todo.find()
        .sort('-index')
        .limit(1)
        .then((todos) => (todos.length > 0 ? todos[0].index : 0));

      const newTodo = await Todo.create({ ...req.body, index: maxIndex + 1 });

      res.status(201).send(newTodo);
      break;

    default:
      res.status(404).send();
      break;
  }
}
