import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import ProtectedRoute from "~/components/auth/ProtectedRoute";

export default function GlobalLayout() {
  return (
    <ProtectedRoute>
      <NavBar />
      <Outlet />
      <Footer />
    </ProtectedRoute>
  );
}