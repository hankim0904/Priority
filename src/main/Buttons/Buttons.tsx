import styles from './Buttons.module.scss';
import classNames from 'classnames/bind';

import { Button } from '@/src/sharing/ui-button/Button';
import {
  BUTTON_CONTENT,
  BUTTON_ICON,
  PAGE_PATH,
} from '@/src/sharing/utils/constant';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

export const Buttons = () => {
  const router = useRouter();
  return (
    <p className={cx('buttons')}>
      <Button
        type="button"
        icon={BUTTON_ICON.WRITE}
        content={BUTTON_CONTENT.WRITE}
        onClick={() => router.push(PAGE_PATH.EDIT)}
      />
      <Button
        type="button"
        icon={BUTTON_ICON.HISTORY}
        content={BUTTON_CONTENT.HISTORY}
      />
    </p>
  );
};
