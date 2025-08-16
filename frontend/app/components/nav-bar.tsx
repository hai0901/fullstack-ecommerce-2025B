import logoDark from "~/assets/neomall-darkmode-logo.svg";
import logoLight from "~/assets/neomall-lightmode-logo.svg";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { NavBarSearch } from "./search";
import { Badge } from "./ui/badge";
import { useBorderToggleOnScroll } from "~/hooks/use-border-toggle-on-scroll";
import { cn } from "~/lib/utils";
import { useIsHydrated } from "~/hooks/use-is-hydrated"; // ✅ NEW

export default function NavBar() {
  const { theme } = useTheme();
  const logoRef = useRef<HTMLImageElement>(null);
  const showBottomBorder = useBorderToggleOnScroll("shop");
  const hydrated = useIsHydrated(); // ✅ NEW

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.src = theme === "dark" ? logoDark : logoLight;
    }
  }, [theme]);

  return (
    <div
      className={cn(
        "z-99 sticky top-0 backdrop-blur-md flex flex-row place-content-center",
        showBottomBorder && "border-b"
      )}
    >
      <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
        {/* Logo */}
        <img ref={logoRef} src={logoDark} width="120" height="20" />

        {/* Center section: search + cart */}
        <div className="flex flex-row w-full gap-3 pl-24 justify-center items-center">
          <NavBarSearch />
          <Button variant="outline">
            <ShoppingCart size={32} />
            <Badge className="h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">
              99
            </Badge>
          </Button>
        </div>

        {/* Right section: links + auth buttons */}
        <div className="flex flex-row gap-3 items-center">
          {hydrated && ( // ✅ NEW: protect Link from SSR
            <>
              <Link to="/about">
                <Button className="rounded-sm font-normal" size="sm" variant="ghost">
                  About
                </Button>
              </Link>
              <Link to="/help">
                <Button className="rounded-sm font-normal" size="sm" variant="ghost">
                  Help
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
          <Button className="rounded-sm font-normal" size="sm" variant="outline">
            Log In
          </Button>
          <Button className="rounded-sm font-normal" size="sm">
            Sign Up
          </Button>
        </div>
      </header>
    </div>
  );
}
