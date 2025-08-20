import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import ShopProductCard from "~/components/customer/shop-product-card";
import Filter from "~/components/customer/shop/filter";

export default function Shop() {
  return (
    <div id="shop" className="w-full h-[fit] bg-black flex flex-col items-center">
      <div className="flex flex-row w-[1448px]"> 
        <Filter />
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
  )
}