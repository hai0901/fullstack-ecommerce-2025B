import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Toaster } from "sonner";

export default function BuyerMainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Toaster closeButton theme="dark" position="top-center"/>
      <Footer />
    </>
  );
}