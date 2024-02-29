import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTodo } from '@/src/api/api';

import styles from './WriteTitle.module.scss';
import classNames from 'classnames/bind';

import { INPUT_PLACEHOLDER, QUERY_KEYS } from '@/src/sharing/utils';

const cx = classNames.bind(styles);

interface WriteTitleProps {
  title: string;
  setTitle: (markdown: string) => void;
}

export const WriteTitle = ({ title, setTitle }: WriteTitleProps) => {
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
      setTitle(todoData.title);
    }
  }, [setTitle, todoData]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '1px';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [title]);

  return (
    <h1 className={cx('title')}>
      <textarea
        ref={textAreaRef}
        className={cx('title-input')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={INPUT_PLACEHOLDER.TITLE}
      />
      <hr className={cx('title-line')} />
    </h1>
  );
};
