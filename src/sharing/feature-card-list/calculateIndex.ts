import { TODO_PER_PAGE } from '../utils';

export const calculateIndex = (todoPageIndex: number, todoIndex: number) => {
  const calculatedIndex = todoPageIndex * TODO_PER_PAGE + todoIndex;
  return calculatedIndex;
};
