import { FormEvent, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChangedTodo,
  NewTodo,
  PAGE_PATH,
  QUERY_KEYS,
} from '@/src/sharing/utils';
import { patchTodo, postTodo } from '@/src/api/api';

import styles from './EditLeftLayout.module.scss';
import classNames from 'classnames/bind';
import { createNewTodo } from '@/src/sharing/utils/createNewTodo';
import { useRouter } from 'next/router';
import { useCardId } from '@/src/context/FocusedCardIdContext';

const cx = classNames.bind(styles);

interface EditRightLayoutProps {
  nav: ReactNode;
  writeTitle: ReactNode;
  writeDetail: ReactNode;
  title: string;
  content: string;
}

export const EditLeftLayout = ({
  nav,
  writeTitle,
  writeDetail,
  title,
  content,
}: EditRightLayoutProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const todoId = router.query['id'];
  const { setFocusedCardId } = useCardId();

  const postTodoMutation = useMutation({
    mutationFn: (newTodo: NewTodo) => postTodo(newTodo),
    onSuccess: (data) => {
      setFocusedCardId(data._id);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
      router.push(PAGE_PATH.MAIN);
    },
  });

  const patchTodoMutation = useMutation({
    mutationFn: (changedTodo: ChangedTodo) => patchTodo(changedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
      router.push(PAGE_PATH.MAIN);
    },
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoId) {
      const changedTodo: ChangedTodo = { todoId, title, content };
      patchTodoMutation.mutate(changedTodo);
    } else {
      const newTodo = createNewTodo(title, content);
      postTodoMutation.mutate(newTodo);
    }
  };

  return (
    <form className={cx('edit-right')} onSubmit={handleFormSubmit}>
      {nav}
      {writeTitle}
      {writeDetail}
    </form>
  );
};
