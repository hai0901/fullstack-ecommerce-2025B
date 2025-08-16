import { Dices, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import ShopProductCard from "./shop-product-card";
import { Switch } from "../ui/switch";

export default function Shop() {
  return (
    <div id="shop" className="pt-24 snap-start w-full h-[fit] bg-black flex flex-col items-center border-t">
      <div className="flex flex-row w-[1448px]"> 
        <aside className="flex flex-col w-[418.5px] border h-auto text-muted-foreground">
          <div className="p-6 pr-7">
            <div className="flex flex-row justify-between">
              <Label className="font-normal">Surprise Me</Label>
              <Button variant="outline" size="icon">
                <Dices size={32} strokeWidth={1.75} />
              </Button>
            </div>
            <p className="text-xs font-light mt-3">Let our random curations make your shopping unexpectedly delightful.</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-6 p-6">
            <div className="flex gap-3 items-center">
              <Label className="font-normal">Price Range</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="mt-0.2" size={16} strokeWidth={1.75} />
                </TooltipTrigger>
                <TooltipContent><p>Neomall currently uses VND.</p></TooltipContent>
              </Tooltip>
            </div>
            <Slider defaultValue={[0, 50000000]} step={1} minStepsBetweenThumbs={1}/>
            <div className="flex flex-row justify-between text-xs font-light"><span>0</span><span>50.000.000</span></div>
            <div className="flex flex-row text-xs font-light items-center gap-3">
              From <Input /> To <Input/>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between p-6">
            <Label className="font-normal">B&W Mode</Label>
            <Switch id="bnw-mode" />
          </div>
          <Separator />
        </aside>
        <section className="w-full h-auto border-t">
          <ScrollArea className="w-full h-[900px]">
            <div className="grid grid-cols-3">
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
              <ShopProductCard />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </section>        
      </div>
    </div>    
  );
}