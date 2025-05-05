// File: src/app/layout.jsx
'use client';

import { MantineProvider } from '@mantine/core';
import '@mantine/carousel/styles.css';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

import PageProvider from './contexts/PageContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="author" content="ThemeStarz" />
        <title>Mentor – Mentor & Coach HTML Template</title>
      </head>
      <body
        className="homepage"
        style={{
          margin: 0,
          padding: 0,
          width: '100vw',        // ensure full viewport width
          overflowX: 'hidden'    // prevent horizontal scroll
        }}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            // optionally match bootstrap breakpoints:
            breakpoints: { xs: '0px', sm: '576px', md: '768px', lg: '992px', xl: '1200px' },
          }}
        >
          <PageProvider>
            {children}
          </PageProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
