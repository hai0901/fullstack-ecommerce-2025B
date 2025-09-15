import type { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown, ArrowDown01, ArrowUp10, EyeOff, MoreHorizontal } from "lucide-react"
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
  createdAt: Date | string,
  updatedAt: Date | string,
  image: string
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    meta: { label: "ID" },
    header: () => <div className="font-normal text-muted-foreground">ID</div>,
  },
  {
    accessorKey: "name",
    meta: { label: "Name" },
    header: () => <div className="font-normal text-muted-foreground">Name</div>,
  },
  {
    accessorKey: "category",
    meta: { label: "Category" },
    header: () => <div className="font-normal text-muted-foreground">Category</div>,
  },
  {
    accessorKey: "price",
    meta: { label: "Price" },
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground inline-flex items-center gap-1">
            Price <ChevronsUpDown className="size-4 text-muted-foreground" />
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
    accessorKey: "createdAt",
    sortingFn: "datetime",
    meta: { label: "Created At" },
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground inline-flex items-center gap-1">
            Created At <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            Latest to oldest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            Oldest to latest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as Date | string
      const date = typeof value === "string" ? new Date(value) : value
      const pad = (n: number) => String(n).padStart(2, "0")
      const hh = pad(date.getHours())
      const mm = pad(date.getMinutes())
      const dd = pad(date.getDate())
      const MM = pad(date.getMonth() + 1)
      const yyyy = date.getFullYear()
      const formatted = `${dd}/${MM}/${yyyy} at ${hh}:${mm}`
      return <span className="tabular-nums">{formatted}</span>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    meta: { label: "Actions" },
    header: () => null,
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('view', product.id)}>
              View product
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('edit', product.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => console.log('delete', product.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]