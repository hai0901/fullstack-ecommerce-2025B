/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge"
import { useAppDispatch, useAppSelector } from "~/hooks/redux-hooks";
import EditAvatarCard from "~/components/account/edit-avatar";
import EditNameCard from "~/components/account/edit-name";
import EditUsermameCard from "~/components/account/edit-username";
import EditAddressCard from "~/components/account/edit-address";
import EditPassword from "~/components/account/edit-password";
import { Link } from "react-router";
import { logout } from "~/features/authentication/authenticationSlice";
import api from "~/utils/api";

export default function AccountPage() {
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  return (
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200">My Account</h1>
      </div>
      <section className="flex gap-10 py-10 px-42 ">
        <aside className="w-100 border h-fit rounded-md">
          <div className="flex flex-col gap-6 p-6">
            <h2 className="text-xl tracking-tight">Overview</h2>
            <div className="flex gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.profilePicture as string} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <h3>{user.name}</h3>
                <Badge variant="secondary" className="rounded-full text-xs -ml-2">{user.role}</Badge>
                <h3 className="text-xs text-muted-foreground">{user.username}</h3>
                <h3 className="text-xs text-muted-foreground">{user.address}</h3>
              </div>
            </div>
            
          </div>
        </aside>
        <div className="grid grid-cols-1 border divide-border divide-y-1">
          <EditAvatarCard user={user} dispatch={dispatch} />
          <EditNameCard user={user} dispatch={dispatch} />
          <EditUsermameCard user={user} dispatch={dispatch} />
          <EditAddressCard user={user} dispatch={dispatch} />
          <EditPassword user={user} dispatch={dispatch} />
          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Log Out</h2>
              <Link 
                to="/login"
                onClick={async () => {
                  try {
                    await api.post('/auth/logout');
                  } catch {}
                  dispatch(logout());
                }}
              >
                <Button className="cursor-pointer">Click here to log out of your account</Button>
              </Link>
            </div>
          </div>                   
        </div>
      </section>
    </main>
  )
}