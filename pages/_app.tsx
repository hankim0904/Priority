import React from 'react';
import type { AppProps } from 'next/app';
<<<<<<< HEAD
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CardIdProvider } from '@/src/context/FocusedCardIdContext';

import '@/styles/base.scss';

const queryClient = new QueryClient();
=======
import '@/styles/base.scss';
>>>>>>> main

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
<<<<<<< HEAD
      <Head>
        <title>Priority</title>
        <link rel="icon" href="/icons/favicon.svg" />
      </Head>
      <CardIdProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CardIdProvider>
=======
      <Component {...pageProps} />
>>>>>>> main
    </>
  );
}
