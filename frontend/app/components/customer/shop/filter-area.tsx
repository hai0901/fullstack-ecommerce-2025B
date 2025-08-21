import { Dices } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import PriceRange from "./price-range";
import Category from "./category";
import { useAppSelector } from "~/hooks/redux-hooks";
import Filter from "./filter";

export default function FilterArea() {
  return (
    <aside className="flex flex-col w-[418.5px] border-l h-auto text-muted-foreground">
      <Filter />
      <Separator />

      <PriceRange />
      <Separator />

      <Category />
      <Separator />

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
      <div className="flex justify-between p-6">
        <Label className="font-normal">B&W Mode</Label>
        <Switch id="bnw-mode" />
      </div>
      <Separator />
    </aside>
  )
}