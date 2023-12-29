import Script from 'next/script'

const Layout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
      {/* <Script src="https://cdn.jsdelivr.net/npm/hls.js@1"></Script> */}
      <div>{children}</div>
    </>
  );
};

export default Layout;
