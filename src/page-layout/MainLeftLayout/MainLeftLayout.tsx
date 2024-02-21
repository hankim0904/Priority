import { ReactNode } from 'react';

import styles from './MainLeftLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface LayoutProps {
  priorityLogo: ReactNode;
  todoInputBar: ReactNode;
  writeButton: ReactNode;
  historyButton: ReactNode;
}

export const MainLeftLayout = ({
  priorityLogo,
  todoInputBar,
  writeButton,
  historyButton,
}: LayoutProps) => {
  return (
    <div className={cx('main-left')}>
      <header className={cx('main-left-logo')}>{priorityLogo}</header>
      <main className={cx('main-left-input')}>{todoInputBar}</main>
      <p className={cx('main-left-buttons')}>
        {writeButton}
        {historyButton}
      </p>
    </div>
  );
};
