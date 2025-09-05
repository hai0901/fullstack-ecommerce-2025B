import { Truck } from "lucide-react";
import Footer from "~/components/footer";
import NavBar from "~/components/nav-bar";
import { Badge } from "~/components/ui/badge";
import { useAppSelector } from "~/hooks/redux-hooks";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { columns, type Order } from "~/components/shipper/order-columns";
import { DataTable } from "~/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function getOrders(): Order[] {
  const now = new Date()
  return Array.from({ length: 30 }, (_, index) => {
    const idNum = (index + 1).toString().padStart(3, '0')
    const createdAt = new Date(now)
    createdAt.setDate(now.getDate() - (30 - index))
    const updatedAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24)
    return {
      id: `O-${idNum}`,
      totalPrice: Math.round((Math.random() * (5000000 - 50000) + 50000) / 1000) * 1000,
      products: [],
      description: `Mock description for order ${index + 1}`,
      customerName: `Customer ${index + 1}`,
      address: `123 Mock St, City ${index + 1}`,
      createdAt,
      updatedAt,
      status: ['active', 'delivered', 'cancelled'][index % 3] as 'active' | 'delivered' | 'cancelled',
    }
  })
}

export default function DeliveryPage() {
  const user = useAppSelector(state => state.auth);
  const orders = getOrders();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) =>
      [o.id, o.customerName, o.description, o.address, o.status]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [orders, query]);

  return <>
    <NavBar/>
      <main>
        <div className="w-full border-b px-42 py-10">
          <h1 className="text-3xl font-medium tracking-tight w-200 mb-3">
            {"Welcome back, " + user.name + "!"}
          </h1>
          <Badge className="mb-3"><Truck />{user.distributionHub}</Badge>
          <p className="text-muted-foreground">Manage your Neomall distribution hub's orders here.</p>
        </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={filtered}
          renderToolbar={(table) => (
            <div className="flex items-center justify-between gap-3">
              <div className="max-w-sm w-full">
                <Input
                  placeholder="Filter Orders..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="size-4" /> View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Toggle Column</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                      .getAllLeafColumns()
                      .filter((col) => col.id !== "actions")
                      .map((col) => (
                        <DropdownMenuCheckboxItem
                          key={col.id}
                          checked={col.getIsVisible()}
                          onCheckedChange={(value) => col.toggleVisibility(Boolean(value))}
                          disabled={!col.getCanHide?.()}
                        >
                          {typeof col.columnDef.header === "string"
                            ? col.columnDef.header
                            : (col.columnDef.meta as any)?.label ?? col.id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (s) => s.toUpperCase())}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        />
      </div>        
      </main>
    <Footer/>
  </>
}