import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDetailProps {
  title: string;
}

export const MarkdownTitle = ({ title }: MarkdownDetailProps) => {
  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]}>{title}</Markdown>
    </div>
  );
};
