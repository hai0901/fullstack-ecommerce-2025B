import type { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ArrowDown01, ArrowUp10, EyeOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"

export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  availableStock: number
  createdAt: Date,
  updatedAt: Date,
  isDeleted: boolean,
  image: string
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-normal text-muted-foreground">ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="font-normal text-muted-foreground">Name</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="font-normal text-muted-foreground">Category</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 font-normal text-muted-foreground inline-flex items-center gap-1">
            Price <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp10 className="size-4" /> Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown01 className="size-4" /> Desc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="size-4" /> Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      const formatted = new Intl.NumberFormat("vi-VN").format(Math.round(price))
      return (
        <div className="flex items-baseline gap-1">
          <span>{formatted}</span>
          <span className="text-xs text-muted-foreground">VND</span>
        </div>
      )
    },
  },
  {
    accessorKey: "availableStock",
    header: () => <div className="font-normal text-muted-foreground">Available Stock</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="font-normal text-muted-foreground">Created At</div>
  },
  {
    accessorKey: "isDeleted",
    header: () => <div className="font-normal text-muted-foreground">Deleted</div>
  }
]