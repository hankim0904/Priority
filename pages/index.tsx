import React from 'react';
import { Layout } from '@/src/sharing/feature-layout';
import { MainRightLayout } from '@/src/page-layout/MainkRightLayout';
import { PriorityLogo } from '@/src/main/PriorityLogo/PriorityLogo';

export default function Home() {
  return (
    <Layout
      rightComponent={<MainRightLayout priorityLogo={<PriorityLogo />} />}
    />
  );
}
