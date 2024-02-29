import { ReactNode } from 'react';

import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface LayoutProps {
  rightComponent: ReactNode;
  leftComponent: ReactNode;
}

export const Layout = ({ rightComponent, leftComponent }: LayoutProps) => {
  return (
    <div className={cx('layout')}>
      <section className={cx('layout-box')}>{rightComponent}</section>
      <section className={cx('layout-box')}>{leftComponent}</section>
    </div>
  );
};
