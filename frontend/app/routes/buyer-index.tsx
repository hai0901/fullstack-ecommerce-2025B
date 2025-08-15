import Hero from "~/components/customer/hero";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export default function BuyerIndexPage() {
  return (
  <main className="snap-y snap-mandatory top-24 absolute w-full h-screen overflow-y-scroll flex flex-col items-center">
    <Hero />
    <div className="snap-start w-full h-[fit] bg-black flex flex-col items-center border-t">
      <div className="flex flex-row w-[1448px]">
        <aside className="w-[418.5px] border-l border-b border-r h-auto">

        </aside>
        <section className="w-full h-auto">
          <ScrollArea className="w-full h-[900px]">
            <div className="grid grid-cols-3">
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
              <div className="border-r border-b w-full h-[300px]"></div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </section>        
      </div>
    </div>
    <div className="snap-center flex flex-col w-full h-[500px] bg-red-500">
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
      <h1>Hi</h1>
    </div>
  </main>
  );
}