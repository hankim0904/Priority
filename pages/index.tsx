import React from 'react';
import { Layout } from '@/src/sharing/feature-layout';
import { MainLeftLayout } from '@/src/page-layout/MainLeftLayout';
import { PriorityLogo } from '@/src/main/PriorityLogo/PriorityLogo';
import { Input } from '@/src/sharing/ui-input';
import {
  BUTTON_CONTENT,
  BUTTON_ICON,
  INPUT_PLACEHOLDER,
} from '@/src/sharing/util/constant';
import { Button } from '@/src/sharing/ui-button/Button';

export default function Home() {
  return (
    <Layout
      leftComponent={
        <MainLeftLayout
          priorityLogo={<PriorityLogo />}
          todoInputBar={<Input placeholder={INPUT_PLACEHOLDER.todo} />}
          writeButton={
            <Button
              type="button"
              icon={BUTTON_ICON.write}
              content={BUTTON_CONTENT.write}
            />
          }
          historyButton={
            <Button
              type="button"
              icon={BUTTON_ICON.history}
              content={BUTTON_CONTENT.history}
            />
          }
        />
      }
    />
  );
}
