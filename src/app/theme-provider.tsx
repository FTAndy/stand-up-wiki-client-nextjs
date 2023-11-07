'use client';
import createCache from '@emotion/cache';
import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
// import theme from '/path/to/your/theme';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {

      }
    },
    MuiRating: {
      styleOverrides: {
        'icon': {
          'color': 'unset'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#121212'
    },
    text: {
      primary: '#FFFFFF'
    },
    background: {
      paper: '#121212',
      // default: '#121212'
    }
  }
})

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: {
  options: any,
  children: any
}) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    console.log(styles, 'styles')

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          // __html: styles,
          __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}