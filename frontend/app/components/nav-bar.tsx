import logoDark from "~/assets/neomall-darkmode-logo.svg";
import logoLight from "~/assets/neomall-lightmode-logo.svg";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu"
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { NavBarSearch } from "./search";
import { Badge } from "./ui/badge";
import { useBorderToggleOnScroll } from "~/hooks/use-border-toggle-on-scroll";
import { cn } from "~/lib/utils";

export default function NavBar() {
  const showBottomBorder = useBorderToggleOnScroll('shop');

  return (
    <div className={cn("z-99 sticky top-0 backdrop-blur-md flex flex-row place-content-center", showBottomBorder && "border-b")}>
      <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
        <Link to="/">
          <img
            className="cursor-pointer"
            src={logoDark}
            width="120"
            height="20"
          />
        </Link>
        <div className="flex flex-row w-full gap-3 pl-24 justify-center">
          {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-normal">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-normal">
                  Privacy
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-normal">
                  Copyright
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-normal">
                  Help
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
          <NavBarSearch />
          <Button variant="ghost">
            <ShoppingCart size={32} />
            <Badge className="h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">99</Badge>
          </Button>
        </div>
        <div className="flex flex-row gap-3">
          <Link to="/login"><Button className="rounded-sm font-normal cursor-pointer" size="sm" variant="outline">Log In</Button></Link>
          <Link to="/signup"><Button className="rounded-sm font-normal cursor-pointer" size="sm">Sign Up</Button></Link>
        </div>
      </header>
    </div>
  );
}



