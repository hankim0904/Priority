import { ChangedTodo, NewTodo, TODO_PER_PAGE, axiosInstance } from '.';

export const postTodo = async (newTodo: NewTodo) => {
  const response = await axiosInstance.post('/todo', newTodo);

  return response.data;
};

export const getTodoList = async () => {
  const response = await axiosInstance.get('/todo');

  return response.data;
};

export const patchTodo = async (changedTodo: ChangedTodo) => {
  const { todoId, newIndex, isDone } = changedTodo;
  const response = await axiosInstance.patch(`/todo/${todoId}`, {
    newIndex,
    isDone,
  });

  return response.data;
};

export const deleteTodo = async (todoId: string) => {
  const response = await axiosInstance.delete(`/todo/${todoId}`);

  return response.data;
};
