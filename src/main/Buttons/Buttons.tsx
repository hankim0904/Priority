import styles from './Buttons.module.scss';
import classNames from 'classnames/bind';

import { Button } from '@/src/sharing/ui-button/Button';
import { BUTTON_CONTENT, BUTTON_ICON } from '@/src/sharing/utils/constant';

const cx = classNames.bind(styles);

export const Buttons = () => {
  return (
    <p className={cx('buttons')}>
      <Button
        type="button"
        icon={BUTTON_ICON.WRITE}
        content={BUTTON_CONTENT.WRITE}
      />
      <Button
        type="button"
        icon={BUTTON_ICON.HISTORY}
        content={BUTTON_CONTENT.HISTORY}
      />
    </p>
  );
};
