import { ReactNode } from 'react';

import styles from './EditRightLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface EditLeftLayoutProps {
  markdownTitle: ReactNode;
  markdownDetail: ReactNode;
}

export const EditRightLayout = ({
  markdownDetail,
  markdownTitle,
}: EditLeftLayoutProps) => {
  return (
    <div className={cx('edit-left')}>
      {markdownTitle}
      {markdownDetail}
    </div>
  );
};
