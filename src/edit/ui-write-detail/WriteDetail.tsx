import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTodo } from '@/src/api/api';

import styles from './WriteDetail.module.scss';
import classNames from 'classnames/bind';

import { INPUT_PLACEHOLDER, QUERY_KEYS } from '@/src/sharing/utils';

const cx = classNames.bind(styles);

interface WriteDetailProps {
  content: string;
  setContent: (markdown: string) => void;
}

export const WriteDetail = ({ content, setContent }: WriteDetailProps) => {
  const router = useRouter();
  const todoId = router.query['id'];
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <p className={cx('detail')}>
      <textarea
        ref={textAreaRef}
        className={cx('detail-input')}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ overflow: 'hidden', minHeight: '100%' }}
        placeholder={INPUT_PLACEHOLDER.DETAIL}
      />
    </p>
  );
};
