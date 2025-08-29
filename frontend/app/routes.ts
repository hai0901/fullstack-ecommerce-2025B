import { 
  type RouteConfig, 
  index, 
  layout, 
  route
 } from "@react-router/dev/routes";

export default [
  layout("routes/layout/buyer-main-layout.tsx", [
    index("routes/buyer-index.tsx"),
    route("/shop", "routes/shop.tsx"),
    route("/about", "routes/about.tsx"),
    route("/copyright", "routes/copyright.tsx"),
    route("/privacy", "routes/privacy.tsx"),
    route("/help", "routes/help.tsx")
  ]),  
  route("playground", "routes/playground.tsx"),
  route("login", "routes/login.tsx")
] satisfies RouteConfig;
