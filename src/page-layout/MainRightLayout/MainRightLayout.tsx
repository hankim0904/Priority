import { ReactNode } from 'react';

import styles from './MainRightLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface LayoutProps {
  cardList: ReactNode;
}

export const MainRightLayout = ({ cardList }: LayoutProps) => {
  return <div className={cx('main-right')}>{cardList}</div>;
};
