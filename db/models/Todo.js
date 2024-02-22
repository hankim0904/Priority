import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    color: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
    index: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models['Todo'] || mongoose.model('Todo', todoSchema);

export default Todo;
