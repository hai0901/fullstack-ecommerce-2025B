import logoDark from "~/assets/neomall-darkmode-logo.svg";
import logoLight from "~/assets/neomall-lightmode-logo.svg"
import { Button } from "./ui/button";

import { useTheme } from 'next-themes';
import { ModeToggle } from "./mode-toggle";
import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { NavBarSearch } from "./search";
import { Badge } from "./ui/badge";

export default function NavBar() {
  const { theme } = useTheme();
  const imgRef = useRef(null);
  useEffect(() => {
    imgRef.current!.src = theme === "dark" ? logoDark : logoLight;
  }, [theme]);

  return (
    <div className="sticky flex flex-row place-content-center border-b">
      <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
        <img
          ref={imgRef}
          src={logoDark}
          width="120"
          height="20"
        />
        <div className="flex flex-row w-full gap-3 pl-24 justify-center">
          <NavBarSearch />
          <Button variant="outline">
            <ShoppingCart size={32} />
            <Badge className="h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">99</Badge>
          </Button>
        </div>
        <div className="flex flex-row gap-3">
          <ModeToggle />
          <Button className="rounded-sm font-normal" size="sm" variant="outline">Log In</Button>
          <Button className="rounded-sm font-normal" size="sm">Sign Up</Button>
        </div>
      </header>
    </div>
  );
}