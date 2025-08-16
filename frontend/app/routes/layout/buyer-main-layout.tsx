import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router";
import NavBar from "~/components/nav-bar";

export default function BuyerMainLayout() {
  return (
    <>
      <div className="relative h-[996px]">
        <NavBar />
      </div>
      <Outlet />
    </>
  );
}