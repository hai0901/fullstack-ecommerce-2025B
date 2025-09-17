/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

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
import { Badge } from "./ui/badge";
import { cn } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/hooks/redux-hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "~/features/authentication/authenticationSlice"; 
import ChatWidget from '~/components/chat-widget';
import axios from "axios";

export default function NavBar() {
  const user = useAppSelector(state => state.auth);
  const cart = useAppSelector(state => state.cart);
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
        <div className="flex flex-row gap-3">
          {
            user.isAuthenticated ? 
            <>
              {user.role?.toLowerCase() === "customer" && (
                <Link to="/cart">
                  <Button variant="ghost" className="cursor-pointer relative">
                    <ShoppingCart size={32} />
                    {cart.items.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full p-0.5 font-mono tabular-nums">
                        {cart.items.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
              {user.role?.toLowerCase() === "admin" && (
                <Link to="/admin">
                  <Button variant="ghost" className="cursor-pointer">
                    Admin
                  </Button>
                </Link>
              )}

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
                            to="/login">
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
            </>
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
        <ChatWidget />
      </header>
    </div>
  );
}



