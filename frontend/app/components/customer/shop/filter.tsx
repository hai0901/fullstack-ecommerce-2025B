import { ChevronDown, ChevronUp, Dices, Info, Trash, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useAppSelector, useAppDispatch } from "~/hooks/redux-hooks";
import { filterItemRemoved, clearFilterItems } from '~/features/filter/filterItemsSlice'

export default function Filter() {
  const filterItems = useAppSelector(state => state.filterItems);
  const dispatch = useAppDispatch();

  const renderedFilterItems = filterItems.map(item => {
    const formattedPriceRange = (priceRange: number[]) => {
      const startPrice = priceRange[0] ? priceRange[0].toLocaleString('vi-VN') : "0";
      const endPrice = priceRange[1] ? priceRange[1].toLocaleString('vi-VN') : "0";
      return startPrice + " - " + endPrice + " VND";
    } 

    const description = item.id !== "priceRange" ? item.description : formattedPriceRange(item.description as number[]);

    return (
      <Button 
        key={item.id}
        variant="outline" 
        className="w-fit font-normal text-xs"
      >
        {description}
        <span 
          className="cursor-pointer"
          onClick={() => dispatch(filterItemRemoved(item.id))}  
        >
          <X size={16}/>
        </span>
      </Button>
    )
  });

  return (
    <div className="flex flex-col w-full p-6 pr-7 gap-6">
      <Label className="font-normal">Filtered By</Label>
      <div className="flex flex-col w-full gap-1">
        {renderedFilterItems}
        {filterItems.length !== 0 ? 
          <Button 
            variant="link" 
            className="w-fit -ml-2.5 text-xs p-0 cursor-pointer text-muted-foreground"
            onClick={() => dispatch(clearFilterItems())}
          >
            <Trash size={16} />
            Clear filter
          </Button>
          :
          <p className="text-xs font-light">None up to now.</p>
        }
      </div>
    </div>    
  )
}