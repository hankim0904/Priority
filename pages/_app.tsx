import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '@/styles/base.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Priority</title>
        <link rel="icon" href="/icons/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
