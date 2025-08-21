import { ChevronDown, ChevronUp, Dices, Info, Trash, X } from "lucide-react";
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

export default function PriceRange() {
  return (
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
  );
}