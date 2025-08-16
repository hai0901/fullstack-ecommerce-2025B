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
route("about", "routes/about.tsx"),
route("help", "routes/help.tsx"),
route("playground", "routes/playground.tsx")

] satisfies RouteConfig;
