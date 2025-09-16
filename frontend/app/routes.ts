import { 
  type RouteConfig, 
  index, 
  layout, 
  route
 } from "@react-router/dev/routes";

export default [
  route("/", "components/role-redirect.tsx"),
  layout("routes/layout/public-layout.tsx", [
    route("/homepage", "routes/customer/buyer-index.tsx"),
  ]),
  layout("routes/layout/buyer-main-layout.tsx", [
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

  layout("routes/layout/shipper-vendor-layout.tsx", [
    route("/my-products", "routes/vendor/vendor-products.tsx", [
      route("add-product", "routes/vendor/add-product.tsx")
    ]),
    route("/delivery", "routes/shipper/delivery.tsx", [
      route(":orderID", "routes/shipper/order.tsx")
    ])
  ])
] satisfies RouteConfig;
