// File: src/app/layout.jsx
'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MantineProvider } from '@mantine/core';
import '@mantine/carousel/styles.css'; // Keep if you use Mantine Carousel

import Header from './components/header';

// Lato font imports (keep these as the primary import location)
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

// PageProvider was removed as its functionality for nav is now in Header
// If you had other uses for PageContext, you might need to re-evaluate.

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const currentSlug = pathname === '/' ? 'home' : pathname.slice(1).split('/')[0];

  const [navOpened, setNavOpened] = useState(false);

  return (
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {/* IMPORTANT: Customize these for your actual site! */}
        <meta name="author" content="Michelle Harding" />
        <title>Brave Change Coaching - Michelle Harding</title>
        <meta name="description" content="Mental health coaching for workplace resilience. Discover The Working Mind program with Michelle Harding in London, Ontario." />
      </head>
      <body
        // className="homepage" // This class was unused, so removed
        style={{
          margin: 0,
          padding: 0,
          width: '100vw',         // Kept your original styling
          overflowX: 'hidden'     // Kept your original styling
        }}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            // Your original minimal theme
            breakpoints: { xs: '0px', sm: '576px', md: '768px', lg: '992px', xl: '1200px' },
            // You can still add fontFamily here if desired:
            // fontFamily: 'Lato, sans-serif',
            // And specific colors if you want to reference them, e.g.:
            // colors: {
            //   brandGreen: ['#E6FCF0', /* ... */ '#37b048', /* ... */ '#0F3F1B'],
            //   brandGrey: ['#f7f6f3', /* ... */ '#655', /* ... */ '#212121']
            // }
          }}
        >
          <Header currentSlug={currentSlug} navOpened={navOpened} setNavOpened={setNavOpened} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}