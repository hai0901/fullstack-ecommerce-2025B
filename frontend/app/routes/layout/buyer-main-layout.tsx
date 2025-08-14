import { Outlet } from "react-router";
import NavBar from "~/components/nav-bar";

export default function BuyerMainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}