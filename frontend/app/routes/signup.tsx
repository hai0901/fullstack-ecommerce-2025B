import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import logoDark from "~/assets/neomall-darkmode-logo.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";
import CustomerSignUpCard from "~/components/signup/customer-signup-card";
import VendorSignUpCard from "~/components/signup/vendor-signup-card";
import ShipperSignUpCard from "~/components/signup/shipper-signup-card";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-row place-content-center">
        <header className="flex flex-row h-24 w-screen max-w-[1448px] p-6 items-center justify-between">
          <Link to="/">
            <img
              className="cursor-pointer"
              src={logoDark}
              width="96.82"
              height="17.23"
            />
          </Link>
          <div className="flex flex-row gap-3">
            <Link to="/login">
              <Button className="rounded-sm font-normal cursor-pointer" size="sm">Log In</Button>
            </Link>
          </div>
        </header>
      </div>
      <main className="flex flex-col w-full h-full items-center">
        <h1 className="text-4xl tracking-tight">Welcome to Neomall</h1>
        <h2 className="font-normal tracking-tight mt-2.5 text-muted-foreground">Create your new account as</h2>
        <div className="flex w-200 flex-col items-center gap-6 pb-6">
          <Tabs defaultValue="customer">
            <TabsList className="mx-auto my-3">  
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
              <TabsTrigger value="shipper">Shipper</TabsTrigger>
            </TabsList>
            <TabsContent className="w-100" value="customer">
              <CustomerSignUpCard />
            </TabsContent>
            <TabsContent className="w-100" value="vendor">
              <VendorSignUpCard />
            </TabsContent>
            <TabsContent className="w-100" value="shipper">
              <ShipperSignUpCard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
  </div>
  )
}