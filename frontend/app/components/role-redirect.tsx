/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/hooks/redux-hooks";

export default function RoleRedirect() {
  const user = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      // User is logged in, redirect based on role
      const role = user.role?.toLowerCase();
      if (role === 'customer') {
        navigate('/shop', { replace: true });
      } else if (role === 'vendor') {
        navigate('/my-products', { replace: true });
      } else if (role === 'shipper') {
        navigate('/delivery', { replace: true });
      } else {
        // Unknown role, redirect to homepage as fallback
        navigate('/homepage', { replace: true });
      }
    } else {
      // User is not logged in, redirect to homepage
      navigate('/homepage', { replace: true });
    }
  }, [user.isAuthenticated, user.role, navigate]);

  // Show loading while redirecting
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
