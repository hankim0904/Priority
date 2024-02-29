import { ReactNode } from 'react';
import styles from './EditLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface EditLayoutProps {
  children: ReactNode;
}

export const EditLayout = ({ children }: EditLayoutProps) => {
  return <section className={cx('layout')}>{children}</section>;
};
