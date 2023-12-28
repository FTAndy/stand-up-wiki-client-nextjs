import Script from 'next/script'

const Layout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/hls.js@1"></Script>
      <div>{children}</div>
    </>
  );
};

export default Layout;
