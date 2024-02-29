import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTodo } from '@/src/api/api';
import { QUERY_KEYS } from '@/src/sharing/utils';

interface WriteTitleProps {
  title: string;
  setTitle: (markdown: string) => void;
}

export const WriteTitle = ({ title, setTitle }: WriteTitleProps) => {
  const router = useRouter();
  const todoId = router.query['id'];

  const { data: todoData } = useQuery({
    queryKey: [QUERY_KEYS.TODO, todoId],
    queryFn: () => getTodo(todoId),
    enabled: !!todoId,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (todoData) {
      setTitle(todoData.title);
    }
  }, [setTitle, todoData]);

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
