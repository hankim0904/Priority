import { getTodo } from '@/src/api/api';
import { QUERY_KEYS } from '@/src/sharing/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface WriteDetailProps {
  content: string;
  setContent: (markdown: string) => void;
}

export const WriteDetail = ({ content, setContent }: WriteDetailProps) => {
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
      setContent(todoData.content);
    }
  }, [setContent, todoData]);

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </div>
  );
};
