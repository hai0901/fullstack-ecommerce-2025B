import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import ShopProductCard from "~/components/customer/shop-product-card";
import FilterArea from "~/components/customer/shop/filter-area";
import { Outlet } from "react-router";

export default function Shop() {
  return (
    <div id="shop" className="w-full h-[fit] bg-black flex flex-col items-center">
      <div className="flex flex-row w-[1448px]"> 
        <FilterArea />
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
        <Outlet/>      
      </div>
    </div>  
  )
}