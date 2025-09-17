/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { Outlet } from "react-router";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Toaster } from "sonner";
import ProtectedRoute from "~/components/auth/ProtectedRoute";

export default function ShipperVendorLayout() {
  return (
    <ProtectedRoute requiredRole={['vendor', 'shipper']}>
      <NavBar />
      <Outlet />
      <Toaster closeButton theme="dark" position="top-center"/>
      <Footer />
    </ProtectedRoute>
  );
}