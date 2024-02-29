import { useEffect, useRef, ReactNode } from 'react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [markdownDetail]);

  return (
    <div className={cx('edit-right')} ref={scrollRef}>
      {markdownTitle}
      {markdownDetail}
    </div>
  );
};
