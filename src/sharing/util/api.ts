import { ChangedTodo, NewTodo, TODO_PER_PAGE, axiosInstance } from '.';

export const postTodo = async (newTodo: NewTodo) => {
  const response = await axiosInstance.post('/todo', newTodo);

  return response.data;
};

export const getTodoList = async (cursorIndex: unknown) => {
  const response = await axiosInstance.get('/todo', {
    params: { size: TODO_PER_PAGE, cursorIndex: cursorIndex },
  });

  return response.data;
};

export const patchTodo = async (changedTodo: ChangedTodo) => {
  const { todoId, newIndex } = changedTodo;
  const response = await axiosInstance.patch(`/todo/${todoId}`, { newIndex });

  return response.data;
};
