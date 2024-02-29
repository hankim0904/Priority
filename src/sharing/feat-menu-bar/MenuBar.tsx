import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/src/api/api';
import { QUERY_KEYS } from '../utils';

import styles from './MenuBar.module.scss';
import classNames from 'classnames/bind';

import { MenuElement } from '../ui-menu-element/MenuElement';
import { menuElementList } from './constants';

const cx = classNames.bind(styles);

interface MenuBarProps {
  todoId: string;
}

export const MenuBar = ({ todoId }: MenuBarProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: deleteTodoMutate } = useMutation({
    mutationFn: () => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
  });

  const handleEditClick = () => {
    router.push(`edit/${todoId}`);
  };

  const handleDeleteClick = () => {
    deleteTodoMutate();
  };

  return (
    <div className={cx('menubar')}>
      {menuElementList.map((menuElement) => {
        let onClickFunction;
        if (menuElement.id === 0) onClickFunction = handleEditClick;
        if (menuElement.id === 2) onClickFunction = handleDeleteClick;
        return (
          <button
            className={cx('menubar-img')}
            key={menuElement.id}
            type="button"
            onClick={onClickFunction}
          >
            <MenuElement src={menuElement.src} alt={menuElement.alt} />
          </button>
        );
      })}
    </div>
  );
};
