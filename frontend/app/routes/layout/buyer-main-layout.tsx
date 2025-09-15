import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Toaster } from "sonner";
import ProtectedRoute from "~/components/auth/ProtectedRoute";

export default function BuyerMainLayout() {
  return (
    <ProtectedRoute requiredRole="customer">
      <NavBar />
      <Outlet />
      <Toaster closeButton theme="dark" position="top-center"/>
      <Footer />
    </ProtectedRoute>
  );
}