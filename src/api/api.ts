import { axiosInstance } from './axiosInstance';
import {
  ChangedIndex,
  ChangedTodo,
  IMGBB_URL,
  NewTodo,
} from '../sharing/utils';

export const postTodo = async (newTodo: NewTodo) => {
  const response = await axiosInstance.post('/todo', newTodo);

  return response.data;
};

export const postWriterImage = async (imageFile: FormData) => {
  const response = await fetch(IMGBB_URL, { method: 'POST', body: imageFile });
  const data = await response.json();
  const imageUrl = data.data.url;
  return imageUrl;
};

export const getTodoList = async () => {
  const response = await axiosInstance.get('/todo');

  return response.data;
};

export const getTodo = async (todoId: string | string[] | undefined) => {
  const response = await axiosInstance.get(`/todo/${todoId}`);

  return response.data;
};

export const patchIndex = async (changedIndex: ChangedIndex) => {
  const { todoId, newIndex, isDone } = changedIndex;
  const response = await axiosInstance.patch(`/index/${todoId}`, {
    newIndex,
    isDone,
  });

  return response.data;
};

export const patchTodo = async (changedTodo: ChangedTodo) => {
  const { todoId, title, content } = changedTodo;
  const response = await axiosInstance.patch(`/todo/${todoId}`, {
    title,
    content,
  });

  return response.data;
};

export const deleteTodo = async (todoId: string) => {
  const response = await axiosInstance.delete(`/todo/${todoId}`);

  return response.data;
};
