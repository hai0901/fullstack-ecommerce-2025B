import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Shop() {
  return (
    <div id="shop" className="pt-24 snap-start w-full h-[fit] bg-black flex flex-col items-center border-t">
      <div className="flex flex-row w-[1448px]">
        <aside className="w-[418.5px] border h-auto">

        </aside>
        <section className="w-full h-auto border-t">
          <ScrollArea className="w-full h-[900px]">
            <div className="grid grid-cols-3">
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
              <div className="border-r border-b w-full h-[300px]">Product</div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </section>        
      </div>
    </div>    
  );
}