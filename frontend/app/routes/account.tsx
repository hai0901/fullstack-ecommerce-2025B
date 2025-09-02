import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function AccountPage() {
  return (
    <main>
      <div className="w-full border-b px-42 py-10">
        <h1 className="text-3xl font-medium tracking-tight w-200">My Account</h1>
      </div>
      <section className="flex gap-10 py-10 px-42 ">
        <aside className="w-100 border h-100"></aside>
        <div className="grid grid-cols-1 border divide-border divide-y-1">
          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Avatar</h2>
              <div className="flex flex-col font-light text-sm text-muted-foreground gap-2">
                <p className="font-light">This is your avatar.</p>
                <p className="font-light">Click on the avatar to upload a custom one from your files.</p>
              </div>
            </div>
            <Avatar className="w-20 h-20">
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Name</h2>
              <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
                <p className="font-light">Please enter your full name, or a display name you are comfortable with.</p>
                <div className="flex gap-3 w-full">
                <Input />
                <Button variant="outline">Save</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Username</h2>
              <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
                <p className="font-light">This is the name you use for signing in. All usernames in our system are unique.</p>
                <div className="flex gap-3 w-full">
                <Input />
                <Button variant="outline">Save</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Address</h2>
              <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
                <p className="font-light">This is your address.</p>
                <div className="flex gap-3 w-full">
                <Input />
                <Button variant="outline">Save</Button>
                </div>
              </div>
            </div>
          </div>    

          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Password</h2>
              <div className="flex flex-col gap-3 font-light text-sm text-muted-foreground">
                <p className="font-light">This is the password to your account. Please choose a password that adheres to the enlisted requirements to secure your account.</p>
                <div className="flex gap-3 w-full">
                <Input />
                <Button variant="outline">Save</Button>
                </div>
              </div>
            </div>
          </div> 
          <div className="flex p-6 pb-10 gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl tracking-tight">Log Out</h2>
              <Button>Click here to log out of your account</Button>
            </div>
          </div>                   
        </div>
      </section>
    </main>
  )
}