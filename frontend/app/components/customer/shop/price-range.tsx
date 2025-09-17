import { Info } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { filterItemAdded, type FilterItem } from "~/features/filter/filterItemsSlice";
import { useAppDispatch, useAppSelector } from "~/hooks/redux-hooks";

export default function PriceRange() {
  const filterItems = useAppSelector(state => state.filterItems);
  const priceRangeInFilter = filterItems.find(item => item.id === "priceRange");
  const priceRange = priceRangeInFilter ? priceRangeInFilter.description as number[] : [0, 1000000];
  const rangeStart = priceRange[0] ? priceRange[0].toLocaleString('vi-VN') : 0;
  const rangeEnd = priceRange[1] ? priceRange[1].toLocaleString('vi-VN') : 0;
  const dispatch = useAppDispatch();

  function handlePriceChange(value: number | number[], type?: string, fromSlider?: boolean) {
    const description = 
      fromSlider ? value as number[] :
      type === "start" ? [value as number, priceRange[1]] : [priceRange[0], value as number];

    const newFilterItem: FilterItem = {
      id: "priceRange",
      description: description
    }
    
    dispatch(filterItemAdded(newFilterItem));
  }

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
      <div className="flex flex-row text-xs font-light items-center gap-3">
        From 
        <Input 
          type="number" 
          value={priceRange[0]} 
          min={0} 
          max={priceRange[1]}
          onChange={(e) => handlePriceChange(parseInt(e.target.value), "start")}
          className="w-28"
        /> 
        To 
        <Input 
          type="number"
          value={priceRange[1]}
          min={priceRange[0]}
          max={1000000}
          onChange={(e) => handlePriceChange(parseInt(e.target.value), "end")}  
          className="w-28"
        />
      </div>
      <Slider 
        value={priceRange}
        step={50000} 
        min={0}
        max={1000000}
        minStepsBetweenThumbs={1}
        onValueChange={(value) => handlePriceChange(value, undefined, true)}
      />
      <div className="flex flex-row justify-between text-xs font-light">
        <span>{rangeStart} VND</span>
        <span>{rangeEnd} VND</span>
      </div>
    </div>
  );
}