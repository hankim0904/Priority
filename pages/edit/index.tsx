import { useState } from 'react';
import { Layout } from '@/src/sharing/ui-layout';
import { EditLeftLayout } from '@/src/page-layout/EditLeftLayout/EditLeftLayout';
import { EditRightLayout } from '@/src/page-layout/EditRightLayout/EditRightLayout';
import { WriteDetail } from '@/src/edit/ui-write-detail/WriteDetail';
import { MarkdownDetail } from '@/src/edit/ui-markdown-detail/MarkdownDetail';
import { WriteTitle } from '@/src/edit/ui-write-title/WriteTitle';
import { MarkdownTitle } from '@/src/edit/ui-markdown-title/MarkdownTitle';
import { NavBar } from '@/src/edit/ui-nav-bar/NavBar';

export default function Edit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Layout
      leftComponent={
        <EditLeftLayout
          nav={<NavBar />}
          writeTitle={<WriteTitle title={title} setTitle={setTitle} />}
          writeDetail={
            <WriteDetail content={content} setContent={setContent} />
          }
          title={title}
          content={content}
        />
      }
      rightComponent={
        <EditRightLayout
          markdownTitle={<MarkdownTitle title={title} />}
          markdownDetail={<MarkdownDetail content={content} />}
        />
      }
    />
  );
}
