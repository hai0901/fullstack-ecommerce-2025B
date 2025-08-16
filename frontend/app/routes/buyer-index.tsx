import Hero from "~/components/customer/hero";
import Shop from "~/components/customer/shop";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export default function BuyerIndexPage() {
  return (
  <main className="scroll-smooth snap-y snap-mandatory top-24 absolute w-full h-screen overflow-y-scroll flex flex-col items-center">
    <Hero />
    <Shop />
  </main>
  );
}