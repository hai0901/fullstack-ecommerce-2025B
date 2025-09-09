import type { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown, ArrowDown01, ArrowUp10, EyeOff, MoreHorizontal, ArrowUpAZ, ArrowDownZA, CircleDashed, CircleCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import type { Product } from "../vendor/product-columns"
import { Badge } from "../ui/badge"
import { Link } from "react-router"

export type Order = {
  id: string
  totalPrice: number
  products: Product[]
  description: string
  customerName: string
  address: string,
  createdAt: Date,
  updatedAt: Date,
  status: 'active' | 'delivered' | 'cancelled'
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    meta: { label: "ID" },
    header: () => <div className="font-normal text-muted-foreground">ID</div>,
  },
  {
    accessorKey: "customerName",
    meta: { label: "Customer Name" },
    sortingFn: "alphanumeric",
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground inline-flex items-center gap-1">
            Customer Name <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpAZ className="size-4" /> A-Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownZA className="size-4" /> Z-A
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="size-4" /> Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "totalPrice",
    meta: { label: "Total Price" },
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground inline-flex items-center gap-1">
            Total Price <ChevronsUpDown className="size-4 text-muted-foreground" />
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
      const totalPrice = row.getValue("totalPrice") as number
      const formatted = new Intl.NumberFormat("vi-VN").format(Math.round(totalPrice))
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
    accessorKey: "address",
    meta: { label: "Address" },
    header: () => <div className="font-normal text-muted-foreground">Address</div>,
    cell: ({ row }) => {
      const address = row.getValue("address") as string
      return <div className="text-sm">{address}</div>
    }
  },
  {
    accessorKey: "status",
    meta: { label: "Status" },
    header: ({ column }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground inline-flex items-center gap-1">
            Status <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.setFilterValue('active')}>
            <CircleDashed className="size-4 mr-2" /> Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.setFilterValue('delivered')}>
            <CircleCheck className="size-4 mr-2" /> Delivered
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>
            Show All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const bg = status === 'active' ? 'bg-blue-800 text-white' 
                : status === 'delivered' ? 'bg-green-800 text-white' 
                : 'bg-red-100 text-red-800'
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
      return (
        <Badge className={`rounded-full ${bg}`}>
          {status === "active" && <CircleDashed />} 
          {status === "delivered" && <CircleCheck />} 
          {statusLabel}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    meta: { label: "Actions" },
    header: () => null,
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('view', order.id)}>
              <Link to={order.id}>
               View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('deliver', order.id)}>
              Deliver
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => console.log('delete', order.id)}>
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]