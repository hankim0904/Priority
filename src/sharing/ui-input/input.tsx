import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface InputProp {
  value: string;
  placeholder: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value,
  placeholder,
  onSubmit,
  onChange,
}: InputProp) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        className={cx('input')}
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        onChange={onChange}
      />
    </form>
  );
};
