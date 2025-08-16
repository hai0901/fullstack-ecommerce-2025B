import { Outlet, useLocation } from "react-router";
import NavBar from "~/components/nav-bar";
import Footer from "~/components/footer";

export default function BuyerMainLayout() {
  const location = useLocation();
  const isStaticPage = location.pathname !== "/";
  
  return (
    <>
      {isStaticPage ? (
        <>
          <NavBar />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="relative h-[996px]">
            <NavBar />
          </div>
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}