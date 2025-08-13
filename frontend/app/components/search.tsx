import { useState } from "react";
import { Input } from "./ui/input";
import { mockSearchResult } from "~/components/mockProductSearchResult"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from "~/components/ui/popover"
import { Frown } from "lucide-react";

export function NavBarSearch() {
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value;
    setOpenSearchPopover(keyword ? true : false);
    setSearchKeyword(keyword);
  }

  const filteredResult = mockSearchResult.filter(item => item.name.toLowerCase().includes(searchKeyword.toLowerCase())).slice(0, 10);

  return (      
    <Popover
      open={openSearchPopover}
      onOpenChange={(open) => {}}
    >
      <PopoverAnchor asChild>
        <Input 
          defaultValue={searchKeyword}
          placeholder="Get your 24K Labubu on Neomall now!" 
          className="max-w-2xl" 
          onChange={handleSearchInputChange}
        />
      </PopoverAnchor>
      <PopoverContent 
        className="flex flex-col gap-0 w-2xl mt-3 text-popover-foreground text-sm p-1.5 cursor-default"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => setOpenSearchPopover(false)}
      >
        {filteredResult.length === 0 ?
          <p 
            className="flex flex-row place-self-center place-items-center text-center gap-3 h-8"
          >
            Oops! Nothing seems to match your search result. <Frown size={16} strokeWidth={1.5} />
          </p>
          :
          filteredResult.map(item => 
            <p className="focus:bg-accent rounded-sm hover:bg-accent items-center p-2">{item.name}</p>)
        }
      </PopoverContent>
    </Popover>
  );
}