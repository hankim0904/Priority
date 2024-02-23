import { getRandomColor } from '@/src/sharing/ui-card/getRandomColor';

export const createNewTodo = (title: string) => {
  const { color, backgroundColor } = getRandomColor(0.15);

  return { title, color, backgroundColor };
};
