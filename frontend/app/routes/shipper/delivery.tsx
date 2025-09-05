import { Truck } from "lucide-react";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Badge } from "~/components/ui/badge";
import { useAppSelector } from "~/hooks/redux-hooks";

export default function DeliveryPage() {
  const user = useAppSelector(state => state.auth);
  console.log(user.distributionHub);

  return <>
    <NavBar/>
      <main>
        <div className="w-full border-b px-42 py-10">
          <h1 className="text-3xl font-medium tracking-tight w-200 mb-3">
            {"Welcome back, " + user.name + "!"}
          </h1>
          <Badge className="mb-3"><Truck />{user.distributionHub}</Badge>
          <p className="text-muted-foreground">Manage your Neomall distribution hub's orders here.</p>
        </div>
      </main>
    <Footer/>
  </>
}