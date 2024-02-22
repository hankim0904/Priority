import Image from 'next/image';

import styles from './PriorityLogo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const PriorityLogo = () => {
  return (
    <div className={cx('logo')}>
      <Image fill priority src="/icons/logo-priority.svg" alt="priority 로고" />
    </div>
  );
};
