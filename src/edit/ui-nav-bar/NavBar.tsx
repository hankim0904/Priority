import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
//버튼 컴포넌트로 바꾸기

export const NavBar = () => {
  const router = useRouter();

  return (
    <div className={cx('nav')}>
      <button
        className={cx('nav-btn')}
        type="button"
        onClick={() => router.back()}
      >
        <Image
          width={30}
          height={30}
          src="/icons/icon-backward.svg"
          alt="뒤로가기 아이콘"
        />
        <span>뒤로가기</span>
      </button>
      <button className={cx('nav-btn', 'write')} type="submit">
        <span>작성하기</span>
      </button>
    </div>
  );
};
