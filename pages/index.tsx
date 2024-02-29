import React from 'react';
<<<<<<< HEAD
import { Layout } from '@/src/sharing/ui-layout';
import { MainLeftLayout } from '@/src/page-layout/MainLeftLayout';
import { Header } from '@/src/main/Header/Header';
import { Buttons } from '@/src/main/Buttons/Buttons';
import { CardList } from '@/src/sharing/feature-card-list/CardList';
import { MainRightLayout } from '@/src/page-layout/MainRightLayout/MainRightLayout';

export default function Home() {
  return (
    <Layout
      leftComponent={
        <MainLeftLayout header={<Header />} buttons={<Buttons />} />
      }
      rightComponent={<MainRightLayout cardList={<CardList />} />}
    />
  );
=======
import { Layout } from '@/src/sharing/feature-layout';

export default function Home() {
  return <Layout />;
>>>>>>> main
}
