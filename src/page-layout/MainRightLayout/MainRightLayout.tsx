import { ReactNode } from 'react';

import styles from './MainRightLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MainRightLayoutProps {
  cardList: ReactNode;
}

export const MainRightLayout = ({ cardList }: MainRightLayoutProps) => {
  return <div className={cx('main-right')}>{cardList}</div>;
};
