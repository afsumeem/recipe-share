import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
