import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Navbar will always be displayed */}
      <main>{children}</main> {/* Render the content passed to Layout */}
    </div>
  );
};

export default Layout;