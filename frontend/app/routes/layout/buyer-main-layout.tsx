import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import Footer from "~/components/footer";

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