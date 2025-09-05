import { 
  type RouteConfig, 
  index, 
  layout, 
  route
 } from "@react-router/dev/routes";

export default [
  layout("routes/layout/buyer-main-layout.tsx", [
    index("routes/customer/buyer-index.tsx"),
    route("/shop", "routes/customer/shop.tsx", [
      route(":productID", "routes/customer/product.tsx")
    ]),
    route("/cart", "routes/customer/cart.tsx")
  ]),
  layout("routes/layout/authentication-layout.tsx", [
    route("/login", "routes/login.tsx"),
    route("/signup", "routes/signup.tsx")
  ]),
  layout("routes/layout/global-layout.tsx", [
    route("/account", "routes/account.tsx"),  
    route("/playground", "routes/playground.tsx"),
  ]),
  route("/my-products", "routes/vendor/vendor-products.tsx", [
    route("add-product", "routes/vendor/add-product.tsx")
  ]),
  route("/delivery", "routes/shipper/delivery.tsx")
] satisfies RouteConfig;
