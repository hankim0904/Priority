import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDetailProps {
  content: string;
}

export const MarkdownDetail = ({ content }: MarkdownDetailProps) => {
  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};
