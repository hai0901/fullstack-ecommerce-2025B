import { ChevronDown, ChevronUp, Dices, Info, Trash, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Label } from "~/components/ui/label";
import { useAppDispatch, useAppSelector } from '~/hooks/redux-hooks';
import { type FilterItem, filterItemAdded, filterItemRemoved } from '~/features/filter/filterItemsSlice'

const mockCategories = [
  { id: 'a', description: 'Appliances' },
  { id: 'b', description: 'Arts, Crafts & Sewing' },
  { id: 'c', description: 'Automotive' },
  { id: 'd', description: 'Baby Products' },
  { id: 'e', description: 'Beauty & Personal Care' },
  { id: '6', description: 'Books' },
  { id: '7', description: 'CDs & Vinyl' },
  { id: '8', description: 'Cell Phones & Accessories' },
  { id: '9', description: 'Clothing, Shoes & Jewelry' },
  { id: '10', description: 'Electronics' },
  { id: '11', description: 'Grocery & Gourmet Food' },
  { id: '12', description: 'Health & Household' },
  { id: '13', description: 'Home & Kitchen' },
  { id: '14', description: 'Industrial & Scientific' },
  { id: '15', description: 'Movies & TV' },
  { id: '16', description: 'Musical Instruments' },
  { id: '17', description: 'Office Products' },
  { id: '18', description: 'Patio, Lawn & Garden' },
  { id: '19', description: 'Pet Supplies' },
  { id: '20', description: 'Software' },
  { id: '21', description: 'Sports & Outdoors' },
  { id: '22', description: 'Tools & Home Improvement' },
  { id: '23', description: 'Toys & Games' },
  { id: '24', description: 'Video Games' }
];

export default function Category() {
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const dispatch = useAppDispatch()
  const defaultVisibleCategories = mockCategories.slice(0, 4);
  const collapsibleCategories = mockCategories.slice(5);
  const filterItems = useAppSelector(state => state.filterItems);

  function renderCategories(categories: { id: string, description: string }[]) {
    return categories.map(category => {
      const checked = filterItems.find(item => item.id === category.id) !== undefined ? true : false;

      function handleClick() {
        const newFilterItem: FilterItem = {
          id: category.id,
          description: category.description
        }
        dispatch(!checked ? filterItemAdded(newFilterItem) : filterItemRemoved(category.id));
      }
      
      return (
        <li 
          key={category.id}
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleClick}
        >
          <Checkbox checked={checked} className="cursor-pointer" id="category"/>
          <p className="text-xs font-light">{category.description}</p>
        </li>
      )
    });
  }

  return (
    <div className="flex flex-col p-6 pr-7 gap-6">
      <Label className="font-normal">Category</Label>
      <Collapsible
        open={categoryExpanded}
        onOpenChange={setCategoryExpanded}
      >
        <ul className="flex flex-col gap-3">
          {renderCategories(defaultVisibleCategories)}               
        </ul>
        <CollapsibleContent className="mt-3">
          <ul className="flex flex-col gap-3">
            {renderCategories(collapsibleCategories)}           
          </ul>              
        </CollapsibleContent>
        <CollapsibleTrigger className="-ml-3 mt-3" asChild>
          <Button className="text-muted-foreground text-xs cursor-pointer" variant="link">
            {categoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {categoryExpanded ? "Show less" : "See more"}
          </Button>
        </CollapsibleTrigger>            
      </Collapsible>
    </div>
  );
}