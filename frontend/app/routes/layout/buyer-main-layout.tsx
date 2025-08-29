import { Outlet, useLocation } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";

export default function BuyerMainLayout() {
  const location = useLocation();
  const isStaticPage = location.pathname !== "/";
  
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}