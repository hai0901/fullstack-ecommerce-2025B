import { Outlet } from "react-router"

export default function VendorProducts() {
  return <>
    <h1>Vendor Products Page</h1>
    <main>
      <Outlet/>
    </main>
  </>
}