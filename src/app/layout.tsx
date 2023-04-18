"use client"; 

import './globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import { MantineProvider } from '@mantine/core';
import {Provider} from 'react-redux'
import {store} from '@/redux'
import LayoutWrapper from '@/ui/components/layout-wrapper/LayoutWrapper';
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
            <body>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </body>
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </html>
  )
}
