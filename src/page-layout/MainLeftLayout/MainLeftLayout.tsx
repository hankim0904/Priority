import { ReactNode } from 'react';

import styles from './MainLeftLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MainLeftLayoutProps {
  header: ReactNode;
  buttons: ReactNode;
}

export const MainLeftLayout = ({ header, buttons }: MainLeftLayoutProps) => {
  return (
    <div className={cx('main-left')}>
      {header}
      {buttons}
    </div>
  );
};
