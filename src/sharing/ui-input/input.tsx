import { useEffect, useRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProp {
  placeholder: string;
}

export const Input = ({ placeholder }: InputProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form>
      <input className={cx('input')} ref={inputRef} placeholder={placeholder} />
    </form>
  );
};
