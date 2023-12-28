import { ReactNode } from 'react';
import Head from 'next/head';
import Script from 'next/script'

type LayoutProps = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/hls.js@1"></Script>
      <div>{children}</div>
    </>
  );
};

export default Layout;
