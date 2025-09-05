import { 
  type RouteConfig, 
  index, 
  layout, 
  route
 } from "@react-router/dev/routes";

export default [
  layout("routes/layout/buyer-main-layout.tsx", [
    index("routes/buyer-index.tsx"),
    route("/shop", "routes/shop.tsx", [
      route(":productID", "routes/product.tsx")
    ]),
    route("/cart", "routes/cart.tsx")
  ]),
  layout("routes/layout/authentication-layout.tsx", [
    route("/login", "routes/login.tsx"),
    route("/signup", "routes/signup.tsx")
  ]),
  layout("routes/layout/global-layout.tsx", [
    route("/account", "routes/account.tsx"),  
    route("/playground", "routes/playground.tsx"),
  ])
] satisfies RouteConfig;
