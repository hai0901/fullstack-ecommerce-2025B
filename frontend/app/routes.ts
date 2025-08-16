import { 
  type RouteConfig, 
  index, 
  layout, 
  route
 } from "@react-router/dev/routes";

export default [
  layout("routes/layout/buyer-main-layout.tsx", [
    index("routes/buyer-index.tsx"),
  ]),  
  route("playground", "routes/playground.tsx"),
  route("login", "routes/login.tsx")
] satisfies RouteConfig;
