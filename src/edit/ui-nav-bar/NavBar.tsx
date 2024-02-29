import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const NavBar = () => {
  return (
    <>
      <button type="button">뒤로가기</button>
      <button type="submit">작성하기</button>
    </>
  );
};
