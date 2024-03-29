import { ChangeEvent, FormEvent, useState } from 'react';

import { postTodo } from '@/src/api/api';
import { NewTodo, QUERY_KEYS } from '@/src/sharing/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { useCardId } from '@/src/context/FocusedCardIdContext';
import { Input } from '@/src/sharing/ui-input';
import { PriorityLogo } from '../PriorityLogo/PriorityLogo';
import { INPUT_PLACEHOLDER } from '@/src/sharing/utils/constant';
import { createNewTodo } from '../../sharing/utils/createNewTodo';

const cx = classNames.bind(styles);

export const Header = () => {
  const queryClient = useQueryClient();
  const [titleInput, setTitleInput] = useState<string>('');
  const { setFocusedCardId } = useCardId();

  const postTodoMutation = useMutation({
    mutationFn: (newTodo: NewTodo) => postTodo(newTodo),
    onSuccess: (data) => {
      setFocusedCardId(data._id);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
  });

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTitleInput(inputValue);
  };

  const handleTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = createNewTodo(titleInput);
    postTodoMutation.mutate(newTodo);
    setTitleInput('');
  };

  return (
    <header className={cx('header')}>
      <PriorityLogo />
      <Input
        value={titleInput}
        placeholder={INPUT_PLACEHOLDER.TODO}
        onSubmit={handleTodoSubmit}
        onChange={handleTodoChange}
      />
    </header>
  );
};
