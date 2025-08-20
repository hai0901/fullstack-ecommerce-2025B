import { ChevronDown, ChevronUp, Dices, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

export default function Filter() {
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  return (
    <aside className="flex flex-col w-[418.5px] border-l h-auto text-muted-foreground">
      <div className="flex flex-col p-6 pr-7 gap-6">
        <Label className="font-normal">Category</Label>
        <Collapsible
          open={categoryExpanded}
          onOpenChange={setCategoryExpanded}
        >
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox id="category"/>
              <p className="text-xs font-light">Something</p>
            </li>                
          </ul>
          <CollapsibleContent className="mt-3">
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>
              <li className="flex items-center gap-3">
                <Checkbox id="category"/>
                <p className="text-xs font-light">Something</p>
              </li>                
            </ul>              
          </CollapsibleContent>
          <CollapsibleTrigger className="-ml-3 mt-3" asChild>
            <Button className="text-muted-foreground text-xs" variant="link">
              {categoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {categoryExpanded ? "Show less" : "See more"}
            </Button>
          </CollapsibleTrigger>            
        </Collapsible>
      </div>
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
  )
}