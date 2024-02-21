import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ButtonProp {
  type: 'submit' | 'reset' | 'button';
  icon?: string;
  content: string;
}

export const Button = ({ type, icon, content }: ButtonProp) => {
  return (
    <button className={cx('button')} type={type}>
      {icon && <span className={cx('button-icon')}>{icon}</span>}
      {<p className={cx('button-content')}>{content}</p>}
    </button>
  );
};
