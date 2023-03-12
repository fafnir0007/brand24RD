"use client"; 

import './globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import { MantineProvider } from '@mantine/core';

const queryClient = new QueryClient()


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
         <body>{children}</body>
        </MantineProvider>
      </QueryClientProvider>
    </html>
  )
}
