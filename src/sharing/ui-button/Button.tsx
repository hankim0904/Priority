import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ButtonProp {
  type: 'submit' | 'reset' | 'button';
  icon?: string;
  content: string;
  onClick: () => void;
}

export const Button = ({ type, icon, content, onClick }: ButtonProp) => {
  return (
    <button className={cx('button')} type={type} onClick={onClick}>
      {icon && <span className={cx('button-icon')}>{icon}</span>}
      {<p className={cx('button-content')}>{content}</p>}
    </button>
  );
};
