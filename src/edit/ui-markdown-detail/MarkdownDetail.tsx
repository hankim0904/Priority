import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './MarkdownDetail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MarkdownDetailProps {
  content: string;
}

export const MarkdownDetail = ({ content }: MarkdownDetailProps) => {
  return (
    <div className={cx('detail')}>
      <div className="markdown-body">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </div>
  );
};
