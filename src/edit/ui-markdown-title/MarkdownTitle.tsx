import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './MarkdownTitle.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface MarkdownDetailProps {
  title: string;
}

export const MarkdownTitle = ({ title }: MarkdownDetailProps) => {
  return (
    <h1 className={cx('title')}>
      <div className="markdown-body">
        <Markdown remarkPlugins={[remarkGfm]}>{title}</Markdown>
      </div>
    </h1>
  );
};
