import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";

export default function AuthenticationLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}