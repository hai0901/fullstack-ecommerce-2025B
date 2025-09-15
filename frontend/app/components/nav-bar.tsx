import logoDark from "~/assets/neomall-darkmode-logo.svg";
import logoLight from "~/assets/neomall-lightmode-logo.svg";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./ui/navigation-menu"
import { Link } from "react-router";
import { LogOut, PersonStanding, ShoppingCart } from "lucide-react";
import { NavBarSearch } from "./search";
import { Badge } from "./ui/badge";
import { cn } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/hooks/redux-hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "~/features/authentication/authenticationSlice"; 
import axios from "axios";

export default function NavBar() {
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="z-99 sticky top-0 flex flex-row place-content-center border-b bg-black">
      <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
        <Link to="/">
          <img
            className="cursor-pointer"
            src={logoDark}
            width="120"
            height="20"
          />
        </Link>
        {user.role == "Customer" &&
          <div className="flex flex-row w-full gap-3 pl-24 justify-center">
            <NavBarSearch />
            <Link to="/cart">
              <Button variant="ghost" className="cursor-pointer">
                <ShoppingCart size={32} />
                <Badge className="h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">99</Badge>
              </Button>
            </Link>
          </div>
        }
        <div className="flex flex-row gap-3">
          {
            user.isAuthenticated ? 
            <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.profilePicture as string} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm mx-3">{user.name}</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-35">
                    <li>
                      <NavigationMenuLink>
                        <Link className="flex gap-3 items-center" to="/account">
                          <PersonStanding />
                          My Account
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink>
                        <Link 
                          className="flex gap-3 items-center" 
                          onClick={async () => {
                            try {
                              await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
                            } catch {}
                            dispatch(logout());
                          }}
                          to="/">
                          <LogOut />
                          Log Out
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
            :
            <>
              <Link to="/login">
                <Button 
                  className="rounded-sm font-normal cursor-pointer" 
                  size="sm" 
                  variant="outline"
                >
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  className="rounded-sm font-normal cursor-pointer" 
                  size="sm"
                >
                  Sign Up
                </Button>
              </Link>            
            </>
          }
        </div>
      </header>
    </div>
  );
}



