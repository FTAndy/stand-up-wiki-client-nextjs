import 'plyr/dist/plyr.css';

const Layout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
