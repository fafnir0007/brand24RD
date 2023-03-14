"use client"; 

import './globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import { MantineProvider } from '@mantine/core';
import {Provider} from 'react-redux'
import {store} from '@/redux'
const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <body>{children}</body>
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </html>
  )
}
