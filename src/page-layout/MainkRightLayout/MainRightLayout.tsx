import { ReactNode } from 'react';

interface LayoutProps {
  priorityLogo: ReactNode;
  todoInputBar: ReactNode;
  writeButton: ReactNode;
  historyButton: ReactNode;
}

export const MainRightLayout = ({
  priorityLogo,
  todoInputBar,
  writeButton,
  historyButton,
}: LayoutProps) => {
  return (
    <>
      <header>{priorityLogo}</header>
      <main>
        {todoInputBar}
        {writeButton}
        {historyButton}
      </main>
    </>
  );
};
