import logoDark from "~/assets/neomall-darkmode-logo.svg";
import logoLight from "~/assets/neomall-lightmode-logo.svg";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Link } from "react-router";
import { useTheme } from './theme-provider';
import { ModeToggle } from "./mode-toggle";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { NavBarSearch } from "./search";
import { Badge } from "./ui/badge";
import { useBorderToggleOnScroll } from "~/hooks/use-border-toggle-on-scroll";
import { cn } from "~/lib/utils";

export default function NavBar() {
  const { theme } = useTheme();
  const logoRef = useRef(null);
  const showBottomBorder = useBorderToggleOnScroll('shop');
  useEffect(() => {
    logoRef.current!.src = theme === "dark" ? logoDark : logoLight;
  }, [theme]);

  return (
    <div className={cn("z-99 sticky top-0 backdrop-blur-md flex flex-row place-content-center", showBottomBorder && "border-b")}>
      <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
        <Link to="/">
          <img
            ref={logoRef}
            src={logoDark}
            width="120"
            height="20"
            className="cursor-pointer hover:opacity-80 transition-opacity"
            alt="Neomall Logo"
          />
        </Link>
        <div className="flex flex-row w-full gap-3 pl-24 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="font-normal">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-normal">Join Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Vendor
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Have your curios known and bought by our customers.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/60 to-muted flex h-full w-full flex-col justify-end bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Shipper
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Delivery done right with Neomall.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>                    
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/faq" className="font-normal">
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavBarSearch />
          <Button variant="outline">
            <ShoppingCart size={32} />
            <Badge className="h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">99</Badge>
          </Button>
        </div>
        <div className="flex flex-row gap-3">
          <ModeToggle />
          <Link to="/login"><Button className="rounded-sm font-normal" size="sm" variant="outline">Log In</Button></Link>
          <Button className="rounded-sm font-normal" size="sm">Sign Up</Button>
        </div>
      </header>
    </div>
  );
}



